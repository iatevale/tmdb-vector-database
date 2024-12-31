import pandas as pd
import urllib.request
from tqdm import tqdm
from multiprocessing.pool import ThreadPool
import os.path
import sys

API_KEY = ''

df = pd.read_json('movie_ids.json', lines=True)
ids = list(df['id'])

urls = [(f"{id}.json", f"https://api.themoviedb.org/3/movie/{
         id}?api_key={API_KEY}&language=es-ES") for id in ids]


def log_failed(uri):
    with open('movies_failed.txt', 'w') as writer:
        writer.write(uri)


def fetch_url(entry):
    try:
        file, uri = entry
        path = os.path.join("movies", file)
        if not os.path.isfile(path):
            urllib.request.urlretrieve(uri, path)

        return path
    except:
        log_failed(uri)


results = ThreadPool(8).imap_unordered(fetch_url, urls)

for path in tqdm(results):
    pass
