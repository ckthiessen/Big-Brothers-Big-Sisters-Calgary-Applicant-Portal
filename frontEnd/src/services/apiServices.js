import axios from "axios"

export default {
  async getHelloworldExample() {
    let res = await axios.get("http://localhost:3080/");
    return res.data;
  },
}