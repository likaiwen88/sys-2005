import axios from "axios";
axios.defaults.baseURL =
  process.env.NODE_ENV === "development" ? "api" : "http://www.chst.vip";
//允许请求携带认证
axios.defaults.withCredentials = true;

axios.create({
  timeout: 4000
});

export default axios;
