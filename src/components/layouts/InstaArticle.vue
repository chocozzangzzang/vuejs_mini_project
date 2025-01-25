<template>
  <div class="post">
    <div class="post-header">
        <img src="../../assets/logo.png" alt="profile" class="profile-img"/>
        <span class="username">{{ postInfo.nickname }}</span>
    </div>
    <div class="post-image">
        <img :src="postInfo.imageUrl" alt="post image" />
    </div>
    <div class="post-details">
        <p class="likes">{{ postInfo.likes }} likes</p>
        <p class="post-content"><strong>{{ postInfo.userid }}</strong> {{ postInfo.content }}</p>
        <p class="post-date">{{ postInfo.date }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props : ['postInfo'],
}
</script>

<style>

.post {
    width : 100%;
    margin: 20px auto;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    background-color: #fff;
    font-family: Arial, sans-serif;
}

.post-header {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 15px;
    border-bottom: 1px solid #eee;
}

.profile-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
}

.username {
    font-size: 16px;
    font-weight: bold;
}

/* 이미지 섹션 */
.post-image img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

/* 하단의 게시글 정보 스타일 */
.post-details {
  padding: 15px;
  text-align: left;
}

.likes {
  font-weight: bold;
  font-size: 12px;
  margin-bottom: 8px;
}

.post-content {
  font-size: 14px;
  margin-bottom: 8px;
}

.post-content strong {
  font-weight: bold;
}

.post-date {
  font-size: 12px;
  color: #777;
}
</style>