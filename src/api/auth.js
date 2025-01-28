// axios를 활용한 Authorization 헤더 //
// 백엔드 - 프론트엔드 간 인증데이터 (JWT) 를 교환 //

import axios from "axios";

const apiClient = axios.create({
    baseURL : 'https://chocozzang.com',
});

apiClient.interceptors.request.use((config) => {
    // 클라이언트가 localStorage에 저장한 JWT를 받음 //
    const token = localStorage.getItem('token');
    // token이 존재한다면 token을 백엔드로 전달함 //
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiClient;