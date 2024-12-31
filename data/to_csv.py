import os
import json
import csv

# Ruta donde se encuentran los archivos JSON
input_folder = './movies'
# Ruta para guardar el archivo CSV resultante
output_csv = 'output.csv'

# Campos que te interesan
fields = [
    'id', 'imdb_id', 'backdrop_path', 'budget',  'original_title', 'overview',
    'popularity', 'poster_path', 'release_date', 'revenue', 'runtime',
    'status', 'tagline', 'title', 'vote_average', 'vote_count', 'spoken_languages', 'genres'
]


def extract_data(json_data):
    """Extrae los datos de los campos seleccionados."""
    extracted = {}
    for field in fields:
        value = json_data.get(field, None)
        # Convertir listas y diccionarios en strings para CSV
        if isinstance(value, list) or isinstance(value, dict):
            value = json.dumps(value, ensure_ascii=False)
        extracted[field] = value
    extracted["genres"] = ', '.join(
        [genre['name'] for genre in json_data.get('genres', [])])
    extracted["spoken_languages"] = ', '.join(
        [lang['iso_639_1'] for lang in json_data.get('spoken_languages', [])])
    return extracted


def main():
    # Crear el archivo CSV
    with open(output_csv, mode='w', encoding='utf-8', newline='') as csv_file:
        writer = csv.DictWriter(csv_file, fieldnames=fields)
        writer.writeheader()

        # Procesar cada archivo JSON
        for filename in os.listdir(input_folder):
            if filename.endswith('.json'):
                filepath = os.path.join(input_folder, filename)
                try:
                    with open(filepath, encoding='utf-8') as json_file:
                        json_data = json.load(json_file)
                        row = extract_data(json_data)
                        writer.writerow(row)
                except Exception as e:
                    print(f"Error procesando {filename}: {e}")


if __name__ == '__main__':
    main()
