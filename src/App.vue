<template>

  <!-- 모달창 : 기존에 등록해두고 호출하는 형태 -->
  <!-- v-if 조건식 -->
  <!-- 부모 -> 자식 컴포넌트 데이터 전달 (props)
       부모 컴포넌트에서 자식 컴포넌트 호출 시 변수명:값 으로 전달
       만약 동적 값이라면 :변수명:값 으로 전달할 것
       자식 컴포넌트에서는 <script> 내부에서 props : ['전달변수명'] 으로 받음 
    -->
  <!-- 자식 -> 부모 컴포넌트 데이터 전달 (emit)
       자식 컴포넌트에서 호출하는 함수() {this.$emit('부모 컴포넌트에서 받을 변수명', 전달할 값)}
       부모 컴포넌트에서 @받는 변수 명="부모 컴포넌트 내에서 값을 변경하기 위해 호출할 함수"
  -->
  <app-header/>
  <!-- <div> -->

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
  <router-link to="/"></router-link>
  <router-link to="/home"></router-link>
  <router-link to="/rooms"></router-link>
  <router-link to="/instagram"></router-link>
  <router-view></router-view>

  <!-- 
    이벤트 핸들러 : HTML 클릭 시 코드를 실행함
    @ == v-on=
  -->
  <!-- 클릭시 reportTimes를 증가시킴 
    click : 클릭 시
    mouseover : 마우스를 갖다대는 경우 
  -->
  <!-- </div> -->
 
</template>

<script>
import AppHeader from "./components/layouts/AppHeader.vue";

// DataBinding //
export default {
  name: 'App',
  data() {
    // return { } 내에 데이터를 모두 보관 //
    // object 형식으로 나타냄 //
    return {
      /* 
        1. UI의 현재 상태를 데이터로 저장해둠
        2. 데이터에 따라 UI가 어떻게 보일지 작성
      */  
      modalIsOpen : false,
      modalTitle : "",
      modalContent : "",
      orderByTitle : false,
      orderByPrice : 0,
      filterByPrice : false,
    }
  },
  // Vue에서의 함수 -> methods : {}
  // this -> export default { } 내의 데이터 사용
  components: {
    AppHeader,
  },
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

body {
  margin : 0;
}

</style>
