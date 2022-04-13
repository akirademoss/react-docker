import axios from "axios";
const FormData = require('form-data');


const API_URL = "http://localhost:4000";

class ProfileService {
  async updateProfile(name, bio, link, id, token){
    console.log(link)
    console.log("just testing link")
    const cite = bio
    const config = {
      headers: { Authorization: 'Bearer ' + token}
    };
      const response = await axios
      .put(API_URL + "/profile/" + id, {name, bio, link, cite}, config);
    if (response.data) {
      localStorage.setItem("profile", JSON.stringify(response.data));
    }
    return response.data;
  }
  async uploadAvatar(id, avatar, token){
    const config = {
      headers: { Authorization: 'Bearer ' + token }
    }; 

    //convert url object back to blob 
    let blob = await fetch(avatar).then(r => r.blob());

    console.log('size=' + blob.size);
    console.log('type=' + blob.type);

    const form = new FormData();


    //convert blob to a file
    const file = new File([blob], 'image.png', {
    type: blob.type,
    });
     
    //append file to form
    form.append('name', 'avatar')
    form.append('image', blob)

    //print out form data entries
    for (var key of form.entries()) {
      console.log(key[0] + ', ' + key[1]);
    }

    console.log("avatar (object URL): " + avatar);
    console.log("blob: " + blob);
    console.log("file: " + file);


    const response = await axios
    .put(API_URL + "/profile/" + id + "/upload", form, config)

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

  async removeAvatar(id, token){
    const config = {
      headers: { Authorization: 'Bearer ' + token }
    };
      console.log("test")
      const response = await axios
      .delete(API_URL + "/profile/" + id +"/remove", config);
    if (response.data) {
      localStorage.setItem("profile", JSON.stringify(response.data));
    }
    return response.data;
  }
  
}

export default new ProfileService();