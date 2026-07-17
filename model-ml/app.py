from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load saved models
score_model = joblib.load('saved_models/score_model.pkl')
risk_model = joblib.load('saved_models/risk_model.pkl')
feature_encoders = joblib.load('saved_models/feature_encoders.pkl')
risk_label_encoder = joblib.load('saved_models/risk_label_encoder.pkl')
feature_columns = joblib.load('saved_models/feature_columns.pkl')

@app.route('/', methods=['GET'])
def home():
    return jsonify({"status": "Student Performance ML API is running"})

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        # Build a single-row dataframe from input
        input_df = pd.DataFrame([data])

        # Encode categorical columns using saved encoders
        for col, encoder in feature_encoders.items():
            if col in input_df.columns:
                input_df[col] = encoder.transform(input_df[col].astype(str))

        # Ensure correct column order
        input_df = input_df[feature_columns]

        # Predict score
        predicted_score = score_model.predict(input_df)[0]
        predicted_score = round(float(predicted_score), 2)

        # Predict risk level
        risk_pred_encoded = risk_model.predict(input_df)[0]
        risk_level = risk_label_encoder.inverse_transform([risk_pred_encoded])[0]

        return jsonify({
            "predicted_score": predicted_score,
            "risk_level": risk_level
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)