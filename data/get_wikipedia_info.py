import os
import psycopg2
from slugify import slugify
from dotenv import load_dotenv
import requests
import sys
import traceback
import time
from urllib.parse import unquote

def get_wikipedia_data(url):
    response = requests.get(
        'https://es.wikipedia.org/w/api.php',
        params={
            'action': 'query',
            'format': 'json',
            'titles': unquote(url.replace('https://es.wikipedia.org/wiki/', '')),
            'prop': 'extracts',
            'explaintext': True,
        }).json()
    page = next(iter(response['query']['pages'].values()))
    return page['extract']

def get_wikidata_article_url(entity_id):
    # Endpoint de la API de consultas de Wikidata
    url = "https://query.wikidata.org/sparql"

    # Consulta SPARQL para buscar el elemento con P4947 = 680
    query = f"""
    SELECT ?item ?itemLabel ?article WHERE {{
    ?item wdt:P4947 "{entity_id}".
    
    ?article schema:about ?item ;
            schema:isPartOf <https://es.wikipedia.org/> ;
            schema:inLanguage "es" .
    
    SERVICE wikibase:label {{
        bd:serviceParam wikibase:language "es,ca,en".
    }}
    }}"""

    # Enviar la solicitud a la API
    headers = {"Accept": "application/json"}
    response = requests.get(url, params={"query": query}, headers=headers)
    while response.status_code == 429:
        time.sleep(4)
        response = requests.get(url, params={"query": query}, headers=headers)

    data = response.json()

    # Procesar los resultados
    for result in data['results']['bindings']:
        entity_url = result['item']['value']
        label = result.get('itemLabel', {}).get('value')
        article = result.get('article', {}).get('value', 'Sin descripción')
        
        return article

# Cargar las variables del archivo .env
load_dotenv()

# Obtener variables de entorno
DB_HOST = os.getenv("DB_HOST")
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_PORT = os.getenv("DB_PORT", 5432)  # Puerto por defecto de PostgreSQL

# Conexión a la base de datos
conn = psycopg2.connect(
    host=DB_HOST,
    database=DB_NAME,
    user=DB_USER,
    password=DB_PASSWORD,
    port=DB_PORT
)
cursor = conn.cursor()

# Añadir la columna 'slug' si no existe
cursor.execute("""
    ALTER TABLE "Movie"
    ADD COLUMN IF NOT EXISTS title_slug TEXT;
""")

cursor.execute("""
    ALTER TABLE "Movie"
    ADD COLUMN IF NOT EXISTS wikipedia_url_es TEXT;
""")

cursor.execute("""
    ALTER TABLE "Movie"
    ADD COLUMN IF NOT EXISTS wikipedia_content_es TEXT;
""")

conn.commit()

# Obtener los datos de la columna 'original_title'
cursor.execute("""SELECT id, title FROM "Movie" where wikipedia_content_es is null;""")
rows = cursor.fetchall()

# Actualizar cada fila con el slug generado
for row in rows:
    record_id, title = row
    title_slug = slugify(title)    
    try:
        url = get_wikidata_article_url(record_id)
        if url is not None:
            content = get_wikipedia_data(url)

            cursor.execute("""
                UPDATE "Movie" SET
                title_slug = %s,
                wikipedia_url_es = %s,
                wikipedia_content_es = %s
                WHERE id = %s;
            """, (title_slug, url, content, record_id))
            print("success:", url)
            
            conn.commit()

        else:
            # Borrar película
            print("borrar: ", record_id, title)
            cursor.execute("""
                DELETE FROM "Movie"
                WHERE id = %s;
            """, (record_id,))

    except:
        print("error: ", record_id, title)
        stacktrace = traceback.format_exc()
        print(stacktrace)

        sys.exit()
        continue
    
# Confirmar los cambios
conn.commit()

# Cerrar conexión
cursor.close()
conn.close()

print("Columna 'slug' actualizada con éxito.")
