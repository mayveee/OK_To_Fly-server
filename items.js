// 기내 반입 금지 제한 리스트
module.exports = {
  forbiddenItems: [
    "knife",
    "scissors",
    "gun",
    "taser",
    "explosive",
    "grenade"
  ],

  cautionItems: [
    // 💧 액체류: 100ml 제한
    "liquid",
    "bottle",
    "water",
    "shampoo",
    "lotion",
    "gel",
    "drink",

    // 🔋 전자 기기 또는 배터리
    "battery",
    "power bank",
    "laptop"
  ]
};
