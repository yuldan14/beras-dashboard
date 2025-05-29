const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const fetchPrediction = async (endpoint: string, stepsAhead: number) => {
  const res = await fetch(`${BASE_URL}/predict/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ steps_ahead: stepsAhead }),
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch prediction for ${endpoint}`);
  }

  const data = await res.json();
  return data.prediction;
};

// Prediksi masing-masing model
export const predictMediumSilinda = (stepsAhead: number) =>
  fetchPrediction("medium_silinda", stepsAhead);

export const predictMediumBapanas = (stepsAhead: number) =>
  fetchPrediction("medium_bapanas", stepsAhead);

export const predictPremiumSilinda = (stepsAhead: number) =>
  fetchPrediction("premium_silinda", stepsAhead);

export const predictPremiumBapanas = (stepsAhead: number) =>
  fetchPrediction("premium_bapanas", stepsAhead);
