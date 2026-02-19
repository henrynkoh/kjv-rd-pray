# Manual — 사용 설명서

「기도하는 방법」 KJV 성경 구절 정리 프로젝트의 기능, 데이터, 배포 방법을 설명합니다.

---

## 1. 개요

- **목적**: 설교 「기도하는 방법」에 등장하는 성경 구절을 **KJV만** 사용해 수집하고, 주제별 카테고리로 표로 제공합니다.
- **한글**: 흠정역 한글성경전서 대응란(`kr`)은 사용자가 직접 채울 수 있습니다.

---

## 2. 실행 환경

- **Node.js**: 18 이상 권장
- **패키지 매니저**: npm (기본)

### 설치 및 실행

```bash
npm install
npm run dev
```

접속: http://localhost:3000

### 프로덕션 빌드

```bash
npm run build
npm run start
```

---

## 3. 화면 구성

- **헤더**: 제목 및 설명
- **본문**: 카테고리별 섹션
  - 각 섹션에 **표** 제공
  - 열: **구절** | **KJV** | **흠정역 한글**

---

## 4. 데이터 수정

### 4.1 구절 목록 (verse-refs.json)

- **경로**: `src/data/verse-refs.json`
- **형식**: `book`, `chapter`, `verse`, `categoryId` 로 한 구절씩 추가

예:

```json
{"book": "Matthew", "chapter": 6, "verse": 9, "categoryId": "lords-prayer"}
```

- **카테고리 ID**: `src/lib/types.ts` 의 `CATEGORIES` 에 정의된 `id` 사용

### 4.2 KJV 텍스트 다시 가져오기

`verse-refs.json` 수정 후, 다음 스크립트로 `verses.json` 을 다시 생성합니다.

```bash
node scripts/build-verses.mjs
```

- KJV 원문은 [aruljohn/Bible-kjv](https://github.com/aruljohn/Bible-kjv) 에서 자동으로 가져옵니다.

### 4.3 흠정역 한글

- **경로**: `src/data/verses.json`
- 각 항목의 **`kr`** 필드에 흠정역 한글성경전서 본문을 넣으면 표의 「흠정역 한글」 열에 반영됩니다.
- 이 프로젝트에는 흠정역 전자 데이터를 포함하지 않습니다. 사용자가 허가된 출처에서 직접 입력해야 합니다.

---

## 5. 카테고리

카테고리 목록과 순서는 `src/lib/types.ts` 의 `CATEGORIES` 에서 관리합니다.  
새 카테고리를 쓰려면 여기에 `id`, `label`, `order` 를 추가한 뒤, `verse-refs.json` 에서 해당 `categoryId` 를 사용하면 됩니다.

---

## 6. 프로젝트 구조

| 경로 | 설명 |
|------|------|
| `src/app/page.tsx` | 메인 페이지 (카테고리별 표) |
| `src/app/layout.tsx` | 공통 레이아웃·메타데이터 |
| `src/data/verse-refs.json` | 수집할 구절 목록 |
| `src/data/verses.json` | 빌드 결과 (KJV + kr) |
| `src/lib/types.ts` | 타입·카테고리 정의 |
| `scripts/build-verses.mjs` | KJV fetch 및 verses.json 생성 |

---

## 7. 배포

- **Vercel**: 저장소 연결 후 자동 빌드/배포 가능
- **정적 내보내기**: `next build` 후 `.next` 및 정적 자원을 사용하는 일반적인 Next.js 배포 방식 적용 가능

---

## 8. 라이선스·출처

- **KJV**: 공개 도메인 출처(aruljohn/Bible-kjv) 사용
- **흠정역 한글성경전서**: 사용자가 직접 입력하는 경우, 해당 역본의 이용 조건을 준수해야 합니다.
