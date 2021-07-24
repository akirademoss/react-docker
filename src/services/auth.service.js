import axios from "axios";

const API_URL = "http://localhost:4000";

class AuthService {
  authenticate(username, password) {

      return axios
        .post(API_URL + "/users/authenticate", { username, password })
        .then((response) => {
          if (response.data.accessToken) {
            console.log(response.data.accessToken)
            localStorage.setItem("user", JSON.stringify(response.data));
          }
          return response.data;
        });
  }
  
  logout() {
    localStorage.removeItem("user");
  }
  
  register(email, username, password) {
    return axios.post(API_URL + "/users/register", {
      email,
      username,
      password,
    });
  }
  
}

export default new AuthService();