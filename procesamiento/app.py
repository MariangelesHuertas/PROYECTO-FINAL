from flask import Flask, request, jsonify
from sklearn.feature_extraction.text import TfidfVectorizer
import pandas as pd

app = Flask(__name__)

# Base de datos simulada: descripciones de ofertas
OFFERS = [
    {"id": 1, "title": "Desarrollador Web", "description": "Desarrollo de aplicaciones web en React y Redux."},
    {"id": 2, "title": "Ingeniero de Software", "description": "Diseño y desarrollo de software en Python y Java."},
    {"id": 3, "title": "Analista de Datos", "description": "Análisis de datos con Python y herramientas como Pandas."},
    {"id": 4, "title": "Frontend Developer", "description": "Creación de interfaces de usuario con React y TypeScript."},
    {"id": 5, "title": "Data Scientist", "description": "Ciencia de datos con modelos avanzados y Python."}
]

# Ruta principal del microservicio
@app.route('/search', methods=['POST'])
def search_offers():
    try:
        # Obtener el término de búsqueda desde el cliente
        search_term = request.json.get("query", "").strip()
        if not search_term:
            return jsonify({"error": "Debe proporcionar un término de búsqueda"}), 400

        # Extraer las descripciones de las ofertas
        descriptions = [offer["description"] for offer in OFFERS]
        
        # Calcular TF-IDF
        vectorizer = TfidfVectorizer()
        tfidf_matrix = vectorizer.fit_transform(descriptions)
        query_vector = vectorizer.transform([search_term])

        # Calcular similitudes usando el producto punto
        scores = (tfidf_matrix * query_vector.T).toarray().flatten()

        # Ordenar las ofertas según relevancia
        results = sorted(
            [{"id": OFFERS[i]["id"], "title": OFFERS[i]["title"], "score": scores[i]} for i in range(len(scores))],
            key=lambda x: x["score"],
            reverse=True
        )

        # Retornar solo las ofertas relevantes con puntajes > 0
        filtered_results = [result for result in results if result["score"] > 0]
        return jsonify(filtered_results), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Ejecutar el servidor
if __name__ == '__main__':
    app.run(debug=True)
