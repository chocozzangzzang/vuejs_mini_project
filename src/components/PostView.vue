<template>
    <button class="postButton" @click="postWrite"><i class="mdi mdi-pencil"></i>등록</button>
    <div class="container">
        <h1 class="title">게시글 목록</h1>
        <ul class="postList">
            <post-list-item :posts="getPosts" @deleteIdx="deletePost"/>
        </ul>
    </div>
</template>


<script>
import { useRouter } from 'vue-router';
import PostListItem from './layouts/PostListItem.vue';
import { computed, ref } from 'vue';
import { db } from '../firebase.js';
import { doc, getDoc, getDocs, collection, query, orderBy, deleteDoc, updateDoc,} from 'firebase/firestore';
import { onMounted } from 'vue';
import { postStore } from '@/store/post';
import { ref as storageRef, deleteObject, getStorage } from 'firebase/storage';

export default {
    components : {
        PostListItem
    },

    data() {
        return {
            // posts: [
            //     { id: 1, title: "Vue.js 게시글 예제", description: "Vue.js와 CSS를 사용한 게시글 목록 예제입니다.", author: "홍길동", date: "2025-02-12" },
            //     { id: 2, title: "프론트엔드 개발", description: "프론트엔드 개발에 필요한 기술과 트렌드를 알아봅니다.", author: "김철수", date: "2025-02-11" },
            //     { id: 3, title: "CSS 디자인 팁", description: "더 나은 UI/UX를 위한 CSS 디자인 팁을 공유합니다.", author: "이영희", date: "2025-02-10" }
            // ]
        }
    },

    setup() {

        const router = useRouter();
        const postStr = postStore();
        const postWrite = () => {
            router.push('/postWrite');
        }

        const posts = ref([]);
        const getPosts = computed(() => {
            return posts.value;
        })

        const deletePost = async(idx) => {

        if(posts.value[idx].imgUrl) {
            const storage = getStorage();
            const imgRef = storageRef(storage, `/images/${posts.value[idx].imgUUID}`);
            await deleteObject(imgRef);
          }
            const updatedPosts = ref([]);
            // var postidx = 1;
            // posts.value.forEach(post => {
            //     if((post.value.length - idx) != post.postid) {
            //         post.postid = postidx
            //         postidx += 1;
            //         updatedPosts.value.push(post);
            //     }
            // });
            // console.log(updatedPosts.value);
            const docRef = query(collection(db, "posts"), orderBy('registDate', 'desc'));
            const postSnaps = await getDocs(docRef);
            // var updatePostidx = 1;
            var totalLength = postSnaps.docs.length;
            var updateLength = totalLength - 1;
            console.log(totalLength, idx);
            for (const docu of postSnaps.docs) {
                if((docu.data().postid) == (totalLength - idx)) {
                    await deleteDoc(doc(db, 'posts', docu.id));
                } else {
                    await updateDoc(doc(db, 'posts', docu.id), {
                        postid : updateLength,
                    });
                    const nowDoc = await getDoc(doc(db, "posts", docu.id));
                    updatedPosts.value.push(nowDoc.data());
                    updateLength -= 1;
                }
            }
            posts.value = updatedPosts.value;
        }

        onMounted(async () => {
            try{
                postStr.clearPost();
                const docRef = query(collection(db, "posts"), orderBy('registDate', 'desc'));
                // console.log(docRef);
                const postSnaps = await getDocs(docRef);
                if(postSnaps.docs.length >= 1) {
                    // console.log(postSnaps.docs);
                    posts.value = postSnaps.docs.map(doc => ({
                        docid : doc.id,
                        postid : doc.postid,
                        ...doc.data() 
                    }));
                }
                // console.log(posts.value);
            } catch(error) {
                console.log(error);
            }            
        })

        // const getData = computed(() => {
        //     return getPostFromFirebase;
        // })

        // const getPostFromFirebase = async() => {
        //     try{
        //         const docRef = query(collection(db, "posts"), orderBy('registDate', 'desc'));
        //         // console.log(docRef);
        //         const postSnaps = await getDocs(docRef);
        //         // console.log(postSnaps.docs);
        //         if(postSnaps.docs.length >= 1) {
        //             console.log(postSnaps.docs);
        //             const posts = ref(null);
        //             posts.value = postSnaps.docs.map(doc => ({
        //                 docid : doc.id,
        //                 postid : doc.postid,
        //                 ...doc.data() 
        //             }));
        //             return posts.value;
        //         }
        //         // console.log(posts.value);
        //     } catch(error) {
        //         console.log(error);
        //     }  
        // }

        return {
            postWrite,
            getPosts,
            deletePost,
            // getData,
            // getPostFromFirebase,
        };
    },
}
</script>
  
<style scoped>
/* 버튼 */
/* 버튼 기본 스타일 */
.postButton {
  white-space: nowrap;
  margin-bottom : 10px;
  width : 100px;
  background-color: #4CAF50; /* 초록색 배경 */
  color: white; /* 흰색 글자 */
  padding: 12px 24px; /* 패딩 추가 */
  font-size: 16px; /* 글자 크기 */
  font-weight: bold; /* 글자 굵게 */
  border: none; /* 기본 테두리 없애기 */
  border-radius: 8px; /* 둥근 모서리 */
  cursor: pointer; /* 마우스 커서 모양 */
  transition: background-color 0.3s ease, transform 0.3s ease; /* 색상 변화와 클릭 효과 */
}

.postButton:hover {
  background-color: #45a049; /* hover 시 배경 색상 변화 */
}

.postButton:active {
  transform: scale(0.98); /* 클릭 시 살짝 눌리는 효과 */
}

.postButton:focus {
  outline: none; /* 포커스 시 테두리 없애기 */
  box-shadow: 0 0 5px rgba(72, 203, 118, 0.7); /* 포커스 효과 */
}

/* 전체 레이아웃 */
.container {
    max-width : 800px;
    margin : 0 auto;
    padding : 20px;
}

/* 제목 스타일 */
.title {
    font-size : 24px;
    font-weight : bold;
    text-align : center;
    margin-bottom : 20px;
}

/* 게시글 목록 스타일 */
.postList {
    list-style : none;
    padding : 0;
}
</style>