<template>
    <div class="container">
        <i @click="backToPost" class="mdi mdi-arrow-left icon"></i>
        <h1 class="title">#{{ post.postid }} {{ post.title }}</h1>
  
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
        
        <div>
            <button @click="toggleLike" class="likeBtn">
                <i :class="isLiked ? 'mdi mdi-heart' : 'mdi mdi-heart-outline'"
                    :style="{color : isLiked ? 'red' : 'gray'}"></i> {{ post.likes.length }}
                <!-- {{ isLiked ? "❤️ 좋아요 취소" : "🤍 좋아요" }} ({{ post.likes.length }}) -->
            </button>
        </div>
        
    </div>

    <div class="commentDiv">
        <h3>댓글 {{ post.comments.length }}</h3>
        <comment-content :comm="post.comments" @deleteIdx="deleteComment" @modify="modifyComm"/>
        
        <div class="newcomment">
            <textarea v-model="newComment" placeholder="댓글을 입력하세요..."></textarea>
            <button @click="commentSubmit">등록</button>
        </div>
    </div>

    
</template>

<script>
import { postStore } from '@/store/post';
import { useRouter } from 'vue-router';
import { db } from '@/firebase';
import CommentContent from './CommentContent.vue';
import { computed, ref } from 'vue';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useAuthStore } from '@/store/auth';

export default {

    components : {
        CommentContent,
    },  

    setup() {
        const router = useRouter();
        const poststore = postStore();
        const authStore = useAuthStore();
        const post = computed(() => {
            return poststore.getPost;
        })

        const newComment = ref('');
        const usePostStore = postStore();

        const backToPost = () => {
            router.push('/post');
        }

        const formatDate = (date) => {
            return new Intl.DateTimeFormat('ko-KR', {
                year : 'numeric',
                month : '2-digit',
                day : '2-digit',
                hour : '2-digit',
                minute : '2-digit',
            }).format(date);
        };

        const isLiked = computed(() => {
            const nowUser = authStore.getNick;
            if(post.value.likes.includes(nowUser)) return true;
            else return false;
        })

        const toggleLike = async() => {
            const nowUser = authStore.getNick;
            if(isLiked.value) {
                post.value.likes = post.value.likes.filter((like) => like != nowUser);
                await updateDoc(doc(db, "posts", post.value.docid), {
                    likes : arrayRemove(nowUser)
                });
                usePostStore.setPost(post.value);
            } else {
                post.value.likes.push(nowUser);
                await updateDoc(doc(db, "posts", post.value.docid), {
                    likes : arrayUnion(nowUser)
                });
                usePostStore.setPost(post.value);
            }
        }

        const commentSubmit = async() => {
            if(!newComment.value) alert('댓글이 입력되지 않았습니다');
            else {
                const today = formatDate(new Date());
                const comId = post.value.comments.length + 1;
                const nickname = authStore.getNick;
                const newCom = {
                    id : comId,
                    date : today,
                    likes : 0,
                    nickname : nickname,
                    text : newComment.value,
                }
                const docRef = doc(db, "posts", post.value.docid);
                await updateDoc(docRef, {
                    comments : arrayUnion(newCom),
                }).then(() => {
                    newComment.value = '';
                    post.value.comments = [...post.value.comments, newCom];
                    poststore.setPost(post.value);
                    /*                    
                    try {
                        const docRef = doc(db, 'posts', post.value.docid);
                        getDoc(docRef).then((doc) => {
                            poststore.clearPost();
                            poststore.setPost(doc.data());
                        });
                    } catch(error) {
                        console.log(error);
                    }
                    */
                });
            }
        }

        const deleteComment = async(idx) => {
            // console.log(`In Parent : ${idx}`);
            var commentid = 1;
            const updatedComments = ref([]);
            // console.log(post.value.comments);
            post.value.comments.forEach(comment => {
                // console.log(`${comment.id} -- ${idx}`);
                if((comment.id - 1) != idx) {
                    const newCom = {
                        id : commentid,
                        date : comment.date,
                        likes : comment.likes,
                        nickname : comment.nickname,
                        text : comment.text,
                        modified : false,
                    }
                    updatedComments.value.push(newCom);
                    commentid += 1;
                }
            });
            // console.log(updatedComments.value);
            
            const docRef = doc(db, "posts", post.value.docid);
            await updateDoc(docRef, {
                comments : updatedComments.value,
            }).then(() => {
                post.value.comments = updatedComments.value;
                poststore.setPost(post.value);
            })
        }

        const modifyComm = async(comm) => {
            console.log(comm);
            const updateComments = ref([]);
            updateComments.value = [...post.value.comments];
            updateComments.value[comm.idx].text = comm.com;
            updateComments.value[comm.idx].date = formatDate(new Date());
            updateComments.value[comm.idx].modified = true;

            const docRef = doc(db, "posts", post.value.docid);
            await updateDoc(docRef, {
                comments : updateComments.value,
            }).then(() => {
                post.value.comments = updateComments.value
                poststore.setPost(post.value);
            })

            poststore.setPost(post.value);
        }

        return {
            backToPost,
            commentSubmit,
            deleteComment,
            modifyComm,
            formatDate,
            post,
            newComment,
            isLiked,
            toggleLike,
        }
    }
}
</script>

<style scoped>
.likeBtn {
    width: 100%;
    text-align: left; /* 버튼을 왼쪽으로 정렬 */
}

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

.commentDiv {
    max-width: 600px;
    margin : 20px auto;
    background-color : #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding : 20px;
}

.newcomment {
  display: flex;
  margin-top: 10px;
}

.newcomment textarea {
  flex: 1;
  height: 60px;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.newcomment button {
  margin-left: 5px;
  padding: 5px 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>