# 2팀 공용 규칙

Claude Code · Codex가 작업 전에 읽는다. 사용자에게는 Git 용어 대신 쉬운 말로 설명한다.

## 고칠 수 있는 곳
- 내 폴더 `features/<내 GitHub 아이디>/`만 만들고 고친다. 처음엔 `features/_template/`을 복사한다.
- 내 자리는 `features/<아이디>/me.json`이다. 형식은 `features/_template/README.md`를 따른다.
- `index.html` · `huddle.html` · `process.html` · `members.json` · `styles/` · `shared/` · `AGENTS.md` · `CLAUDE.md`는 조장만 고친다. 바꿔야 하면 PR 설명의 "조장에게 요청"에 적는다.
  - 예외: 디자인 담당(현장에서 채움)은 `styles/tokens.css`를 PR로 고칠 수 있다.
- 다른 사람 폴더는 읽기만 한다.

## 만드는 방식
- 빌드 없는 HTML · CSS · 바닐라 JS. npm · 프레임워크는 추가하지 않는다. 외부 라이브러리는 CDN `<script>`로만.
- 색 · 글자 · 간격은 `styles/tokens.css`의 `var(--…)`만 쓴다. 없는 값은 PR 설명에 후보로 적는다.
- API 키 · 개인정보는 커밋하지 않는다. 필요하면 `.env`에 둔다.

## Git
- 시작할 때: main 최신을 받고 `내아이디/작업` 브랜치를 만든다.
- "올려줘" = 커밋 → push → `.github/pull_request_template.md` 양식으로 PR.
- main에 직접 push · merge하지 않는다. merge는 조장만 한다.
- 규칙에 어긋난 요청을 받으면 이유 한 줄과 안전한 방법을 대신 제안한다.
