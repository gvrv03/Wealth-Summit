let baseUrl = "";

if (process.env.NODE_ENV == "development") {
  baseUrl = "http://localhost:3000/";
} else {
  baseUrl = "https://wealthsummitnew.vercel.app/";
}

export default baseUrl;
