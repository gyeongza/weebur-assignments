## WEEBUR 프론트엔드 과제

- 상품 데이터를 활용하여, 상품 리스트 페이지를 구현

---

## 실행방법

```
git clone https://github.com/gyeongza/weebur-assignments.git

cd weebur-assignments

npm install

npm run dev
```

## 사용 기술 및 이유

### Core

- TypeScript
  - 정적 타입 시스템을 통해 런타임 오류를 방지하고 코드의 가독성과 유지보수성을 향상시키기 위해 사용
- React
  - 선언적 UI 구성과 컴포넌트 기반 아키텍처를 통해 효율적인 UI 개발이 가능하도록 선택
- Next.js 14
  - 리액트를 지원하는 프레임워크로 SSR과 캐싱 및 라우팅을 편리하게 사용하기위해 사용

### Style

- Shadcn/ui (+ Tailwind CSS)
  - Radix ui 기반의 재사용 가능한 UI 컴포넌트 라이브러리로, 별도의 설치없이 커스터마이징해서 사용할 수 있어 선택

### State Managements

- React Query
  - 서버 상태 (데이터 페칭, 캐싱, 동기화 및 상태 업데이트)를 효율적으로 관리하기 위해 사용

###

## 프로젝트 폴더 구조

```
src/
├── app/
│   ├── _components/         # 전역 공통 컴포넌트
│   │   ├── ui/              # Shadcn UI 컴포넌트
│   │   └── react-query-provider.tsx
│   ├── _lib/                # 공통 라이브러리 및 유틸리티
│   ├── _utils/              # 유틸리티 함수
│   ├── api/                 # API 라우트
│   │   └── product/         # 상품 관련 API 엔드포인트
│   ├── (home)/              # 홈 라우트 그룹
│   │   ├── _api/            # 홈 페이지 API 클라이언트
│   │   ├── _components/     # 홈 페이지 컴포넌트
│   │   │   ├── product-card.tsx          # 상품 카드 컴포넌트
│   │   │   ├── product-filter-form.tsx   # 상품 필터링 폼
│   │   │   ├── product-list.tsx          # 상품 목록 컴포넌트
│   │   │   ├── product-list-skeleton.tsx # 로딩 스켈레톤 UI
│   │   │   └── view-button.tsx           # 뷰 전환 버튼
│   │   ├── _constants/      # 상수 정의
│   │   ├── _hooks/          # 커스텀 훅
│   │   ├── _type/           # 타입 정의
│   │   └── page.tsx         # 홈 페이지 컴포넌트
│   ├── globals.css          # 전역 스타일
│   ├── layout.tsx           # 루트 레이아웃
│   └── favicon.ico          # 파비콘
```

## 기능 요구사항

- /docs/REQUIREMENTS.md 참고

## 구현하며 고민했던 점

### 폴더 구조 및 컨벤션

- 라우팅 그룹 (home)을 만들어 상품 리스트 페이지를 구현했습니다.
  - [Next.js 공식문서](https://nextjs.org/docs/14/getting-started/project-structure#route-groups-and-private-folders)의 Route Group, Private Folders를 참고하여 client component는 `_api`, `_component`와 같이 구성하였습니다.
  - 또한 각 페이지에서만 사용되는 컴포넌트나 훅들은 관심사 분리를 위해 페이지 내에 폴더에 묶었습니다.
  - 따라서 Private Folders를 통해 서버 컴포넌트, 클라이언트 컴포넌트를 명확히 분리할 수 있었습니다.

### 필요한 항목만 포함하도록 상품 API 따로 구현

- `/products`로 불러오는 상품리스트에는 클라이언트에서 필요없는 데이터들이 들어있어서 해당 데이터는 Route Handler를 통해 서버에서 처리하고 클라이언트에는 필요한 데이터만 받아오도록 분리했습니다.

  - app 폴더 내부의 api는 서버, (home) 폴더 내부의 \_api는 클라이언트 api입니다.
  - 클라이언트에서는 꼭 필요한 필드만 전달받도록 가공하여 네트워크 사용량을 줄이고, Type 추론을 명확하게 하기 위해 서버 사이드에서 미리 가공했습니다.
    - 클라이언트 로직은 단순해지고, 타입 안정성도 확보할 수 있었습니다.

- 상품 리스트, 검색 api 분리에 대한 고민
  - 검색의 경우 `/products/search`의 경로로 요청해야합니다.
  - 클라이언트에서도 두개의 api로 분리하려고 했지만 query params에 정렬, 페이지네이션 등은 중복되었기 때문에 하나로 통합했습니다.
  - 백엔드에서는 검색어 여부에 따라 각각 다른 라우트로 요청하고 나머지는 같은 params를 사용하도록 했습니다.

### View 방식 결정

- 초기 진입 시 리스트 or 그리드 UI가 무작위로 설정되는 UX를 의도했기 때문에 `useViewMode` 훅을 만들어 로컬스토리지에 해당 설정을 저장하도록 했습니다.
  - 사용자가 같은 브라우저로 재방문했을 때 UI가 일관되게 유지되며, 24시간이 지나면 다시 새로운 형태를 보여줍니다.
  - 그리드의 경우 구체적인 요구사항은 없었지만 화면크기를 고려해 4개에서 점차 줄어들도록 반응형으로 설계했습니다.

### 검색 필터 상태관리

- `searchParams`을 이용하여 새로고침 후에도 결과값이 유지되도록 했습니다.
  - router replace대신 push를 사용하여 히스토리 관리를 할 수 있도록 구현했습니다.

### 무한 스크롤

- React Query Key 관리

  - query key는 명확한 캐싱과 리팩터링의 편의를 위해 [key factory pattern](https://tkdodo.eu/blog/effective-react-query-keys#use-query-key-factories)을 참고하여 관리했습니다.
  - 파라미터별로 키를 구분할 수 있어 캐시 정책이 명확해지고, 동일한 조건에 대해 서버 요청이 중복되지 않도록 최적화했습니다.

- 커스텀 훅 분리
  - `useInfiniteProducts` 훅으로 비즈니스 로직을 분리함으로써 뷰 레이어에서는 UI 표현에만 집중할 수 있게 했습니다.

### 에러 처리

- 상품 리스트를 불러올 때 발생할 여러가지 에러 케이스들을 정의했습니다.
  - fetch error가 발생하면 먼저 백엔드에서오는 에러코드와 메시지를 확인하고 네트워크 상태 코드에 따른 메시지도 보여줍니다.
  - 현재는 `ProductList` 컴포넌트 내부에서 에러를 처리하고 있지만 throwOnError를 통해 에러를 상위로 전파하여 ErrorBoundary를 사용하거나 error.tsx를 이용할 수도 있을 것 같습니다.
