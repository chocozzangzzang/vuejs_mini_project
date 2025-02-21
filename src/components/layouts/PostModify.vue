<template>
    <div class="container">
      <h1 class="title">게시글 수정</h1>
      <form @submit.prevent="postModi"> 
        <!-- 제목 입력 -->
        <label for="title">제목</label>
        <input v-model="post.title" type="text" id="title" class="input" required/>
  
        <!-- 내용 입력 -->
        <label for="content">내용</label>
        <textarea v-model="post.content" id="content" class="textarea" required></textarea>
  
        <!-- 이미지 업로드 -->
        <label for="image">이미지 수정</label>
        <input @change="handleImgInput" type="file" id="image" class="file-input"/>
  
        <!-- 이미지 미리보기 -->
        <div v-if="imgUrl">
            <img :src="imgUrl" alt="미리보기" class="preview-img" />
        </div>
        <div v-else>
            <div v-if="post.postImage" class="preview">
                <label for="nowImage">기존 이미지</label>
                <img :src="post.postImage" alt="미리보기" class="preview-img"/>
            </div>
            <div>
                <p>이미지가 없는 게시글입니다.</p>
            </div>
        </div>
        
  
        <!-- 등록 버튼 -->
        <button type="submit" class="submit-btn">수정</button>
      </form>
    </div>
  </template>
  
<script>
import { computed, onMounted, ref } from 'vue';
import { db, firebaseStorage } from '@/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { ref as storageRef, getStorage, uploadBytes, getDownloadURL, deleteObject} from 'firebase/storage';
import { useRouter } from 'vue-router';
import { postStore } from '@/store/post';

export default {

  setup() {
    const getPost = computed(() => {
        return postStore().getPost;
    })

    const nowPost = ref(null);

    const post = ref({
      title : '',
      content : '',
      postImage : null,
    })

    const imagePreview = ref(null);
    const imgUrl = computed(() => {
      return imagePreview.value;
    })

    const router = useRouter();

    const formatDate = (date) => {
            return new Intl.DateTimeFormat('ko-KR', {
                year : 'numeric',
                month : '2-digit',
                day : '2-digit',
                hour : '2-digit',
                minute : '2-digit',
            }).format(date);
        }

    onMounted(() => {
        nowPost.value = getPost.value;
        post.value.title = nowPost.value.title;
        post.value.content = nowPost.value.content;
        post.value.postImage = nowPost.value.imgUrl;
    })

    const handleImgInput = (event) => {
      const nowFile = event.target.files[0];
      if(nowFile) {
        post.value.postImage = nowFile;
        imagePreview.value = URL.createObjectURL(nowFile);
      }
    }

    const postModi = async () => {
      if(!post.value.title ||  !post.value.content) {
        alert("입력되지 않은 칸이 있습니다");
      } else {
        const formattedDate = formatDate(new Date());

        const docRef = doc(db, "posts", nowPost.value.docid);
        if(imgUrl.value) {
          if(nowPost.value.imgUrl) {
            const storage = getStorage();
            const imgRef = storageRef(storage, `/images/${nowPost.value.imgUUID}`);
            await deleteObject(imgRef);
          }

          const UUID = self.crypto.randomUUID();
          const file_upload = await(uploadBytes(storageRef(firebaseStorage, `images/${UUID}`), post.value.postImage));
          const file_url = await getDownloadURL(file_upload.ref);
          await updateDoc(docRef, {
            title : post.value.title,
            content : post.value.content,
            imgUrl : file_url,
            imgUUID : UUID,
            modifyDate : formattedDate,
            fileName : post.value.postImage.name,
          });
        } else {
          await updateDoc(docRef, {
            title : post.value.title,
            content : post.value.content,
            modifyDate : formattedDate,
          });
        }
        
        router.push('/post');
      }
    }

    return {
      post,
      postModi,
      getPost,
      handleImgInput,
      imgUrl,
      formatDate,
    }
  }

}
</script>
  
<style scoped>
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
  background-color: #6C757D;
  color: #FFFFFF;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: background 0.3s;
}

.submit-btn:hover {
  background-color: #007BFF;
}
</style>