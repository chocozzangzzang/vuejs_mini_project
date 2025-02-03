<template>
  <h3>3일 기상 예보</h3>
  <div v-for="(data, idx) in forecast" :key=idx>
    <p>날짜 : {{ data.date }}</p>
    <p>시간 : {{ data.time }}</p>
    <p>기온 : {{ data.temp }}</p>
  </div>
</template>

<script>
import { ref } from 'vue';


export default {

  setup() {

    const time = Date.now();
    const today = new Date(time);
    const yester = new Date(time);
    const forecast = ref([]);
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

    console.log(`${BaseDate} ${BaseTime}`);
  
    const getForeCast = async () => {
      try {

        var xhr = new XMLHttpRequest();
        var url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst'; /*URL*/
        var queryParams = '?' + encodeURIComponent('serviceKey') + '='+ process.env.VUE_APP_FORECAST_KEY; /*Service Key*/
        queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
        queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1000'); /**/
        queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /**/
        queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent(BaseDate); /**/
        queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent(BaseTime); /**/
        queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent('55'); /**/
        queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent('127'); /**/
        
        //const data = await response.json();
        await xhr.open('GET', url + queryParams);
        xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
              const data = JSON.parse(this.response).response.body.items.item.filter(item => item.category === "TMP");
              console.log(`output->`, data);
              data.forEach(f => {
                forecast.value.push({
                  date : f.fcstDate,
                  time : f.fcstTime,
                  temp : f.fcstValue,
                })
              });
              console.log(`output->`,forecast.value);
            }
        };

        xhr.send('');

      //   var url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst'; /*URL*/
      //   url += "?serviceKey=" + process.env.VUE_APP_FORECAST_KEY + "&pageNo=1&numOfRows=1000&dataType=JSON";
      //   url += "&base_date" + BaseDate + "&base_time" + BaseTime + "&nx=55&ny=127"; 

      //   const response = await fetch(url)
      //     .then(resp => {
      //       const reader = resp.body.getReader();
      //       let chunks = [];
      //       let decoder = new TextDecoder();

      //       return reader.read().then(function processText({done, value}) {
      //         if(done) {
      //           const result = decoder.decode(new Uint8Array(chunks));
      //           console.log(`output->`, result);
      //           return;
      //         }
      //         chunks.push(...value);
      //         return reader.read().then(processText);
      //       })
      //     });

      //   console.log(`output->`,response.getReader());
        
      //   if(!response.ok) {
      //     throw new Error(`http 오류 코드 : ${response.status}`);
      //   }
      //   const data = await response.json();
      //   console.log(`output->`, data);

        
      // }
        }
       catch(err) {console.log(err);}
    }

    getForeCast();

    return {
      getForeCast,
      forecast,
    }
  }
}
</script>

<style>

</style>