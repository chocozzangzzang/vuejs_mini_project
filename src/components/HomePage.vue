<template>
  <div class="homepage">
    <div class="item">
      <h3>기상 예보</h3>
    </div>
    <div class="item">
      <p v-if="allDatas">현재 날씨 : {{ this.allDatas.datasets[0].data[0] }} ℃</p>
    </div>
    <div class="item">
      <p v-if="getCurrAddr">{{ getCurrAddr }}의 날씨</p>
      <button @click="getCurrentPosition">현재위치</button>
    </div>
    <v-container>
      <div class="selects-inline">
        <v-select
            v-model="selectedCity"
            :items="getCities"
            item-value="name"
            item-title="name"
            label="시/도"
            class="selectBox"
            dense
          >
          </v-select>
          <v-select
            v-model="selectedDistrict"
            :items="getDistricts"
            label="군/구"
            item-value="name"
            item-title="name"
            class="selectBox"
            dense
          >
          </v-select>
          <v-select
            v-model="selectedTown"
            :items="getTowns"
            item-value="name"
            item-title="name"
            label="읍/면/동"
            class="selectBox"
            dense
          >
          </v-select>
      </div>
    </v-container>
    <line-chart v-if="allDatas"
    :temperData="allDatas"
    :chartOption="chartOptions"
    height="20" width="50">
    </line-chart>
  </div>
</template>

<script>
import positions from '../data/positions.js';
import { computed, onMounted, ref } from 'vue';
import LineChart from './chart/LineChart.vue';
import axios from 'axios';
import { VSelect } from 'vuetify/lib/components/index.mjs';
import { watch } from 'vue';

export default {
  components : {
    LineChart,
    VSelect,
  },

  data() {
    return {
      chartOptions : {responsive : true,},
    }
  },

  setup() {
    // console.log(positions);
    const addr = ref('');
    const depth1 = ref('');
    const depth2 = ref('');
    const depth3 = ref('');

    const getCurrAddr = computed(() => {
      return addr.value;
    });

    const getCities = computed(() => {
      return filteredCities.value;
    });

    const getDistricts = computed(() => {
      return selectedCity.value?
        filteredDistricts.value.filter(filteredDistrict => filteredDistrict.city === selectedCity.value)
        : filteredDistricts.value;
    });

    const getTowns = computed(() => {
      return selectedDistrict.value?
      filteredTowns.value.filter(filteredTown => filteredTown.district === selectedDistrict.value)
      : filteredTowns.value;
    });

    const loadKakaoMap = () => {
      const script = document.createElement("script");
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.VUE_APP_KAKAO_MAP_KEY}&autoload=false`;
      document.head.appendChild(script);
    };
    
    const getCurrentPosition = () => {
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // console.log(position);
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            // const locPosition = new kakao.maps.Lating(lat, lon);
            // console.log(`${lat} ${lon}`);
            getAddr(lat, lon);
          }
        )
      }
    }

    const getWildCars = (str) => {
      return "*" + str.split("").join("*") + "*";
    }

    const matching = (pattern, str) => {
      // '*'을 '.*'로 변환하여 정규식 패턴 생성
      let regexPattern = pattern
        .replace(/[.+^${}()|[\]\\]/g, "\\$&") // 정규식 특수문자 이스케이프
        .replace(/\*/g, ".*"); // '*' → '.*' (아무 글자 여러 개)

      let regex = new RegExp(`^${regexPattern}$`, "i"); // 대소문자 구분 없음
      return regex.test(str);

    }

    const getAddr = async (lat, lon) => {
      try {
        var url = 'https://dapi.kakao.com/v2/local/geo/coord2address.json';
        var query = '?x=' + lon + '&y=' + lat;
        await axios.get(url + query, {
          headers : {
            Authorization : `KakaoAK ${process.env.VUE_APP_KAKAO_LOCAL_KEY_RESTAPI}`
          }
        }).then((result) => {
          // console.log(result.data.documents[0]);
          depth1.value = result.data.documents[0].address.region_1depth_name;
          depth2.value = result.data.documents[0].address.region_2depth_name;
          depth3.value = result.data.documents[0].address.region_3depth_name;
          var wildcard1 = getWildCars(depth1.value);
          var wildcard2 = getWildCars(depth2.value);
          var wildcard3 = getWildCars(depth3.value);
          // console.log(wildcard1);
          // console.log(wildcard2);
          // console.log(wildcard3);
          addr.value = depth1.value + " " + depth2.value + " " + depth3.value;
          var filtered = positions.filter(pos => (matching(wildcard1, pos.first) && matching(wildcard2, pos.second) && matching(wildcard3, pos.three)));
          // console.log(filtered);
          values.value = [];
          labels.value = [];
          getWeather(filtered[0].xpos, filtered[0].ypos);
        });
      } catch (err) {
        console.log(err);
      }
    }

    const time = Date.now();
    const today = new Date(time);
    const yester = new Date(time);
    const allDatas = ref(null);
    const labels = ref([]);
    const values = ref([]);

    const cities = ref([]);
    const filteredCities = ref([]);

    const districts = ref([]);
    const filteredDistricts = ref([]);

    const towns = ref([]);
    const filteredTowns = ref([]);

    const cards = ref([]);

    const selectedCity = ref(null);
    const selectedDistrict = ref(null);
    const selectedTown = ref(null);

    watch([selectedCity, selectedDistrict, selectedTown], ([newCity, newDistrict], [oldCity, oldDistrict]) => {
      if(selectedCity.value && selectedDistrict.value && selectedTown.value) {
        if(oldCity != newCity && oldCity) {
          selectedDistrict.value = '';
          selectedTown.value = '';
        } else if(oldDistrict != newDistrict && oldDistrict) {
          selectedTown.value = '';
        } 
        else {
          var wildcard1 = getWildCars(selectedCity.value);
          var wildcard2 = getWildCars(selectedDistrict.value);
          var wildcard3 = getWildCars(selectedTown.value);
          var filtered = positions.filter(pos => (matching(wildcard1, pos.first) && matching(wildcard2, pos.second) && matching(wildcard3, pos.three)));
          addr.value = selectedCity.value + " " + selectedDistrict.value + " " + selectedTown.value;
          values.value = [];
          labels.value = [];
          getWeather(filtered[0].xpos, filtered[0].ypos);
        }
       
      }
    });

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

    onMounted(() => {
      loadKakaoMap();
      addr.value = positions[0].first;
      getWeather(xpos.value, ypos.value);
      setVcards();
    });

    const setVcards = () => {
      var id = 0;
      positions.forEach(pos => {
        cities.value.push({name : pos.first});
        districts.value.push({city : pos.first, name : pos.second});
        towns.value.push({city : pos.first, district : pos.second, name : pos.three});
        cards.value.push({id : id, name : '카드' + id.toString(), city : pos.first, district : pos.second, town : pos.three});
        id++;
      });
      filteredCities.value = [...new Map(cities.value.map(city => [city.name, city])).values()];
      filteredDistricts.value = [...new Map(districts.value.map(district => [district.name, district])).values()];
      filteredTowns.value = [...new Map(towns.value.map(town => [town.name, town])).values()];
      // console.log(filteredDistricts.value);
    }

    const getWeather = async (x, y) => {
      try {
        var xhr = new XMLHttpRequest();
        var url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst'; /*URL*/
        var queryParams = '?' + encodeURIComponent('serviceKey') + '='+ process.env.VUE_APP_FORECAST_KEY; /*Service Key*/
        queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
        queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1000'); /**/
        queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /**/
        queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent(BaseDate); /**/
        queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent(BaseTime); /**/
        queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent(x); /**/
        queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent(y); /**/
        
        //const data = await response.json();
        await xhr.open('GET', url + queryParams);
        xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
              const tempVals = JSON.parse(this.response).response.body.items.item.filter(item => item.category === "TMP");
              // console.log(`output->`, tempVals);
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
                  tension : 0.4,
                }],
              }
              // console.log(alldata.value.datasets.data);
              //console.log(`output->`,forecast.value);
            }
        };

        xhr.send('');
        }
       catch(err) {console.log(err);}
    };

    return {
      allDatas,
      getCurrentPosition,
      getCurrAddr,
      getWeather,
      getAddr,
      selectedCity,
      selectedDistrict,
      selectedTown,
      getCities,
      getDistricts,
      getTowns,
      // getSelectedWeather,
      // getForeCast,
      // forecast,
    }
  },
}
</script>

<style scoped>
.homepage {
  max-width: 1000px;
  margin-top: 20px;
  padding : 20px;
  display : flex;
  flex-direction: column;
  margin: 0 auto;
  background-color: #f9f9f9;;
}

.item {
  flex : 1;
}

.selects-inline {
  display: flex;               /* Flexbox 사용 */
  justify-content: center;     /* 수평 가운데 정렬 */
  align-items: center;         /* 수직 가운데 정렬 */
  padding: 10px;
  gap: 15px;
}

.selectBox {
  max-width: 200px; 
  font-size: 12px; 
}
</style>