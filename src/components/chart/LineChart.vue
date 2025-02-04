<template>
 <Line v-if="temperData" :data="temperData" :options="chartOption"/>  
</template>

<script>
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';
import { Line } from 'vue-chartjs';
ChartJS.register(Title, Tooltip, Legend, ArcElement, LineElement, PointElement, CategoryScale, LinearScale);

export default {
    components : {
        Line,
    },
    props : ['temperData', 'chartOption'],
}
</script>

<style>

</style>