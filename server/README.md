# Almacenamiento en la base de datos vectorial

## 1. Arrancar la vectorDB Milvus

Utilizaremos docker para arrancar rápidamente una instancia. Entramos en el directorio "milvus" y lanzamos:

```
docker-compose up -d
```

Podemos acceder a la instancia vía web en http://localhost:8000

Documentación: https://milvus.io/docs/v2.2.x/attu_install-docker.md

## 2. Instalamos las dependencias

```
pip install -r requirements.txt
```

## 3. Importación de datos

Importamos los datos desde CSV o PARQUET a Milvus

```
import.py
```

# Postgres

```
CREATE SCHEMA IF NOT EXISTS nuevo_esquema;

CREATE TABLE nuevo_esquema.peliculas (
    id SERIAL PRIMARY KEY,
    imdb_id TEXT,
    backdrop_path TEXT,
    budget BIGINT,
    original_title TEXT,
    overview TEXT,
    popularity NUMERIC,
    poster_path TEXT,
    release_date DATE,
    revenue BIGINT,
    runtime INT,
    status TEXT,
    tagline TEXT,
    title TEXT,
    vote_average NUMERIC,
    vote_count INT,
    spoken_languages TEXT,
    genres TEXT
);
```
