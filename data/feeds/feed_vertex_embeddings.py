import os
import psycopg2
from dotenv import load_dotenv
from urllib.parse import unquote
from google.cloud import aiplatform
import sys
import vertexai
from vertexai.language_models import TextEmbeddingModel, TextEmbeddingInput
import time

vertexai.init(project="micronautas", location="europe-southwest1")

# Cargar las variables del archivo .env
load_dotenv()

def get_text_embedding(text):
    model = TextEmbeddingModel.from_pretrained("text-embedding-005")
    task = "CLUSTERING"
    dimensionality = 256
    texts = [text]
    inputs = [TextEmbeddingInput(text, task) for text in texts]
    kwargs = dict(output_dimensionality=dimensionality) if dimensionality else {}

    embeddings = model.get_embeddings(inputs, **kwargs)
    return embeddings[0].values

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
    """SELECT id, title, wikipedia_content_es FROM "Movie" where vertex_embeddings is null;""")
rows = cursor.fetchall()

# Actualizar cada fila con el slug generado
for row in rows:
    record_id, title, content = row
    embed = get_text_embedding(content)
    cursor.execute("""
        UPDATE "Movie" SET
        vertex_embeddings = %s
        WHERE id = %s;
    """, (embed, record_id))

    print("success:", title)
    time.sleep(1)
    conn.commit()

# Cerrar conexión
cursor.close()
conn.close()

print("Embeddings de vertex añadidos con éxito.")
