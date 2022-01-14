import axios from "axios";

const API_URL = "http://localhost:4000";

class ProfileService {
  async updateProfile(name, bio, link, id, token){
    const config = {
      headers: { Authorization: 'Bearer ' + token }
    };
      const response = await axios
      .put(API_URL + "/profile/" + id, { name, bio }, config);
    if (response.data) {
      console.log(response.data);
      localStorage.setItem("profile", JSON.stringify(response.data));
    }
    return response.data;
  }
  
}

export default new ProfileService();