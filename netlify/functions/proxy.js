const fetch = require('node-fetch'); // HTTP 요청을 처리하기 위해 node-fetch 모듈 가져오기

exports.handler = async (event) => {
  const url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst'; // 기상청 API의 기본 URL
  const params = event.queryStringParameters; // 클라이언트가 전달한 쿼리 파라미터 추출

  const query = new URLSearchParams(params); // 쿼리 파라미터를 URLSearchParams로 변환하여 URL에 추가
  const fullUrl = `${url}?${query}`; // 기상청 API의 최종 요청 URL 생성

  try {
    const response = await fetch(fullUrl); // 기상청 API에 HTTP GET 요청
    const data = await response.text(); // 응답 데이터를 텍스트로 변환

    return {
      statusCode: 200, // 성공 상태 코드
      body: data, // 클라이언트에게 반환할 데이터
    };
  } catch (error) {
    return {
      statusCode: 500, // 서버 에러 상태 코드
      body: JSON.stringify({ error: 'Failed to fetch data from the KMA API.' }), // 에러 메시지 반환
    };
  }
};