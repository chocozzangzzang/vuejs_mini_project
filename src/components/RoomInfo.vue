<template>
  <div class="room-container">
    <div class="room" v-for="(oneroom, idx) in nowOneRoom" :key="idx">
        <img :src="oneroom.image" class="room-img">
        <h4 @click="sendInfo(idx)">{{ oneroom.title }}</h4>
        <p>{{ oneroom.price }} 원</p>
    </div>
  </div>
</template>

<script>
import roomdata from "../data/rooms.js";

export default {
    props : ['orderByTitle', 'orderByPrice', 'filterByPrice'],
    data() {
        return {
            onerooms : roomdata,
        }
    },
    methods : {
        sendInfo(idx) {
            this.$emit("oneroomInfo", 
            {title : this.nowOneRoom[idx].title,
             content : this.nowOneRoom[idx].content});
        }
    },
    computed : {
        nowOneRoom() {
            if(this.orderByTitle) {
                return [...this.onerooms].sort((a, b) => {
                    return a.title.localeCompare(b.title, 'ko-KR');
                })
            } else if(this.orderByPrice != 0) {
                return [...this.onerooms].sort((a, b) => {
                    return this.orderByPrice == 1? a.price - b.price : b.price - a.price;
                })
            } else if(this.filterByPrice) {
                return this.onerooms.filter(oneroom => {
                    return (oneroom.price >= 500000)
                }).sort((a, b) => a.price - b.price);
            } else {
                return this.onerooms;
            }
        }
    }
}
</script>

<style>
.room-container {
  display: grid;
  grid-template-columns: 1fr 1fr; /* 두 개의 동일한 너비 컬럼 */
  gap: 20px; /* 컬럼 간 간격 */
}

.room {
  flex: 1;
  padding: 20px;
  text-align: center;
}

.room-img {
  width: 100%;
  margin-top: 40px;
}
</style>