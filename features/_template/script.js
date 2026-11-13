// 이 기능 전용 스크립트
const button = document.getElementById("try-button");
const result = document.getElementById("result");

button.addEventListener("click", () => {
  result.textContent = "동작 확인 완료";
});
