from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)
model = joblib.load("rf_final_v3.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    try:
        json_data = request.get_json()
        input_data = pd.DataFrame([json_data])
        prediction = model.predict(input_data)[0]
        pred_label = "NORMAL" if prediction == 1 else "AGRESIVO"
        return jsonify({"conduct": pred_label})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)