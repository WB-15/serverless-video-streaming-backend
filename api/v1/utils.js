const authenticator = require('aws-cognito-jwt-authenticate');


const getResponseHeaders = () => {
    return {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    };
  };

const getCurrentDataTime = () => {
  let today = new Date(),
      year = today.getFullYear(),
      month = today.getMonth() + 1,
      day = today.getDate(),
      hour = today.getHours(),
      min = today.getMinutes(),
      sec = today.getSeconds();
  
  if (month < 10) 
    month = '0' + month;

  if (day < 10) 
    day = '0' + day;

  if (hour < 10) 
    hour = '0' + hour;

  if (min < 10) 
    min = '0' + min;
    
  if (sec < 10) 
    sec = '0' + sec;

  return `${[year, month, day].join('-')} ${[hour, min, sec].join(':')}`
}

const checkAuth = async (token) => {
  if(token == undefined){
    return null;
  }
  // Verifier that expects valid access tokens:
  const cognitoDetails = { userPoolId: 'us-east-1_VM8LwGtzu', region: 'us-east-1', clientId: "2rnuk9v5kb4ql7u7lkc4j90mv0" };

  await authenticator.validateJwt(token.split("Bearer ")[1], cognitoDetails).then((response) => {
    return response;
  }).catch(e => {
    return null;
  })
}

module.exports = { getResponseHeaders, getCurrentDataTime, checkAuth };