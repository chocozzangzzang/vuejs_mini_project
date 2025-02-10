<template>
    <div class="login">
        <img src="../assets/logo.png" alt="profile" class="img"/>
        <h2>Login</h2>
        <form @submit.prevent="loginEmailPW">
            <div>
            <input class="inputBox" id="useremail" type="text" v-model="userEmail" placeholder="EMAIL"/>
            </div>
            <div>
            <input class="inputBox" id="userpw" type="password" v-model="userPw" placeholder="PW"/>
            </div>
            <button type="submit">로그인</button>
            <button @click="googleSignIn">구글로그인</button>
            <button @click="signIn">회원가입</button>
            <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
        </form>
        
    </div>
</template>

<script>
import { auth } from '@/firebase';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
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
                const loginUser = await signInWithEmailAndPassword(auth, userEmail.value, userPw.value);
                authStore.login(loginUser.user);
                route.push('/post');
            } catch(error) {
                errorMessage.value = error.message;
            }
        }

        const googleSignIn = async() => {
            const provider = new GoogleAuthProvider();
            try {
                const result = await signInWithPopup(auth, provider);
                authStore.login(result.user);
                console.log(result.user);
                route.push('/post');
            } catch (error) {
                console.log(error);
            }
        }

        return {
            userEmail,
            userPw,
            errorMessage,
            loginEmailPW,
            googleSignIn
        };
    },

    methods : {
        signIn() {
            this.$router.push('/signIn');
        }
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

.inputBox {
    border: 1px solid lightgray;
    border-radius: 10px;
    width: 40%;
}

</style>