# Quick Start — 5분 만에 시작하기

## 1. 요구사항

- **Node.js** 18 이상
- 터미널(명령 프롬프트) 사용 가능

## 2. 설치 및 실행 (3단계)

```bash
# 1. 프로젝트 폴더로 이동
cd kjv-rd-pray

# 2. 의존성 설치
npm install

# 3. 개발 서버 실행
npm run dev
```

## 3. 브라우저에서 보기

브라우저에서 **http://localhost:3000** 을 열면  
「기도하는 방법」 설교에 맞춘 **KJV 성경 구절 표**를 카테고리별로 볼 수 있습니다.

## 4. 자주 쓰는 명령어

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | 개발 서버 실행 (실시간 반영) |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 빌드 후 서버 실행 |
| `node scripts/build-verses.mjs` | KJV 데이터 다시 생성 |

## 5. 다음 단계

- **구절 추가/수정**: [Manual](MANUAL.md#데이터-수정) 참고
- **흠정역 한글 채우기**: [Manual](MANUAL.md#흠정역-한글) 참고
- **처음부터 설정**: [Tutorial](TUTORIAL.md) 참고
