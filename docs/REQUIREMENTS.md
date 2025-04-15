## ✨ 기능 요구사항

---

### UI

- [x] 페이지 진입 시, 20개의 아이템이 기본으로 노출되어야 합니다.
- 각 아이템은 다음의 항목을 포함합니다.
  - 상품명 (`title`)
  - 상품설명 (`description`)
  - 썸네일 이미지 (`thumbnail`)
  - 별점 (`rating`)
  - 리뷰 수 (`reviews`)
- View 방식 종류
  - [x] 리스트형 (List): 한 줄에 1개 아이템
  - [x] 그리드형 (Grid): 한 줄에 4개 아이템
- View 표시 조건은 다음과 같습니다.
  - [ ] 페이지 최초 진입 시 50% 확률로 랜덤하게 View 방식 결정
  - [ ] 결정된 방식은 24시간 동안 유지
  - [ ] 이후 다시 랜덤 결정

### 데이터 가져오기

- [DummyJSON API Docs](https://dummyjson.com/docs/products#products-all) Products API를 활용하여 Data를 가져올 수 있습니다.

### 페이지네이션

- [Limit과 Skip](https://dummyjson.com/docs/products#products-limit_skip)으로 페이지네이션 결과를 받을 수 있습니다.

### 검색 필터

- [ ] [search API](https://dummyjson.com/docs/products#products-search)를 활용해 문자열 검색이 가능해야 합니다.
- [ ] [sort API](https://dummyjson.com/docs/products#products-sort) 를 활용해 별점 (`rating`) 내림차순으로 정렬이 가능해야 합니다.
- 필터는 form을 사용해 구현해야 하며, 아래 조건을 만족해야 합니다.
  - [ ] 검색 버튼이 존재해야 합니다.
  - [ ] 페이지 새로고침 후에도 필터 값이 유지되어야 합니다.
- [ ] 검색 결과가 없을 경우 `일치하는 결과가 없습니다.` 문구가 표시되어야 합니다.

### 무한 스크롤

- [ ] 페이지 하단 도달 시 다음 20개의 아이템이 자동으로 로드 되어야 합니다.
- [ ] 필터 결과에도 무한 스크롤이 적용 되어야 합니다.
- [ ] 마지막 데이터까지 로딩되면 `더 이상 불러올 수 없습니다.` 문구가 표시되어야 합니다.
