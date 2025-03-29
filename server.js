const express = require('express');
const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3001;
const API_KEY = process.env.GOOGLE_VISION_API_KEY;
const itemData = require('./items');

app.get('/test-vision', async (req, res) => {
    try {
        const imagePath = './test3.jpg';
        const forbiddenItems = itemData.forbiddenItems || [];
        const cautionItems = itemData.cautionItems || [];
        console.log("forbiddenItems:", itemData.forbiddenItems);
        console.log("cautionItems:", itemData.cautionItems);

        // 파일 읽어서 base64 인코딩
        const imageBuffer = fs.readFileSync(imagePath);
        const base64Image = imageBuffer.toString('base64');

        // Vision API 요청
        const response = await axios.post(
        `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`,
        {
            requests: [
            {
                image: { content: base64Image },
                features: [
                    { type: "LABEL_DETECTION", maxResults: 15 },
                    { type: "OBJECT_LOCALIZATION", maxResults: 15}
                ]
            }
            ]
        }
        );
        
        // 라벨 받아오는 부분
        const annotations = response.data.responses[0].labelAnnotations;
        const labels = annotations ? annotations.map(a => a.description) : [];
        // ✅ Object Localization 기반
        const localized = response.data.responses[0].localizedObjectAnnotations || [];
        const objectNames = localized.map(o => o.name.toLowerCase().trim());
        // 데이터 통합
        // const allKeywords = [...new Set([...labels, ...objectNames])];
        // 라벨 처리하는 부분
        const detectedForbidden1 = labels.filter(label =>
            forbiddenItems.includes(label.toLowerCase())
        );  
        const detectedCaution1 = labels.filter(label =>
            cautionItems.includes(label.toLowerCase())
        );
        //
        const detectedForbidden2 = objectNames.filter(label =>
            forbiddenItems.includes(label.toLowerCase())
        );  
        const detectedCaution2 = objectNames.filter(label =>
            cautionItems.includes(label.toLowerCase())
        );
        //
        // 응답 생성 부분
        let message = "✅ 반입 가능한 물품입니다.";
        if (detectedForbidden1.length > 0) {
            message = "❌ 반입 금지 물품이 포함되어 있습니다!";
        } else if (detectedCaution1.length > 0) {
            message = "⚠️ 주의가 필요한 물품이 포함되어 있습니다. (예: 액체류 100ml 이하)";
        }
        res.json({
            labels,
            objectNames,
            forbiddenItems1: detectedForbidden1,
            cautionItems1: detectedCaution1,
            forbiddenItems2: detectedForbidden2,
            cautionItems2: detectedCaution2,
            message
        });
    } catch (err) {
        console.error('❌ Vision API Error:', err.response?.data || err.message);
        res.status(500).json({ error: 'Vision API 호출 실패', details: err.response?.data || err.message });
    }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
