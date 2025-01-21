<template>
  <div class="menu">
    <!-- 반복적인 요소의 축약 v-for
      v-for="변수명 in array" :key="변수명"
      -> 변수명을 데이터 바인딩할 수 있음
      ( :key = "이름" 넣을 것 ) 
       key는 반복문의 요소를 구분시키는 역할을 함
       이때 in 안에 (a, i)까지 변수로 설정할 수 있음.
       a는 array의 값, i는 각 값의 인덱스
    -->
      <a v-for="(menu, idx) in menus" :key="idx">{{ menu }}</a>
    <!--
    <a>Home</a>
    <a>Products</a>
    <a>About</a>
    -->
  </div>
  <!-- {{ dataname }} 으로 값을 받아옴 -->
  <!-- 데이터바인딩 하는 이유
      1. 하드코딩은 값 변경이 어려움
      2. Vue의 실시간 자동 렌더링을 하기 위함
      -> Web-App에 유용하게 활용됨

      cf. 실시간으로 변경할 필요 없는 데이터는 굳이?
          데이터 바인딩을 할 필요가 없음 !!

      ++ HTML 속성도 바인딩 가능 ++
      ++ :속성 = "바인딩 변수명" ++
  -->
  
  <div v-for="(product, idx) in products" :key="idx">
    <h4>{{ product.name }}</h4>  
    <p>{{ product.price }} 만원</p>
    <button @click="product.reportTimes+=1">허위매물신고</button> <span>신고 횟수 : {{ product.reportTimes }}</span>
  </div>

  <!-- 
    이벤트 핸들러 : HTML 클릭 시 코드를 실행함
    @ == v-on=
  -->
  <!-- 클릭시 reportTimes를 증가시킴 
    click : 클릭 시
    mouseover : 마우스를 갖다대는 경우 
  -->

<!--   
  <div>
    <h4>{{ homes[0] }}</h4>
    <p>50 만원</p>

    <button @click="reports[0]+=1">허위 매물 신고</button> <span>신고 수 : {{ reports[0] }}</span>
  </div>
  <div>
    <h4>{{ homes[1] }}</h4>
    <p>60 만원</p>
    <button @click="reports[1]+=1">허위 매물 신고</button> <span>신고 수 : {{ reports[1] }}</span>
  </div>
  <div>
    <h4>{{ homes[2] }}</h4>
    <p>70 만원</p>
    <button @click="reports[2]+=1">허위 매물 신고</button> <span>신고 수 : {{ reports[2] }}</span>
  </div> -->
 
</template>

<script>

// DataBinding //
export default {
  name: 'App',
  data() {
    // return { } 내에 데이터를 모두 보관 //
    // object 형식으로 나타냄 //
    return {
      //price1 : 80,
      //price2 : 70,
      menus : ['Home', 'Shop', 'About'],
      homes : ['역삼동 원룸', '천호동 원룸', '마포구 원룸'],
      reports : [0, 0, 0],
      products : [
        {name : '역삼동 원룸', price : 80, reportTimes : 0},
        {name : '천호동 원룸', price : 70, reportTimes : 0},
        {name : '마포구 원룸', price : 95, reportTimes : 0},
      ],
      reportTimes : 0,
    }
  },
  // Vue에서의 함수 -> methods : {}
  // this -> export default { } 내의 데이터 사용
  methods: {
    increase() {
      this.reportTimes += 1;
    }
  },
  components: {
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.menu {
  background: darkslateblue;
  padding: 15px;
  border-radius: 5px;
}
.menu a {
  color: white;
  padding: 10px;
}
</style>
