// 내 자리 전용 스크립트 — me.json을 읽어 내 캐릭터를 그림
PIXEL.getJSON("me.json").then((me) => {
  PIXEL.draw(document.getElementById("me-char"), PIXEL.spriteOf(me).rows, PIXEL.colorsFor(me), 8);
  document.getElementById("me-name").textContent = me.name;
  document.getElementById("me-role").textContent = `${me.role} · ${me.status}`;
  document.getElementById("me-says").textContent = me.says;
  document.title = `${me.name}의 자리`;
});
