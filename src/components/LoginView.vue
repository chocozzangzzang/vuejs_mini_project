<template>
    <div class="login">
        <img src="../assets/logo.png" alt="profile" class="img"/>
        <h2>Login</h2>
        <form @submit.prevent="loginEmailPW">
            <div>
            <input id="useremail" type="text" v-model="userEmail" placeholder="EMAIL"/>
            </div>
            <div>
            <input id="userpw" type="password" v-model="userPw" placeholder="PW"/>
            </div>
            <button type="submit">로그인</button>
            <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
        </form>
        
    </div>
</template>

<script>
import { auth } from '@/firebase';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuthStore } from '../store/auth.js';


export default {

    setup() {

        const userEmail = ref('');
        const userPw = ref('');
        const errorMessage = ref('');
        const route = useRouter();
        const authStore = useAuthStore();

        const loginEmailPW = async () =>  {
            try {
                await signInWithEmailAndPassword(auth, userEmail.value, userPw.value);
                authStore.login();
                route.push('/post');
            } catch(error) {
                errorMessage.value = error.message;
            }
        }

        return {
            userEmail,
            userPw,
            errorMessage,
            loginEmailPW
        };
    }
    
}
</script>

<style>

.body {margin: 0;}

.login {
    margin-top: 40px;
}
  
input {
    margin: 10px 0;
    width: 20%;
    padding: 15px;
}
  
button {
    margin-top: 20px;
    width: 10%;
    cursor: pointer;
}
  
p {
    margin-top: 40px;
    font-size: 15px;
}

.img {
    margin-top : 20px;
    width: 100px;
    height: 100px;
}

.error {
    color : red;
    margin-top : 20px;
}

</style>