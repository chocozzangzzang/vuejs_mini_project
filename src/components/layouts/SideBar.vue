<template>
  <div class="sidebar">
      <ul class="sidemenu">
        <li v-for="(li, idx) in liMenu" :key="idx" @click="sidebar(idx)">{{ li }}</li>
      </ul>
    </div>
</template>

<script>
export default {
    methods : {
        sidebar(idx) {
            if(idx == 0) this.$emit('sortStandard', {sortByN : true, sortByP : false, filterByP : false});
            else if(idx == 1) this.$emit('sortStandard', {sortByN : false, sortByP : true, filterByP : false});
            else if(idx == 2) this.$emit('sortStandard', {sortByN : false, sortByP : false, filterByP : true});
            else this.$emit('sortStandard', {sortByN : false, sortByP : false, filterByP : false});
        }
    },
    data() {
        return {
            liMenu : ['이름별 정렬', '가격별 정렬', '50만원 이상', '초기화'],
        }
    }
}
</script>

<style>
.sidebar {
  margin-top: 40px;
}

.sidebar .sidemenu {
  padding-inline-start: 20px;
  list-style-type: none;
}

.sidebar .sidemenu li {
  padding: 20px;
  border-radius: 5px;
  border: solid 1px grey;
}
</style>