let baseUrl = "";
export let basePhonePeURL = "https://api.phonepe.com/apis/hermes/pg/v1/";

if (process.env.NODE_ENV == "development") {
  baseUrl = "http://localhost:3000/";
  // basePhonePeURL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/";
} else {
  baseUrl = "https://www.wealthsummit.shop/";
  // basePhonePeURL = " https://api.phonepe.com/apis/hermes/pg/v1/";
}
export default baseUrl;
