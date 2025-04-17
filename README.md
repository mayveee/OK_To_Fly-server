## 물건 찍으면 기내 반입 금지 물품 알려주는 서비스
+ server
1. base64Image 형태로 이미지 전송 받음
2. 서버에서 Google Visual API 호출
3. 라벨 처리해서 클라이언트로 전송

### 🔗 `POST /test-vision`

---

### 요청 형식

```json
{
  "image": "data:image/jpeg;base64,..." 
}
```

### 응답 형식

| 상황          | HTTP 상태 코드 | 설명                                  |
|---------------|----------------|---------------------------------------|
| 성공          | `200 OK`       | Vision API 분석 성공                  |
| 클라이언트 오류 | `400 Bad Request` | 이미지가 요청에 포함되지 않았을 때     |
| 서버 오류      | `500 Internal Server Error` | Vision API 호출 실패 또는 예외 발생 시 |

---

### 응답 예시

#### 200 OK

```json
{
  "labels": ["bottle", "backpack"],
  "objectNames": ["bottle", "bag"],
  "forbiddenItems1": ["knife"],
  "cautionItems1": ["scissors"],
  "forbiddenItems2": [],
  "cautionItems2": ["bottle"],
  "message1": "❌ 반입 금지 물품이 포함되어 있습니다!",
  "message2": "⚠️ 주의가 필요한 물품이 포함되어 있습니다"
}
```

