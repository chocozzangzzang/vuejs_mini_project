// pinia store 정의

/*
    Vuex 또는 Pinia 같은 상태 관리 도구를 사용해 로그인 상태와 사용자 정보를 저장.

    1. 로그인 요청: 서버에 사용자의 자격 증명(예: 이메일, 비밀번호)을 보내고, 유효한 경우 토큰(예: JWT)을 받습니다.
    2. 상태 저장: 받은 토큰을 Vuex/Pinia 상태 또는 로컬 스토리지/세션 스토리지에 저장합니다.
    3. 인증 상태 확인: Vuex/Pinia의 상태를 통해 로그인 상태를 확인하고, 해당 사용자에 대한 정보를 애플리케이션에서 활용합니다.
    4. 로그아웃 처리: 상태에서 토큰을 제거하고, 로컬/세션 스토리지도 초기화합니다.

*/

import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', {
    state() {
        return {
            nowUser : JSON.parse(localStorage.getItem('nowUser')) || {}
        }
    },
    actions : {
        login(user) {
            // 로그인 --> 서버로 보낸 정보를 store에 저장 //
            const token = self.crypto.randomUUID();
            const nick = user.displayName;
            const nowUser = {token : token, nick : nick};
            localStorage.setItem('nowUser', JSON.stringify(nowUser));
            // this.user = {username : "admin", nickname : "admin User"};
            // this.error = null;
        },
        logout() {
            // 로그아웃 -- 토큰 및 유저 정보 초기화 //
            localStorage.removeItem('user');
            // this.user  = null;
        },
    },
    // !!연산자 -> boolean 값으로 변환하는 연산자 //
    // null이면 false, 값이 존재하면 true를 반환함 //
    getters : {
        isAuth : (state) => !!state.nowUser.token,
        getNick : (state) => state.nowUser.nick,
    },
});