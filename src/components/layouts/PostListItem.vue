<template>
  <li v-for="(post, idx) in posts" :key="idx" class="postItem" @click="getDetail(post)">
    <a href="#" class="postDetail">
        <span class="postNumber">{{ post.postid }}</span>
        <span class="postIcon">
            <i :class="post.imgUrl? 'mdi mdi-image' : 'mdi mdi-image-off'"></i>
        </span>
        <strong class="postTitle">{{ post.title }}</strong>
        <div class="postMeta">
            <span class="postWriter">{{ post.writer }}</span>
            <span class="postRegDate">{{ post.registDate }}</span>
        </div>
    </a>
  </li>
</template>

<script>
import { postStore } from '@/store/post';

export default {
    props : ['posts'],

    methods : {
        getDetail(post) {
            postStore().setPost(post);
            this.$router.push('/postDetails');
        }
    }
}
</script>

<style>
/* 게시글 아이템 */
.postItem {
    border : 1px solid #ddd;
    border-radius : 8px;
    margin-bottom : 15px;
    padding : 15px;
    transition : transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.postItem:hover {
    transform : tranlateY(-3px);
    box-shadow : 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* 상세 페이지 링크 */
.postDetail {
    text-decoration : none;
    color : inherit;
    display : block;
}

/* 타이틀 */
.postTitle {
    font-size : 18px;
    font-weight : bold;
    margin-bottom : 5px;
}

/* 게시글 메타 정보 */
.postMeta {
    text-align: right;
    font-size : 12px;
    color : #777;
    margin-top : 10px;    
}

.postNumber {
  font-weight: bold;
  color: #555;
  margin-right: 10px;
  width: 20px;
  text-align: right;
  float : left;
}

/* 작성자 스타일 */
.postWriter {
  font-weight: bold;
  color: #333;
  padding-right: 10px;
}

/* 날짜 스타일 */
.postDate {
  color: #999;
  font-size: 12px;
}

.postIcon {
  font-size: 20px;
  margin-right: 10px;
  color: #555;
}


/* 반응형 디자인 (작은 화면에서 한 줄로 정렬) */
@media (max-width: 500px) {
  .post-meta {
    flex-direction: column;
    align-items: flex-start;
  }

  .post-date {
    margin-top: 5px;
  }
}
</style>