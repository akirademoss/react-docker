import axios from "axios";
const FormData = require('form-data');


const API_URL = "http://localhost:4000";

class FollowService {
  async follow(id, token, followedId){
    const config = {
      headers: { Authorization: 'Bearer ' + token}
    };
      const response = await axios
      .post(API_URL + "/follow/" + id + "/follow", {followedId}, config);
    if (response.data) {
      localStorage.setItem("profile", JSON.stringify(response.data));
    }
    return response.data;
  }

  async unfollow(id, token, followedId){
    const config = {
      headers: { Authorization: 'Bearer ' + token}
    };
      const response = await axios
      .delete(API_URL + "/follow/" + id + "/unfollow", {followedId}, config);
    if (response.data) {
      localStorage.setItem("profile", JSON.stringify(response.data));
    }
    return response.data;
  }

  async getFollowerCount(id, token){
    const config = {
      headers: { Authorization: 'Bearer ' + token}
    };
      const response = await axios
      .get(API_URL + "/follow/" + id + "/myFollowersCount", config);
    if (response.data) {
      localStorage.setItem("profile", JSON.stringify(response.data));
    }
    return response.data;
  }

  async getUserFollowerCount(id, token, followedId){
    const config = {
      headers: { Authorization: 'Bearer ' + token}
    };
      const response = await axios
      .get(API_URL + "/follow/" + id + "/userFollowersCount", {followedId}, config);
    if (response.data) {
      localStorage.setItem("profile", JSON.stringify(response.data));
    }
    return response.data;
  }

  async getFollowingCount(id, token){
    const config = {
      headers: { Authorization: 'Bearer ' + token}
    };
      const response = await axios
      .get(API_URL + "/follow/" + id + "/myFollowingCount", config);
    if (response.data) {
      localStorage.setItem("profile", JSON.stringify(response.data));
    }
    return response.data;
  }

  async getUserFollowingCount(id, token, followedId){
    const config = {
      headers: { Authorization: 'Bearer ' + token}
    };
      const response = await axios
      .get(API_URL + "/follow/" + id + "/userFollowingCount", {followedId}, config);
    if (response.data) {
      localStorage.setItem("profile", JSON.stringify(response.data));
    }
    return response.data;
  }

  async getFollowerInfo(id, token){
    const config = {
      headers: { Authorization: 'Bearer ' + token}
    };
      const response = await axios
      .get(API_URL + "/follow/" + id + "/myFollowers", config);
    if (response.data) {
      localStorage.setItem("profile", JSON.stringify(response.data));
    }
    return response.data;
  }

  async getUserFollowerInfo(id, token, followedId){
    const config = {
      headers: { Authorization: 'Bearer ' + token}
    };
      const response = await axios
      .get(API_URL + "/follow/" + id + "/userFollowers", {followedId}, config);
    if (response.data) {
      localStorage.setItem("profile", JSON.stringify(response.data));
    }
    return response.data;
  }

  async getFollowingInfo(id, token){
    const config = {
      headers: { Authorization: 'Bearer ' + token}
    };
      const response = await axios
      .get(API_URL + "/follow/" + id + "/myFollowing", config);
    if (response.data) {
      localStorage.setItem("profile", JSON.stringify(response.data));
    }
    return response.data;
  }

  async getUserfollowingInfo(id, token, followedId){
    const config = {
      headers: { Authorization: 'Bearer ' + token}
    };
      const response = await axios
      .get(API_URL + "/follow/" + id + "/userFollowing", {followedId}, config);
    if (response.data) {
      localStorage.setItem("profile", JSON.stringify(response.data));
    }
    return response.data;
  }

  async getFollowingStatus(id, token, followedId){
    const config = {
      headers: { Authorization: 'Bearer ' + token}
    };
      const response = await axios
      .post(API_URL + "/follow/" + id + "/followingStatus", {followedId}, config);
    if (response.data) {
      localStorage.setItem("follow", JSON.stringify(response.data));
    }
    return response.data;
  }
}



export default new FollowService();