## 물건 찍으면 기내 반입 금지 물품 알려주는 서비스
+ server
1. base64Image 형태로 이미지 전송 받음
2. 서버에서 Google Visual API 호출
3. 라벨 처리해서 클라이언트로 전송


## 스택

| 분야               | 사용 기술 및 설명                                                |
|--------------------|------------------------------------------------------------------|
| **프레임워크**      | Express.js (Node.js 기반 웹 서버 프레임워크)                    |
| **서버 호스팅**     | Render (무료 배포, 자동 CI/CD, HTTPS 지원)                     |
| **언어**            | JavaScript (Node.js)                                            |
| **API 통신**        | Axios (서버 내부에서 Google Vision API 호출)                  |
| **이미지 분석**     | Google Cloud Vision API (Label Detection + Object Detection)   |
| **라우팅**          | `/test-vision` POST, `/` GET (헬스 체크용)                      |
