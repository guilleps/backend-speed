from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)
model = joblib.load("rf_final_v3.pkl")

REQUIRED_FIELDS = [
    'acceleration_score',
    'braking_score',
    'turning_score',
    'weaving_score',
    'drifting_score',
    'speeding_score',
    'follow_score',
    'road_type',
    'temp_F',
    'humidity_pct',
    'wind_speed_mph',
    'wind_gust_mph',
    'condition',
    'day_night',
    'speed_mph',
]

@app.route("/predict", methods=["POST"])
def predict():
    try:
        json_data = request.get_json()
        print("[JSON_DATA] ", json_data)

        if not json_data:
            return jsonify({"error": "Cuerpo JSON vacío o inválido"}), 400

        missing_fields = [f for f in REQUIRED_FIELDS if f not in json_data]
        if missing_fields:
            return jsonify({
                "error": "Campos faltantes",
                "missing": missing_fields
            }), 400

        input_data = pd.DataFrame([json_data])
        prediction = model.predict(input_data)[0]
        pred_label = "NORMAL" if prediction == 1 else "AGRESIVO"
        return jsonify({"conduct": pred_label})
    except Exception as e:
        print("[ERROR] ", str(e))
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)