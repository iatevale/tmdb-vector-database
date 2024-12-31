import pandas as pd

# Leer el archivo CSV
csv_file = "../data/movies.csv"  # Ruta del archivo CSV
df = pd.read_csv(csv_file)

# Guardar como archivo Parquet
parquet_file = "./movies.parquet"  # Ruta para el archivo Parquet
# Puedes usar 'pyarrow' o 'fastparquet'
df.to_parquet(parquet_file, engine='fastparquet', compression='snappy')
