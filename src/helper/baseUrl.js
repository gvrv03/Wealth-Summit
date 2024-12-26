let baseUrl = "";

if (process.env.NODE_ENV == "development") {
  baseUrl = "http://localhost:3000/";
} else {
  baseUrl = "https://wealth-summit.vercel.app/";
}

export default baseUrl;
