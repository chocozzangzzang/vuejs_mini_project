<template>
    <div class="login">
        <img src="../assets/logo.png" alt="profile" class="img"/>
        <h2>Login</h2>
        <form @submit.prevent="signUpWithEmailPw">
            <div>
                <input id="useremail" type="text" v-model="userEmail" placeholder="EMAIL"/>
            </div>
            <div>
                <input id="userpw" type="password" v-model="userPw" placeholder="PW"/>
            </div>
            <div>
                <input id="userpw2" type="password" v-model="userPw2" placeholder="PW check"/>
            </div>
            <button type="submit">회원가입</button>
            <div :class="errorClass">{{ errorMessage }}</div>
            <div :class="errorClass2">{{ errorMessage2 }}</div>
        </form>
        
    </div>
</template>

<script>
import router from '@/router';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { computed, ref } from 'vue';


export default {

    setup() {

        const userEmail = ref('');
        const userPw = ref('');
        const userPw2 = ref('');
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isValidEmail = computed(() => emailRegex.test(userEmail.value));

        const signUpWithEmailPw = async () => {
            const auth = getAuth();
            try {
                if(userPw.value && userPw.value && userPw.value !== userPw2.value) {
                    alert("비밀번호가 다릅니다!!");
                } else {
                    if(userEmail.value && isValidEmail.value && userPw.value && userPw2.value && userPw.value === userPw2.value) {
                        const assginedUser = await createUserWithEmailAndPassword(auth, userEmail.value, userPw.value);
                        console.log(assginedUser);
                        router.push('/post');
                    }
                }
            }
            catch(error) {
                alert(error.message);
            }
        }
        
        return {
            userEmail,
            isValidEmail,
            userPw,
            userPw2,
            signUpWithEmailPw
        };
    },

    computed : {
        errorMessage() {
            if(this.userPw && this.userPw2) {
                if(this.userPw === this.userPw2) {
                    return '비밀번호가 일치합니다.';
                } else {
                    return '비밀번호가 일치하지 않습니다.';
                }
            } else{
                return '비밀번호를 입력하시오';
            }
        }, 
        
        errorClass() {
            if(this.userPw && this.userPw2) {
                if(this.userPw === this.userPw2) {
                    return 'valid';
                } else {
                    return 'invalid';
                }
            } else{
                return 'invalid';
            }
        },

        errorMessage2() {
            if(!this.userEmail) {
                return '이메일을 입력하시오.';
            }
            else if(this.isValidEmail && this.userEmail) {
                return '올바른 이메일 형식입니다.';
            } else {
                return '올바른 이메일 형식이 아닙니다.';
            }
        },

        errorClass2() {
            if(!this.userEmail) {
                return 'invalid';
            }
            else if(this.isValidEmail && this.userEmail) {
                return 'valid';
            } else {
                return 'invalid';
            }
        },
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

.invalid {
    color : red;
    margin-top : 20px;
}

.valid {
    color : green;
    margin-top: 20px;
}
</style>