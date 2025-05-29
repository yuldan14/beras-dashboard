import type { NextApiRequest, NextApiResponse } from 'next';
import joblib from 'joblib';
import path from 'path';

const modelPath = path.resolve(process.cwd(), 'models/arima_model.joblib');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Load ARIMA Model
    const arimaModel = await joblib.load(modelPath);

    // Lakukan prediksi (misal, 2 step ke depan)
    const predictions = arimaModel.predict(2);

    // Mengembalikan hasil prediksi untuk besok dan lusa
    res.status(200).json({ besok: predictions[0], lusa: predictions[1] });
  } catch (error) {
    console.error("Prediction Error:", error);
    res.status(500).json({ message: "Error in prediction" });
  }
}
