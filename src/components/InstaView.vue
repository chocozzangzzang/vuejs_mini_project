<template>
  <div class="center-align">
    <insta-header/>
    <insta-article/>
  </div>
</template>

<script>
import InstaHeader from './layouts/InstaHeader.vue'
import InstaArticle from './layouts/InstaArticle.vue';
export default {
  components : {
    InstaHeader,
    InstaArticle,
  }
}
</script>

<style>
.body {
  margin: 0;
}

.center-align {
  width : 50%;
  margin: 0 auto;
  text-align: center;     /* 내부 텍스트 중앙 정렬 (옵션) */
  padding: 20px;
  border: 1px solid lightgray;
}
</style>