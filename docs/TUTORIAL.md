# Tutorial — 처음부터 따라 하기

이 튜토리얼은 「기도하는 방법」 KJV 구절 정리 프로젝트를 **처음 받은 상태에서** 실행하고, 구절을 하나 추가해 보는 과정을 단계별로 안내합니다.

---

## Step 1: 프로젝트 받기 및 설치

1. 프로젝트 폴더(`kjv-rd-pray`)가 있는 위치에서 터미널을 엽니다.
2. 아래 명령을 실행합니다.

```bash
cd kjv-rd-pray
npm install
```

3. 설치가 끝나면 다음으로 개발 서버를 띄웁니다.

```bash
npm run dev
```

4. 브라우저에서 **http://localhost:3000** 을 엽니다.  
   카테고리별로 정리된 KJV 구절 표가 보이면 성공입니다.

---

## Step 2: 표가 어떻게 만들어지는지 이해하기

- 화면의 **표**는 `src/data/verses.json` 데이터를 읽어서 만듭니다.
- `verses.json` 은 **구절 목록** `src/data/verse-refs.json` 을 기준으로, 스크립트가 KJV 원문을 가져와 자동 생성한 파일입니다.

즉, **구절을 바꾸거나 추가하려면**  
먼저 `verse-refs.json` 을 수정한 뒤, 스크립트를 다시 실행하면 됩니다.

---

## Step 3: 구절 하나 추가해 보기

예: **요한복음 14:13** 을 「주기도문」 카테고리에 추가한다고 가정합니다.

1. `src/data/verse-refs.json` 파일을 엽니다.
2. 적당한 위치(같은 카테고리 근처)에 아래 한 줄을 추가합니다.  
   (쉼표 위치에 주의합니다.)

```json
{"book": "John", "chapter": 14, "verse": 13, "categoryId": "lords-prayer"}
```

3. 저장한 뒤, 터미널에서 다음을 실행합니다.

```bash
node scripts/build-verses.mjs
```

4. 브라우저를 새로 고침합니다.  
   표에 **John 14:13** 이 해당 카테고리 섹션에 나타나야 합니다.

---

## Step 4: 흠정역 한글 넣기 (선택)

1. `src/data/verses.json` 을 엽니다.
2. 방금 추가한 구절(예: John 14:13) 항목을 찾습니다.
3. `"kr": ""` 부분을 흠정역 본문으로 채웁니다.

```json
"kr": "그리고 너희가 내 이름으로 무엇이든지 구하면 내가 행하리니"
```

4. 저장 후 브라우저를 새로 고침하면 「흠정역 한글」 열에 반영됩니다.  
   (실제 문장은 흠정역 한글성경전서를 기준으로 입력하세요.)

---

## Step 5: 새 카테고리 추가하기 (선택)

1. `src/lib/types.ts` 를 엽니다.
2. `CATEGORIES` 배열에 새 항목을 추가합니다.

```ts
{ id: "my-category", label: "내가 만든 주제", order: 22 }
```

3. `src/data/verse-refs.json` 에서 원하는 구절에 `"categoryId": "my-category"` 를 지정합니다.
4. `node scripts/build-verses.mjs` 를 다시 실행한 뒤 페이지를 새로 고침합니다.

---

## 정리

| 하고 싶은 일 | 하는 방법 |
|-------------|-----------|
| 로컬에서 보기 | `npm run dev` → http://localhost:3000 |
| 구절 추가/삭제 | `verse-refs.json` 수정 → `node scripts/build-verses.mjs` |
| 한글 넣기 | `verses.json` 에서 해당 구절의 `kr` 수정 |
| 카테고리 추가 | `types.ts` 의 `CATEGORIES` 수정 + `verse-refs.json` 에 `categoryId` 사용 |

더 자세한 내용은 [Manual](MANUAL.md) 과 [Quick Start](QUICKSTART.md) 를 참고하세요.
