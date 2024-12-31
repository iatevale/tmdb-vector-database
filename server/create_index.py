from pymilvus import connections, Collection, Index

connections.connect(alias="default", host="localhost", port="19530")

collection = Collection("movies")
index_params = {
    "index_type": "IVF_FLAT",  # O puedes elegir otro tipo según tus necesidades
    "metric_type": "L2",  # Dependiendo de la métrica que uses (L2, IP, etc.)
    "params": {"nlist": 128}  # Número de listas, ajustable según tu dataset
}
collection.create_index(field_name="embedding", index_params=index_params)
