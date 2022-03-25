import axios from "axios";

const API_URL = "http://localhost:4000";

class ProfileService {
  async updateProfile(name, bio, link, id, token){
    console.log(link)
    console.log("just testing link")
    const cite = bio
    const config = {
      headers: { Authorization: 'Bearer ' + token }
    };
      const response = await axios
      .put(API_URL + "/profile/" + id, {name, bio, link, cite}, config);
    if (response.data) {
      localStorage.setItem("profile", JSON.stringify(response.data));
    }
    return response.data;
  }
  async uploadAvatar(token, avatar){
    const config = {
      headers: { Authorization: 'Bearer ' + token }
    }; 
    const response = await axios
    .put(API_URL + "/profile/upload", {avatar}, config);
    if (response.data) {
      localStorage.setItem("profile", JSON.stringify(response.data));
    }
    return response.data;   
  }

  async getInfo(id, token){
    const config = {
      headers: { Authorization: 'Bearer ' + token }
    };
      console.log("test")
      const response = await axios
      .get(API_URL + "/profile/" + id +"/info", config);
    if (response.data) {
      localStorage.setItem("profile", JSON.stringify(response.data));
    }
    return response.data;
  }
  
}

export default new ProfileService();