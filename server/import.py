import numpy as np
from pymilvus import connections, FieldSchema, CollectionSchema, DataType, Collection, utility
import pandas as pd
import sys

# Conectar a Milvus
# Cambia host y puerto si es necesario.
connections.connect(alias="default", host="localhost", port="19530")

# Nombre de la colección
collection_name = "movies"

if utility.has_collection(collection_name):
    utility.drop_collection(collection_name)
    print(f"Colección '{collection_name}' eliminada.")

# Definir el esquema de la colección
fields = [
    FieldSchema(name="id", dtype=DataType.INT64,
                is_primary=True, auto_id=False),
    FieldSchema(name="imdb_id", dtype=DataType.VARCHAR, max_length=20),
    FieldSchema(name="backdrop_path",
                dtype=DataType.VARCHAR, max_length=255),
    FieldSchema(name="budget", dtype=DataType.INT64),
    FieldSchema(name="original_title",
                dtype=DataType.VARCHAR, max_length=255),
    FieldSchema(name="overview", dtype=DataType.VARCHAR, max_length=1024),
    FieldSchema(name="popularity", dtype=DataType.FLOAT),
    FieldSchema(name="poster_path",
                dtype=DataType.VARCHAR, max_length=255),
    FieldSchema(name="release_date",
                dtype=DataType.VARCHAR, max_length=10),
    FieldSchema(name="revenue", dtype=DataType.INT64),
    FieldSchema(name="runtime", dtype=DataType.INT64),
    FieldSchema(name="status", dtype=DataType.VARCHAR, max_length=50),
    FieldSchema(name="tagline", dtype=DataType.VARCHAR, max_length=255),
    FieldSchema(name="title", dtype=DataType.VARCHAR, max_length=255),
    FieldSchema(name="vote_average", dtype=DataType.FLOAT),
    FieldSchema(name="vote_count", dtype=DataType.INT64),
    FieldSchema(name="spoken_languages",
                dtype=DataType.VARCHAR, max_length=255),
    FieldSchema(name="genres", dtype=DataType.VARCHAR, max_length=255),
    # Agregar un campo de vector (necesario para Milvus)
    FieldSchema(name="embedding", dtype=DataType.FLOAT_VECTOR, dim=128)
]
schema = CollectionSchema(fields, description="Colección para películas")

# Crear la colección
collection = Collection(name=collection_name, schema=schema)
print(f"Colección '{collection_name}' creada.")

# Crear un índice si no existe
index_params = {
    # Tipo de índice (puedes usar otros como HNSW, etc.)
    "index_type": "IVF_FLAT",
    "metric_type": "L2",  # Usualmente L2 para distancias Euclidianas
    "params": {"nlist": 128}  # Parámetros específicos del índice
}
collection.create_index(field_name="embedding", index_params=index_params)

# Leer el archivo CSV con pandas
csv_file = "../data/movies.csv"
df = pd.read_csv(csv_file)

# Asegurar que los datos sean del tipo correcto
# Reemplaza valores nulos con cadenas vacías y asegura que sean cadenas
df["imdb_id"] = df["imdb_id"].fillna("").astype(str)
df["backdrop_path"] = df["backdrop_path"].fillna("").astype(str)
df["poster_path"] = df["poster_path"].fillna("").astype(str)
df["original_title"] = df["original_title"].fillna("").astype(str)
df["overview"] = df["overview"].fillna("").astype(str)
df["release_date"] = df["release_date"].fillna("").astype(str)
df["status"] = df["status"].fillna("").astype(str)
df["tagline"] = df["tagline"].fillna("").astype(str)
df["title"] = df["title"].fillna("").astype(str)
df["spoken_languages"] = df["spoken_languages"].fillna("").astype(str)
df["genres"] = df["genres"].fillna("").astype(str)

# Generar vectores ficticios (sustituye esto con embeddings reales si los tienes)
df["embedding"] = [np.random.rand(128).tolist() for _ in range(len(df))]


# Preparar los datos para la inserción (cada columna será una lista de valores)
data = [
    df["id"].tolist(),
    df["imdb_id"].tolist(),
    df["backdrop_path"].tolist(),
    df["budget"].tolist(),
    df["original_title"].tolist(),
    df["overview"].tolist(),
    df["popularity"].tolist(),
    df["poster_path"].tolist(),
    df["release_date"].tolist(),
    df["revenue"].tolist(),
    df["runtime"].tolist(),
    df["status"].tolist(),
    df["tagline"].tolist(),
    df["title"].tolist(),
    df["vote_average"].tolist(),
    df["vote_count"].tolist(),
    df["spoken_languages"].tolist(),
    df["genres"].tolist(),
    df["embedding"].tolist()
    # Si tienes vectores, agrega los datos de los embeddings aquí
]

# Insertar los datos en la colección
collection.insert(data)

print(f"Datos insertados en la colección '{collection_name}'.")

# Verificar el número de registros
print(f"Número de registros en la colección: {collection.num_entities}")

sys.exit()


# Dividir los datos en lotes
batch_size = 1000  # Ajusta según sea necesario
data_length = len(df)

for i in range(0, data_length, batch_size):
    batch = [
        df["id"].tolist()[i:i + batch_size],
        df["imdb_id"].tolist()[i:i + batch_size],
        df["backdrop_path"].tolist()[i:i + batch_size],
        df["budget"].tolist()[i:i + batch_size],
        df["original_title"].tolist()[i:i + batch_size],
        df["overview"].tolist()[i:i + batch_size],
        df["popularity"].tolist()[i:i + batch_size],
        df["poster_path"].tolist()[i:i + batch_size],
        df["release_date"].tolist()[i:i + batch_size],
        df["revenue"].tolist()[i:i + batch_size],
        df["runtime"].tolist()[i:i + batch_size],
        df["status"].tolist()[i:i + batch_size],
        df["tagline"].tolist()[i:i + batch_size],
        df["title"].tolist()[i:i + batch_size],
        df["vote_average"].tolist()[i:i + batch_size],
        df["vote_count"].tolist()[i:i + batch_size],
        df["spoken_languages"].tolist()[i:i + batch_size],
        df["genres"].tolist()[i:i + batch_size],
        df["embedding"].tolist()[i:i + batch_size],
    ]
    collection.insert(batch)
    print(f"Lote {i // batch_size + 1} insertado.")

print(f"Datos insertados en la colección '{collection_name}'.")

# Verificar el número de registros
print(f"Número de registros en la colección: {collection.num_entities}")
