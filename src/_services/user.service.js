import axios from "axios";

const API_URL = "http://localhost:4000";

class UserService {
  async getUserDetails(username) {

      return axios
        .post(API_URL + "/users/getuserdetails", { username })
        .then((response) => {
          if (response.data) {
            localStorage.setItem("userDetails", JSON.stringify(response.data));
          }
          return response.data;
        });
  }

  async userSearch(name) {

    return axios
      .post(API_URL + "/users/search", { name })
      .then((response) => {
        if (response.data) {
          localStorage.setItem("searchResults", JSON.stringify(response.data));
        }
        return response.data;
      });
}
  
}

export default new UserService();