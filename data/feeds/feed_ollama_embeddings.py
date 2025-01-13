# https://ollama.com/blog/embedding-models
# https://ollama.com/library/mxbai-embed-large

import os
import psycopg2
from slugify import slugify
from dotenv import load_dotenv
import sys
import traceback
import time
from urllib.parse import unquote
import ollama

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
    ADD COLUMN IF NOT EXISTS ollama_embeddings VECTOR(1536);
""")

conn.commit()

# Obtener los datos de la columna 'original_title'
cursor.execute("""SELECT id, title, wikipedia_content_es FROM "Movie" where ollama_embeddings is null;""")
rows = cursor.fetchall()

# Actualizar cada fila con el slug generado
for row in rows:
    record_id, title, content = row
    response = ollama.embeddings(model="mxbai-embed-large", prompt=content)
    embed = response.get("embedding")
    cursor.execute("""
        UPDATE "Movie" SET
        ollama_embeddings = %s
        WHERE id = %s;
    """, (embed, record_id))
    
    print("success:", title)
    
    conn.commit()

# Cerrar conexión
cursor.close()
conn.close()

print("Embeddings de ollama añadidos con éxito.")
