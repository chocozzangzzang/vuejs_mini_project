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
      <a v-for="(menu, idx) in menus" :key="idx" @click="menuAlert(idx)">{{ menu }}</a>
    <!--
    <a>Home</a>
    <a>Products</a>
    <a>About</a>
    -->
  </div>
</template>

<script>
export default {
    data() {
        return {
            menus : ['Home', 'Shop', 'Instagram', 'Post'],
        }
    },
    methods : {
      menuAlert(idx) {
        if(idx == 0) this.$router.push('/home');
        else if(idx == 1) this.$router.push('/rooms');
        else if(idx == 2) this.$router.push('/instagram');
        else if(idx == 3) this.$router.push('/post');
      }
    },
}
</script>

<style scoped>
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