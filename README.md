# 기도하는 방법 — KJV 성경 구절 정리

「기도하는 방법」 설교 내용에 맞춰 **KJV 성경** 구절만을 수집해, 카테고리별로 표로 보여 주는 Next.js 프로젝트입니다.

- **영문**: KJV (King James Version)만 사용
- **한글**: 흠정역 한글성경전서 대응란 (직접 채워 넣을 수 있음)
- **구분**: 설교 주제별 카테고리로 정리

## 문서

| 문서 | 설명 |
|------|------|
| [**Quick Start**](docs/QUICKSTART.md) | 5분 만에 실행하기 |
| [**Manual**](docs/MANUAL.md) | 사용 설명서 (기능·데이터·배포) |
| [**Tutorial**](docs/TUTORIAL.md) | 처음부터 따라 하는 튜토리얼 |

## 실행

```bash
npm install
npm run dev
```

브라우저에서 http://localhost:3000 으로 접속합니다.

## 데이터 갱신 (KJV 텍스트)

KJV 구절 텍스트는 [aruljohn/Bible-kjv](https://github.com/aruljohn/Bible-kjv)에서 가져옵니다.  
구절 목록을 바꾼 뒤 `src/data/verse-refs.json`을 수정하고 아래를 실행하면 `src/data/verses.json`이 다시 생성됩니다.

```bash
node scripts/build-verses.mjs
```

## 흠정역 한글

한글 열은 **흠정역 한글성경전서**에서만 채우도록 되어 있습니다.  
`src/data/verses.json`의 각 항목 `kr` 필드에 해당 구절의 흠정역 번역을 넣으면 표에 반영됩니다.  
(흠정역 전자 데이터는 별도 라이선스가 필요할 수 있어, 이 저장소에는 포함하지 않습니다.)

## 구조

- `src/data/verse-refs.json` — 수집할 구절 목록 (책, 장, 절, 카테고리)
- `src/data/verses.json` — 빌드 결과 (KJV + 한글 `kr`)
- `src/lib/types.ts` — 카테고리 정의 및 타입
- `scripts/build-verses.mjs` — KJV fetch 및 verses.json 생성
- `docs/` — [Quick Start](docs/QUICKSTART.md), [Manual](docs/MANUAL.md), [Tutorial](docs/TUTORIAL.md)
- `marketing/` — [광고·블로그·뉴스레터·이메일용 문구](marketing/README.md) (Facebook, Instagram, Threads, Blogger, Naver, Tistory, WordPress, Newsletter, Email)
