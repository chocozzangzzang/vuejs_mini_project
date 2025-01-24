<template>
    <modal-layout v-if="modalIsOpen" :title="modalTitle" :content="modalContent" @modal-state="modalClose"/>
    <div class="totalDiv">
        <SideBar @sortStandard="sorting"/>
        <div class="room-container">
            <div class="room" v-for="(oneroom, idx) in nowOneRoom" :key="idx">
                <img :src="oneroom.image" class="room-img">
                <h4 @click="sendInfo(idx)">{{ oneroom.title }}</h4>
                <p>{{ oneroom.price }} 원</p>
            </div>
        </div>
  </div>
</template>

<script>
import roomdata from "../data/rooms.js";
import ModalLayout from "./layouts/ModalLayout.vue";
import SideBar from "./layouts/SideBar.vue";

export default {
    data() {
        return {
            onerooms : roomdata,
            modalIsOpen : false,
            modalTitle : "",
            modalContent : "",
            orderByTitle : false,
            orderByPrice : 0,
            filterByPrice : false,
        }
    },
    methods : {
        modalClose() {
            this.modalIsOpen = false;
            this.modalTitle = "";
            this.modalContent = "";
        },
        sendInfo(idx) {
            this.modalIsOpen = true;
            this.modalTitle = this.nowOneRoom[idx].title;
            this.modalContent = this.nowOneRoom[idx].content;
        },
        sorting(state) {
            if(state.sortByN) {
                this.orderByTitle = !this.orderByTitle; 
                this.orderbyPrice = 0;
                this.filterByPrice = false;}
            else if(state.sortByP) {
                this.orderByTitle = false; 
                this.orderByPrice = (this.orderByPrice + 1) % 3;
                this.filterByPrice = false;}
            else if(state.filterByP) {
                this.orderbyName = false; 
                this.orderbyPrice = 0; 
                this.filterByPrice = !this.filterByPrice;}
            else {
                this.orderbyName = false; 
                this.orderbyPrice = 0; 
                this.filterByPrice = false;}
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
    },
    components : {
        SideBar,
        ModalLayout,
    }
}
</script>

<style>
.totalDiv {
  display: grid;
  grid-template-columns: 1fr 6fr;
  gap: 10px;
}

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