# 2팀 작업실

허들링 클럽 2회차 오프라인 밋업 조별 실험. 각자 내 자리를 채우면, 모였을 때 한 방이 된다.

- 작업실 (결과): `index.html` · 예시는 `index.html?demo`
- 허들 (다른 구성): `huddle.html` · 예시는 `huddle.html?demo`
- 오늘의 흐름 (진행): `process.html` · 예시는 `process.html?demo`
- 규칙: [AGENTS.md](AGENTS.md) — Claude가 자동으로 읽어요

## 처음 시작

1. 터미널에서 `gh auth login` 으로 GitHub 로그인
2. Claude에게: `<레포 주소> 클론해줘`
3. 클론한 폴더를 열고 **새 세션**에서:
   `내 GitHub 아이디로 브랜치 만들고 features/_template 복사해서 features/<내 아이디> 만들어줘. me.json에 내 이름이랑 색 넣어줘`
4. `커밋하고 PR 올려줘` → 조장이 merge하면 작업실에 내 자리가 생겨요

내 자리 꾸미는 법: [features/_template/README.md](features/_template/README.md)

## 자주 쓰는 말

| 할 때 | Claude에게 |
|---|---|
| 올릴 때 | 지금까지 커밋하고 PR 올려줘. 쓴 방식이랑 막혔던 점도 적어줘 |
| 조장이 merge 알림 | main 최신 받아줘 |
| 충돌 났을 때 | main 최신 받아서 충돌 해결하고 다시 push해줘 |
| push가 GH007로 막힘 | 이 레포 커밋 이메일을 내 GitHub noreply 주소로 바꾸고 다시 push해줘 |
| 막혔을 때 | 내 me.json status를 "막힘"으로 바꾸고 says에 막힌 내용 적어서 올려줘 |

## 폴더

```
index.html          작업실 (조장)
huddle.html         허들 · 같은 데이터를 둥근 테이블로 (조장)
process.html        오늘의 흐름 (조장)
members.json        6자리 · 레포 주소 (조장, 아침에 한 번)
styles/             공용 디자인 값 · 기본 스타일 (조장 · 디자인 담당)
shared/             공용 스크립트 · 예시 데이터 (조장)
features/_template/ 새 자리 시작용 복사본
features/<아이디>/   각자의 자리 (나만 고침)
```

개인 취향 규칙은 `CLAUDE.local.md`에 적어요. git에 올라가지 않아요.
