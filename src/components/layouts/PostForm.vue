<template>
    <div class="container">
      <h1 class="title">게시글 작성</h1>
  
      <form @submit.prevent="postSubmit"> 
        <!-- 제목 입력 -->
        <label for="title">제목</label>
        <input v-model="post.title" type="text" id="title" class="input" required />
  
        <!-- 내용 입력 -->
        <label for="content">내용</label>
        <textarea v-model="post.content" id="content" class="textarea" required></textarea>
  
        <!-- 이미지 업로드 -->
        <label for="image">이미지 업로드</label>
        <input @change="handleImgInput" type="file" id="image" class="file-input"/>
  
        <!-- 이미지 미리보기 -->
        <div v-if="imgUrl" class="preview">
          <img :src="imgUrl" alt="미리보기" class="preview-img" />
        </div>
  
        <!-- 등록 버튼 -->
        <button type="submit" class="submit-btn">등록</button>
      </form>
    </div>
  </template>
  
<script>
import { computed, ref } from 'vue';
import { db, firebaseStorage } from '@/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getDownloadURL} from 'firebase/storage';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';

export default {

  setup() {
    const post = ref({
      title : '',
      content : '',
      postImage : null,
    })

    const imagePreview = ref(null);
    const router = useRouter();

    const postSubmit = async () => {
      if(!post.value.title ||  !post.value.content) {
        alert("입력되지 않은 칸이 있습니다");
      } else {
        
        const today = new Date();
        const formattedDate = today.toLocaleString();
        const authStore = useAuthStore();
        const nowUser = authStore.getNickname();

        if(post.value.postImage) {
          const UUID = self.crypto.randomUUID();
          const file_upload = await(uploadBytes(storageRef(firebaseStorage, `images/${UUID}`), post.value.postImage));
          const file_url = await getDownloadURL(file_upload.ref);
          await addDoc(collection(db, "posts"), {
            title : post.value.title,
            content : post.value.content,
            writer : nowUser,
            imgUrl : file_url,
            imgUUID : UUID,
            registDate : formattedDate,
            modifyDate : formattedDate,
            fileName : post.value.postImage.name,
          });
        } else {
          await addDoc(collection(db, "posts"), {
            title : post.value.title,
            content : post.value.content,
            writer : nowUser,
            imgUrl : '',
            imgUUID : '',
            registDate : formattedDate,
            modifyDate : formattedDate,
            fileName : '',
          });
        }
        
        router.push('/post');
      }
    }

    const imgUrl = computed(() => {
      return imagePreview.value;
    })

    const handleImgInput = (event) => {
      const nowFile = event.target.files[0];
      if(nowFile) {
        // console.log(nowFile);
        post.value.postImage = nowFile;
        imagePreview.value = URL.createObjectURL(nowFile);
        // console.log(imagePreview.value);
      }
    }

    return {
      post,
      postSubmit,
      handleImgInput,
      imgUrl,
    }
  }

}
</script>
  
<style>
/* 기본 컨테이너 스타일 */
.container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}

/* 제목 */
.title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

/* 입력 필드 스타일 */
.input,
.textarea,
.file-input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

/* 텍스트 영역 스타일 */
.textarea {
  height: 150px;
  resize: vertical;
}

/* 이미지 미리보기 스타일 */
.preview {
  margin-top: 10px;
  text-align: center;
}

.preview-img {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
  border: 1px solid #ddd;
  padding: 5px;
  background-color: #fff;
}

/* 버튼 스타일 */
.submit-btn {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: background 0.3s;
}

.submit-btn:hover {
  background-color: #0056b3;
}
</style>