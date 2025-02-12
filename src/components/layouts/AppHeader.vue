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
      <a class="center" v-for="(menu, idx) in menus" :key="idx" @click="menuAlert(idx)">{{ menu }}</a>
      <span v-if="isAuth" class="spanT" @click="logout">logout</span>
      <span v-if="!isAuth" class="spanT" @click="login">login</span>
      <span v-if="isAuth" class="spanT">{{ getNick }} 님 환영합니다.</span>
    <!--
    <a>Home</a>
    <a>Products</a>
    <a>About</a>
    -->
  </div>
</template>

<script>
import { useAuthStore } from '@/store/auth';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

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
      },
    },

    setup() {
      const authStore = useAuthStore();
      const route = useRouter();

      const isAuth = computed(() => {
        return authStore.isAuth;
      });

      const getNick = computed(() => {
        return authStore.getNick;
      })

      const logout = (() => {
        authStore.logout();
        route.push('/login');
      });

      const login = (() => {
        route.push('/login');
      })

      return {
        isAuth,
        getNick,
        logout,
        login,
      }
    }
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

.spanT {
  float : right;
  color: white;
  padding-right: 15px;
}

.center {
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
}
</style>