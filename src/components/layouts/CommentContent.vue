<template>
  <div v-for="(com, idx) in comm" :key="idx" class="comment">
    <div class="content">
        <div class="info">
            <span class="nickname">{{ com.nickname }}</span>
            <span class="date">{{ com.date }}</span>
        </div>
        <p class="detail">{{ com.text }}</p>
        <div class="actions">
            <button v-if="isWriter(com.nickname)">✏️수정</button>
            <button v-if="isWriter(com.nickname)">🗑️삭제</button>
        </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/store/auth';

export default {
    props : ['comm'],
    
    data() {
        return {
            newComment : '',

        }
    },

    methods : {
        formatDate(date) {
            return new Intl.DateTimeFormat('ko-KR', {
                year : 'numeric',
                month : '2-digit',
                day : '2-digit',
                hour : '2-digit',
                minute : '2-digit',
            }).format(date);
        },

        isWriter(nickname) {
            const auth = useAuthStore();
            return auth.getNick === nickname;
        }
    },
}
</script>

<style scoped>
.comment {
    display : flex;
    align-items : flex-start;
    padding : 10px;
    border-bottom : 1px solid #ddd;
}

.content {
    flex : 1;
}

.info {
    display : flex;
    justify-content : space-between;
    font-size : 14px;
    color : #777;
}

.nickname {
    font-weight : bold;
}

.detail {
    margin : 5px 0;
}

.actions {
  display: flex;
  gap: 5px;
  justify-content : flex-end;
}
</style>