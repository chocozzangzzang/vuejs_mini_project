<template>
    <button @click="postWrite">게시글 등록</button>
</template>


<script>
import { useRouter } from 'vue-router';

    export default {
        setup() {
            const router = useRouter();

            const postWrite = () => {
                alert("write!!!!!");
                router.push('/postWrite');
            }

            return {
                postWrite,
            };
        },
    }
</script>
  
<style>
</style>