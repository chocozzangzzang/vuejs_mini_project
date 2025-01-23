<template>

  <!-- 모달창 : 기존에 등록해두고 호출하는 형태 -->
  <!-- v-if 조건식 -->
  <!-- 부모 -> 자식 컴포넌트 데이터 전달 (props)
       부모 컴포넌트에서 자식 컴포넌트 호출 시 변수명:값 으로 전달
       만약 동적 값이라면 :변수명:값 으로 전달할 것
       자식 컴포넌트에서는 <script> 내부에서 props : ['전달변수명'] 으로 받음 
    -->
  <modal-layout v-if="modalIsOpen" :title="modalTitle" :content="modalContent" @modal-state="modalClose"/>
  <!-- 자식 -> 부모 컴포넌트 데이터 전달 (emit)
       자식 컴포넌트에서 호출하는 함수() {this.$emit('부모 컴포넌트에서 받을 변수명', 전달할 값)}
       부모 컴포넌트에서 @받는 변수 명="부모 컴포넌트 내에서 값을 변경하기 위해 호출할 함수"
  -->
  <app-header/>

  <div class="totalDiv">
    <side-bar @sortStandard="sorting"/>

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
    <room-info @oneroomInfo="callModal" 
      :orderByTitle="orderByTitle"
      :orderByPrice="orderByPrice"
      :filterByPrice="filterByPrice"/>  

  <!-- 
    이벤트 핸들러 : HTML 클릭 시 코드를 실행함
    @ == v-on=
  -->
  <!-- 클릭시 reportTimes를 증가시킴 
    click : 클릭 시
    mouseover : 마우스를 갖다대는 경우 
  -->
  </div>
 
</template>

<script>
import AppHeader from "./components/layouts/AppHeader.vue";
import ModalLayout from "./components/layouts/ModalLayout.vue";
import SideBar from "./components/layouts/SideBar.vue";
import RoomInfo from "./components/RoomInfo.vue";

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
  methods: {
    modalOpen(idx) {
      this.modalIsOpen = true;
      if(this.orderbyName) {
        this.modalTitle = this.orderedByName[idx].title;
        this.modalContent = this.orderedByName[idx].content;
      } else if(this.orderbyPrice) {
        this.modalTitle = this.orderedByPrice[idx].title;
        this.modalContent = this.orderedByPrice[idx].content;
      } else if(this.priceFilter) {
        this.modalTitle = this.filteredByPrice[idx].title;
        this.modalContent = this.filteredByPrice[idx].content;
      } else {
        this.modalTitle = this.onerooms[idx].title;
        this.modalContent = this.onerooms[idx].content;
      }
    },
    modalClose() {
      this.modalIsOpen = false;
      this.modalTitle = "";
      this.modalContent = "";
    },
    sorting(state) {
      if(state.sortByN) {
        this.orderByTitle = !this.orderByTitle; 
        this.orderbyPrice = 0;
        this.filterByPrice = false;}
      else if(state.sortByP) {
        this.orderByTitle = false; 
        this.orderByPrice = (this.orderByPrice + 1) % 3;
        this.filterByPrice = false;}
      else if(state.filterByP) {
        this.orderbyName = false; 
        this.orderbyPrice = 0; 
        this.filterByPrice = !this.filterByPrice;}
      else {
        this.orderbyName = false; 
        this.orderbyPrice = 0; 
        this.filterByPrice = false;}
    },
    callModal(data) {
        this.modalIsOpen = true;
        this.modalTitle = data.title;
        this.modalContent = data.content;
    },
  },
  components: {
    AppHeader,
    ModalLayout,
    SideBar,
    RoomInfo,
  },
  computed: {
    filteredByPrice() {
      return this.onerooms.filter( oneroom => {
        return (oneroom.price >= 500000);
      }).sort((a, b) => a.price - b.price);
    },
    orderedByPrice() {
      return[...this.onerooms].sort((a, b) => {
        return this.orderbyPrice == 1? a.price - b.price : b.price - a.price;});
    },
    orderedByName() {
      return[...this.onerooms].sort((a, b) => {return a.title.localeCompare(b.title, 'ko-KR')});
    }
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

/* 모달 창 디자인 */

body {
  margin : 0
}

.totalDiv {
  display: grid;
  grid-template-columns: 1fr 6fr;
  gap: 10px;
}

</style>
