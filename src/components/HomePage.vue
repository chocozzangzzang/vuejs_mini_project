<template>
  <h3>기상 예보</h3>
  <p v-if="allDatas">현재 날씨 : {{ this.allDatas.datasets[0].data[0] }} ℃</p>
  <line-chart v-if="allDatas"
  :temperData="allDatas"
  :chartOption="chartOptions"
  height="20" width="50">
  </line-chart>
</template>

<script>
import positions from '../data/positions.js';
import { onMounted, ref } from 'vue';
import LineChart from './chart/LineChart.vue';

export default {
  components : {
    LineChart,
  },

  data() {
    return {
      chartOptions : {responsive : true,},
    }
  },

  setup() {
    // console.log(positions);

    const time = Date.now();
    const today = new Date(time);
    const yester = new Date(time);
    const allDatas = ref(null);
    const labels = ref([]);
    const values = ref([]);

    const xpos = ref(positions[0].xpos);
    const ypos = ref(positions[0].ypos);
    var yesterday = false;

    var BaseTime = "";
    if(today.getHours() < 10) BaseTime += "0" + today.getHours();
    else BaseTime += today.getHours();
    if(today.getMinutes() < 10) BaseTime += "0" + today.getMinutes();
    else BaseTime += today.getMinutes();

    if(BaseTime.localeCompare("0215") == -1) {yesterday = true; BaseTime = "2300";}
    else if(BaseTime.localeCompare("0515") == -1) BaseTime = "0200";
    else if(BaseTime.localeCompare("0815") == -1) BaseTime = "0500";
    else if(BaseTime.localeCompare("1115") == -1) BaseTime = "0800";
    else if(BaseTime.localeCompare("1415") == -1) BaseTime = "1100";
    else if(BaseTime.localeCompare("1715") == -1) BaseTime = "1400";
    else if(BaseTime.localeCompare("2015") == -1) BaseTime = "1700";
    else if(BaseTime.localeCompare("2315") == -1) BaseTime = "2000";
    else BaseTime = "2300";

    var BaseDate = "";
    if(yesterday) {
      yester.setDate(yester.getDate() - 1);
      BaseDate += yester.getFullYear().toString();
      if((yester.getMonth() + 1) < 10) BaseDate += "0" + (yester.getMonth() + 1).toString();
      else BaseDate += (yester.getMonth() + 1).toString();
      if((yester.getDate()) < 10) BaseDate += "0" + yester.getDate();
      else BaseDate += yester.getDate();
    } else {
      BaseDate += today.getFullYear().toString();
      if((today.getMonth() + 1) < 10) BaseDate += "0" + (today.getMonth() + 1).toString();
      else BaseDate += (today.getMonth() + 1).toString();
      if((today.getDate()) < 10) BaseDate += "0" + today.getDate();
      else BaseDate += today.getDate();
    }

    //console.log(`${BaseDate} ${BaseTime}`);

    onMounted(async () => {
      try {

        var xhr = new XMLHttpRequest();
        var url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst'; /*URL*/
        var queryParams = '?' + encodeURIComponent('serviceKey') + '='+ process.env.VUE_APP_FORECAST_KEY; /*Service Key*/
        queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
        queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1000'); /**/
        queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /**/
        queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent(BaseDate); /**/
        queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent(BaseTime); /**/
        queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent(xpos.value); /**/
        queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent(ypos.value); /**/
        
        //const data = await response.json();
        await xhr.open('GET', url + queryParams);
        xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
              const tempVals = JSON.parse(this.response).response.body.items.item.filter(item => item.category === "TMP");
              // console.log(`output->`, data);
              tempVals.forEach(f => {
                values.value.push(f.fcstValue);
                labels.value.push(f.fcstDate + " " + f.fcstTime);
              });
              allDatas.value = {
                labels : labels.value,
                datasets : [{
                  label : 'Temperature',
                  backgroundColor : '#f87979',
                  data : values.value,
                  borderColor : 'red',
                }],
              }
              // console.log(alldata.value.datasets.data);
              //console.log(`output->`,forecast.value);
            }
        };

        xhr.send('');
        }
       catch(err) {console.log(err);}
    })

    return {
      allDatas,
      // getForeCast,
      // forecast,
    }
  },
}
</script>

<style>

</style>