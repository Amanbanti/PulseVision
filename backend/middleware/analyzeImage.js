import fs from 'fs/promises';
import fetch from 'node-fetch';

function getModelUrl(scanType) {
  // Replace this logic with your actual scanType -> model mapping
  return 'https://api-inference.huggingface.co/models/google/vit-base-patch16-224';
}

export const analyzeImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided." });
    }

    const modelUrl = getModelUrl(req.body.scanType);
    const imagePath = req.file.path;

    const imageBuffer = await fs.readFile(imagePath);

    console.log(`Sending image to Hugging Face model: ${modelUrl}`);

    const response = await fetch(modelUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HUGGING_FACE_TOKEN}`,
        "Content-Type": "application/octet-stream",
      },
      body: imageBuffer,
    });

    const analysisData = await response.json();

    if (!response.ok) {
      throw new Error(`Hugging Face API error: ${JSON.stringify(analysisData)}`);
    }

    req.analysisResult = analysisData;
    const abnormalCount = analysisData.filter(r => r.score > 0.05).length;
    const abnormalRate = (abnormalCount / analysisData.length) * 100;
    console.log(`Abnormal rate: ${abnormalRate}%`);
    req.confidence = (100-abnormalRate).toFixed(2)
    const isAbnormal = abnormalRate > 50;
    req.isAbnormal = isAbnormal;
    next();

  } catch (error) {
    console.error("AI analysis failed:", error);
    res.status(500).json({ error: "AI analysis failed", detail: error.message });
  }
};
