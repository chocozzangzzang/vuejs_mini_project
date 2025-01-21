# first Vue.js project for practing #

## START 2025/01/20 ##

## 데이터 바인딩

### {{ dataname }} 으로 값을 받아옴

#### 데이터바인딩 하는 이유
1. 하드코딩은 값 변경이 어려움
2. Vue의 실시간 자동 렌더링을 하기 위함 -> Web-App에 유용하게 활용됨

> cf. 실시간으로 변경할 필요 없는 데이터는 굳이?
>     데이터 바인딩을 할 필요가 없음 !!

>   > ++ HTML 속성도 바인딩 가능 ++
>   > ++ :속성 = "바인딩 변수명" ++

## 반복적인 요소의 축약 v-for
    
### v-for="변수명 in array" :key="변수명" 
### -> 변수명을 데이터 바인딩할 수 있음 ( :key = "이름" 넣을 것 ) 

> key는 반복문의 요소를 구분시키는 역할을 함
> 이때 in 안에 (a, i)까지 변수로 설정할 수 있음.
> a는 array의 값, i는 각 값의 인덱스