# Let’s Be CEO

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2474b4e1-525b-4154-8e67-395d07ae1e9a/Untitled.png)

“창업에 겁내지 말자!**"**

### 📣구현 기능 및 기술

<지역구 내 상권분석에 대한 간략한 정보 제공><br/>
▶ 전체 요식업 매장의 평균 매출 제공<br/>
▶ 강남구 내 선택 법정동의 총 생활/직장/상주 인구 수 제공<br/>
▶ 강남구 내 전체 요식업 매장의 개수 제공<br/>
▶ 강남구 내 요일/시간대 별 상황 인구 수 제공<br/>

<지역구 내 상권의 선택 업종에 관련한 상세한 분석 정보 제공><br/>
▶ 상세 매출 분석
- 선택한 법정동 내 선택 업종의 분기당 평균 매출 제공
- 선택한 법정동 상권 내 시간/요일/나이/성별 매출 비율 제공<br/>
▶ 상세 지역 분석
- 선택한 법정동의 집객시설, 업종 개수 정보 제공
- 선택한 상권 주변 아파트 주변 시가 정보 제공
- 선택한 상권 주변 버스/지하철 정거장 수 정보 제공<br/>
▶ 상세 인구 분석
- 선택한 법정동의 상권 별 생활 인구/가구원 수 정보 제공
- 선택한 상권의 요일/시간대/연령 별 생활 인구 수, 요일 별 직장 인구/상주 인구 제공
- 사용자가 제공 받고 싶은 조건(나이, 요일, 시간, 성)에 따라 해당하는 생활 인구 수 제공
- 선택 상권의 가구 당 상주 인구 수, 실제 이동 인구 수, 일 평균 인구 수 제공<br/>

<손익분기점 관련 정보 제공><br/>
▶ 고정 비용, 변동 비용에 대한 값을 입력받고 대략적인 손익분기점 예측/제공
- 손익분기점 = 고정 비용/공헌 이익률 = 고정 비용/{(총 매출 – 변동 비용) / 총 매출} - 공헌 이익률 = (총 매출 – 변동 비용) / 총 매출
- 고정 비용 예시) 임대료, 급여, 대출이자, 인터넷/정수기 요금 등
- 변동 비용 예시) 원 재료비, 전기세, 수도세 등
- 공헌 이익 : 총 매출에서 변동 비용을 제한 값으로 고정 비용으로 지출해야 하는 값과
순이익이 될 수 있는 값이 포함되어 이는 값을 의미함.<br/> 
▶ 목표 순이익에 대한 값을 입력 받고 그에 따른 대략적 목표 매출 예측/제공
- 목표 매출 = (고정 비용 + 목표 이익)/공헌이익률
- 공헌 이익률 = (총 매출 – 변동 비용) / 총 매출<br/>
▶ 메뉴 평균 단가에 대한 값을 입력 받고 목표 매출에 따른 일 평균 필요 판매량 예측/제공
- 일 평균 목표 판매 수 = {목표 매출 / (기간을 기준으로 한 일수)} / 메뉴 평균 단가 <br/>

<예비 창업자와 현 창업자 들을 위한 게시판 제공><br/>
▶ 예비 창업자들과 기존 창업자들이 정보를 공유하는데 목적을 가진 게시판 기능 제공. - 게시글 조회는 누구나 가능하도록 구현
- 게시글 작성은 인증된 회원만 작성할 수 있도록 구현(∵허위 정보 생성 방지)<br/>

### 📣개발환경

- React  v17.0.2
- node.js v14.16.0
- mysql v2.18.1

### 📣사용 기술

### 서버

- node.js express를 활용한 API 개발

### 클라이언트

- React를 활용한 클라이언트 개발

### Database

- MySQL

### 클라우드 배포

- EC2와 도커를 활용한 배포
- 교내 DB 서버 활용

### 📣주요 키워드

- REST API
- CSR(Client Side Rendering)

### 📣시스템 구조

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4f3f0edc-8ebd-4aea-b180-6e77cd61dd64/Untitled.png)

<br>
### 📣결과물

### 메인페이지

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b65c627a-f5ef-4e97-b9c5-a63696d3456b/Untitled.png)

### **상권 간단 분석**

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ff781fc4-0b27-46a5-9fe3-a2f33605affa/Untitled.png)

### **가이드**

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/27f366a1-428f-4676-a638-9702d77c4e53/Untitled.png)

### **상권 상세 분석 - 지역(상권 선택 전)**

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/58c9cc2c-7c6e-4fa0-bea9-a930ddacedb9/Untitled.png)

### ****

### 상권 상세 분석 - 지역(상권 선택 후)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ce6c02be-d48b-498f-8b15-6c3126d24227/Untitled.png)

### **상권 상세 분석 - 인구(상권 선택 전)**

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9460a806-94cc-466b-a0ca-172501522e32/Untitled.png)

### **상권 상세 분석 - 인구(상권 선택 후)**

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2c84347b-640c-446d-b0a7-f14b8ff6ecdf/Untitled.png)

### **상권 상세 분석 - 매출(상권 선택 전)**

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e5977e30-f583-426d-ba69-05342f992b35/Untitled.png)

### **상권 상세 분석 - 매출(상권 선택 후)**

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/16ed11c5-2006-4060-b597-a8992143b418/Untitled.png)

### **손익분기점 계산**

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/27b08814-33eb-40ef-b42a-ec3871b8473b/Untitled.png)

### 소통 공간

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/534ea646-8e54-4f8c-adfc-42f3a3f08bd6/Untitled.png)

### 📣 시연영상

[https://www.youtube.com/watch?v=i3RMGNMNdJk&feature=youtu.be](https://www.youtube.com/watch?v=tUI9SSWdT2Q)

<br>
