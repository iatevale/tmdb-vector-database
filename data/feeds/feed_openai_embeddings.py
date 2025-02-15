import os
import psycopg2
from dotenv import load_dotenv
from urllib.parse import unquote
from openai import OpenAI

# Cargar las variables del archivo .env
load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=api_key)


def get_embedding(text, model="text-embedding-3-large"):
    text = text.replace("\n", " ")
    return client.embeddings.create(input=[text], model=model).data[0].embedding


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

# Obtener los datos de la columna 'original_title'
cursor.execute(
    """SELECT id, title, wikipedia_content_es FROM "Movie" where openai_embeddings is null;""")
rows = cursor.fetchall()

# Actualizar cada fila con el slug generado
for row in rows:
    record_id, title, content = row
    embed = get_embedding(content[0:8192])
    cursor.execute("""
        UPDATE "Movie" SET
        openai_embeddings = %s
        WHERE id = %s;
    """, (embed, record_id))

    print("success:", title)

    conn.commit()

# Cerrar conexión
cursor.close()
conn.close()

print("Embeddings de openai añadidos con éxito.")
