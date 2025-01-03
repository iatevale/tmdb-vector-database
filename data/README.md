Utilizaremos toda la información de películas disponible con la API de themoviedb.org. Los limitaremos a aquellas películas con nota superior a 7 para reducir el dataset de más de un millón de registros a 100.000.

## 1. Descargar la lista de IDs de películas

themoviedb.org publica a diario la actualización del dataset. Descargaremos primiero la lista de ID's, para posteriormente descargar la información de cada película.

```
aria2c http://files.tmdb.org/p/exports/movie_ids_05_15_2024.json.gz
```

Ref: https://developers.themoviedb.org/3/getting-started/daily-file-exports

## 2. Obtención de los metadatos de cada película

Con los IDs de películas, podemos utilizar este script para descargar la información de películas, estableciendo la API_KEY que tendremos que obtener creando un usuario en themoviedb. Descargaremos la info en idioma español.

```
download_db.py
```

Tarda unas 11 horas en descargar toda la información.

# 3. Filtrado de películas con nota igual o superior a 7, o pocos votos

En el directorio donde ha descargado los miles de JSONs, ejecutamos este comando, que borrará el JSON de todas aquellas películas cuya nota se inferior a 7.

```
find . -type f -exec sh -c 'cat "$1" | jq ".vote_average < 7" | grep -q true && rm -f "$1"' _ {} \;
```

Borramos ahora todas las películas que hayan obtenido la nota superior a 7 con menos de 500 votos

```
find . -type f -exec sh -c 'cat "$1" | jq ".vote_count < 7" | grep -q true && rm -f "$1"' _ {} \;
```

# Creación del CSV

Utilizaremos el script de creación del CSV que posteriormente alimentará a la base de datos vectorial.

```
to_csv.py
```
