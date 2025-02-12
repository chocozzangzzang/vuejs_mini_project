<template>
    <div class="container">
        <i @click="backToPost" class="mdi mdi-arrow-left icon"></i>
        <h1 class="title">#{{ post.id }} {{ post.title }}</h1>
  
        <!-- 제목 입력
        <label for="title">제목</label>
        <input v-model='post.title' type="text" id="title" class="input" readonly /> -->
        
        <div class="postInfo">
            <span class="writer">작성자 : {{ post.writer }}</span>
            <span class="date">작성일자 : {{ post.registDate }}</span>
        </div>

        <!-- 내용 입력 -->
        <label for="content">내용</label>
        <textarea id="content" class="textarea" v-model="post.content" readonly></textarea>
  
        <!-- 이미지 미리보기 -->
        <div v-if="post.imgUrl" class="preview">
          <img :src="post.imgUrl" alt="imgOfPost" class="preview-img" />
        </div>
    </div>
</template>

<script>
import { postStore } from '@/store/post';
import { useRouter } from 'vue-router';

export default {

    setup() {
        const router = useRouter();
        const poststore = postStore();
        const post = poststore.getPost;

        const backToPost = () => {
            poststore.clearPost();
            router.push('/post');
        }

        return {
            backToPost,
            post,
        }
    }
}
</script>

<style scoped>
.postHeader {
    align-items: center;
    gap : 10px;
}

.postInfo {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.writer,
.date {
  font-size: 14px;
  color: #555;
}

.icon {
    float : left;
}
</style>