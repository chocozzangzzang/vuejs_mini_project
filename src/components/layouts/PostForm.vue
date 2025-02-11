<template>
    <div class="container">
      <h1 class="title">게시글 작성</h1>
  
      <form>
        <!-- 제목 입력 -->
        <label for="title">제목</label>
        <input type="text" id="title" class="input" required />
  
        <!-- 내용 입력 -->
        <label for="content">내용</label>
        <textarea id="content" class="textarea" required></textarea>
  
        <!-- 이미지 업로드 -->
        <label for="image">이미지 업로드</label>
        <input type="file" id="image" class="file-input" />
  
        <!-- 이미지 미리보기 -->
        <div class="preview">
          <img alt="미리보기" class="preview-img" />
        </div>
  
        <!-- 등록 버튼 -->
        <button type="submit" class="submit-btn">등록</button>
      </form>
    </div>
  </template>
  
<script>
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