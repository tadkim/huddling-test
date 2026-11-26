// 공용 픽셀 도구 — 조장만 수정. 작업실 · 오늘의 흐름 · 각자 페이지가 같이 씀
(function () {
  const css = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

  // 16 × 16 기본 캐릭터 (. 투명 · k 선 · h 머리 · s 피부 · c 옷 · w 흰색)
  const DEFAULT_SPRITE = [
    "....kkkkkkkk....",
    "...khhhhhhhhk...",
    "..khhhhhhhhhhk..",
    "..khhhhhhhhhhk..",
    "..khsssssssshk..",
    "..kssksssskssk..",
    "..kssssssssssk..",
    "...ksssskssssk..",
    "....kkkkkkkkk...",
    "...kccccccccck..",
    "..kcccwcccccck..",
    "..ksccccccccsk..",
    "...kcccccccck...",
    "...kcckkkkcck...",
    "...kkk....kkk...",
    "................"
  ];

  // 8 × 8 에이전트 로봇 (a = 주인 옷 색)
  const AGENT_SPRITE = [
    "...kk...",
    ".kkkkkk.",
    ".kaaaak.",
    ".kwaawk.",
    ".kaaaak.",
    ".kkkkkk.",
    "..k..k..",
    "........"
  ];

  const clamp = (n, lo, hi, d) => (Number.isInteger(n) && n >= lo && n <= hi ? n : d);

  function colorsFor(me) {
    const m = me || {};
    return {
      k: css("--pixel-ink"),
      w: css("--pixel-white"),
      s: css(`--pixel-skin-${clamp(m.skin, 1, 3, 1)}`),
      h: css(`--pixel-hair-${clamp(m.hair, 1, 4, 1)}`),
      c: css(`--pixel-color-${clamp(m.color, 1, 8, 1)}`),
      a: css(`--pixel-color-${clamp(m.color, 1, 8, 1)}`)
    };
  }

  // 16줄 × 16칸이 아니면 기본 캐릭터로 대신 그림
  function spriteOf(me) {
    const sp = me && me.sprite;
    const ok = Array.isArray(sp) && sp.length === 16 && sp.every((r) => typeof r === "string" && r.length === 16);
    return { rows: ok ? sp : DEFAULT_SPRITE, custom: ok, invalid: !!sp && !ok };
  }

  function draw(canvas, rows, colors, scale, ghost) {
    const h = rows.length, w = rows[0].length;
    canvas.width = w * scale;
    canvas.height = h * scale;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const ch = rows[y][x];
        if (ch === "." || ch === " ") continue;
        ctx.fillStyle = ghost ? (ch === "k" ? css("--pixel-wall-line") : css("--pixel-wall")) : (colors[ch] || colors.k);
        ctx.fillRect(x * scale, y * scale, scale, scale);
      }
    }
    return canvas;
  }

  async function getJSON(url) {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`${url} ${res.status}`);
    return res.json();
  }

  // members.json + 각자 me.json. demo면 shared/demo.json 하나로 대신함
  async function loadRoom(base, demo) {
    if (demo) return getJSON(`${base}shared/demo.json`);
    const members = await getJSON(`${base}members.json`);
    const seats = await Promise.all(
      members.seats.map(async (id) => {
        if (!id) return { id: "", me: null };
        try { return { id, me: await getJSON(`${base}features/${id}/me.json`) }; }
        catch (e) { return { id, me: null }; }
      })
    );
    return { repo: members.repo, seats };
  }


  // GitHub 기록 → { now, commits:[{login,at,msg,claude}], pulls:[{number,login,title,created_at,merged_at,state}] }
  // demo면 shared/demo-process.json
  async function loadFlow(repo, demo, base = "") {
    if (demo) return getJSON(`${base}shared/demo-process.json`);
    const gh = async (path) => {
      const res = await fetch(`https://api.github.com/repos/${repo}/${path}`, { headers: { Accept: "application/vnd.github+json" } });
      if (res.status === 403 || res.status === 429) throw new Error("GitHub 요청 한도에 걸렸어요. 잠시 뒤 자동으로 다시 시도해요");
      if (!res.ok) throw new Error(`GitHub ${res.status}`);
      return res.json();
    };
    const [rawCommits, rawPulls] = await Promise.all([gh("commits?per_page=100"), gh("pulls?state=all&per_page=100")]);
    return {
      now: new Date().toISOString(),
      commits: rawCommits.filter((c) => c.parents.length < 2).map((c) => ({
        login: (c.author && c.author.login) || c.commit.author.name,
        at: c.commit.author.date,
        msg: c.commit.message.split("\n")[0],
        claude: /Co-Authored-By:.*Claude/i.test(c.commit.message)
      })),
      pulls: rawPulls.map((p) => ({
        number: p.number, login: p.user.login, title: p.title,
        created_at: p.created_at, merged_at: p.merged_at, state: p.state
      }))
    };
  }

  const isDemo = () => new URLSearchParams(location.search).has("demo");

  window.PIXEL = { DEFAULT_SPRITE, AGENT_SPRITE, colorsFor, spriteOf, draw, getJSON, loadRoom, loadFlow, isDemo, css };
})();
