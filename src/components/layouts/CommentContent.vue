<template>
  <div v-for="(com, idx) in comm" :key="idx" class="comment">
    <div v-if="modifyIndex !== idx">
        <div class="info">
            <span class="nickname">{{ com.nickname }}</span>
            <span class="date">{{ com.date }} <span v-if="com.modified"> (수정됨)</span> </span>
        </div>
        <p class="detail">{{ com.text }}</p>
        <div class="actions">
            <button v-if="isWriter(com.nickname)" @click="modifyComm(idx)">✏️수정</button>
            <button v-if="isWriter(com.nickname)" @click="deleteComm(idx)">🗑️삭제</button>
        </div>
    </div>
    <div class="newComment" v-else>
        <textarea v-model="modifyComment" placeholder="수정할 댓글을 입력하세요..."></textarea>
        <button @click="modify">수정</button>
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
            modifyIndex : -1,
            modifyComment : '',
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
        },

        deleteComm(idx) {
            // console.log(`Child : ${idx}`);
            this.$emit('deleteIdx', idx);
        },
        
        modifyComm(idx) {
            if(this.modifyIndex == -1) {this.modifyIndex = idx;}
            else alert("수정 중인 댓글이 있습니다!!!!");
        },
        
        modify() {
            if(!this.modifyComment) {
                if(confirm("입력 칸이 비어있습니다. 수정하지 않으시겠습니까?")) {
                    this.modifyIndex = -1;
                    this.modifyComment = '';
                }
            }
            else {
                const modiComm = {idx : this.modifyIndex, com : this.modifyComment};
                this.modifyIndex = -1;
                this.modifyComment = '';
                this.$emit("modify", modiComm);
            }
        }
    },
}
</script>

<style scoped>
.comment {
    max-width: 600px;
    align-items : flex-start;
    border-bottom : 1px solid #ddd;
    margin: 20px auto;
}

.info {
    display: flex;
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
  padding-bottom: 5px;
}

.newComment {
  display : flex;
  margin : 20px auto;
}

.newComment textarea {
  flex: 1;
  height: 60px;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.newComment button {
  margin-left: 5px;
  padding: 5px 10px;
  background: 	#D3D3D3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>