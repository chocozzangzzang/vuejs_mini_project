<template>
    <!-- 모달창 : 기존에 등록해두고 호출하는 형태 -->
    <!-- v-if 조건식 -->
    <div class="black-bg">
      <div class="white-bg">
        <h3>해당 방의 정보</h3>
        <h4>{{ title }}</h4>
        <p>{{ content }}</p>
        <button @click="modalClose">닫기</button>
      </div>
    </div>
</template>

<script>
export default {
    props : ['title', 'content'],
    methods : {
        modalClose() {this.$emit('modal-state');}
    }
}
</script>

<style>
div {
  box-sizing: border-box;
}

.black-bg {
  width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed; padding : 20px;
}

.white-bg {
  width: 100%; background: white;
  border-radius: 8px;
  padding: 20px;
}
</style>