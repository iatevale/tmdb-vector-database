import os
import psycopg2
from slugify import slugify
from dotenv import load_dotenv
import sys
import traceback
import time
from urllib.parse import unquote


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

conn.commit()

# Obtener los datos de la columna 'original_title'
cursor.execute("""SELECT id, title FROM "Movie" where title_slug is null;""")
rows = cursor.fetchall()

# Actualizar cada fila con el slug generado
for row in rows:
    record_id, title = row
    title_slug = slugify(title)    
    try:
        content = get_wikipedia_data(url)

        cursor.execute("""
            UPDATE "Movie" SET
            title_slug = %s,
            WHERE id = %s;
        """, (title_slug, record_id))
        print("success:", url)
        
        conn.commit()
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
