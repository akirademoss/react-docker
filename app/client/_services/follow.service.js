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
      localStorage.setItem("follow", JSON.stringify(response.data));
    }
    return response.data;
  }

  async unfollow(id, token, followedId){
    const config = {
      headers: { Authorization: 'Bearer ' + token}
    };
    const data = {
      data: {followedId: followedId}
    }
      const response = await axios
      .delete(API_URL + "/follow/" + id + "/unfollow", data, config);
    if (response.data) {
      localStorage.setItem("follow", JSON.stringify(response.data));
    }
    return response.data;
  }

  async removeFollower(id, token, followerId){
    const config = {
      headers: { Authorization: 'Bearer ' + token}
    };
    const data = {
      data: {followerId: followerId}
    }
      const response = await axios
      .delete(API_URL + "/follow/" + id + "/removefollower", data, config);
    if (response.data) {
      localStorage.setItem("removefollower", JSON.stringify(response.data));
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
      localStorage.setItem("myFollowerCount", JSON.stringify(response.data));
    }
    return response.data;
  }

  //NOTE: should be GET request but axios won't post data with GET 
  async getUserFollowerCount(id, token, followedId){
    const config = {
      headers: { Authorization: 'Bearer ' + token}
    };
      const response = await axios
      .post(API_URL + "/follow/" + id + "/userFollowersCount", {followedId}, config);
    if (response.data) {
      localStorage.setItem("userFollowerCount", JSON.stringify(response.data));
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
      localStorage.setItem("myFollowingCount", JSON.stringify(response.data));
    }
    return response.data;
  }

  //NOTE: should be GET request but axios won't post data with GET 
  async getUserFollowingCount(id, token, followedId){
    const config = {
      headers: { Authorization: 'Bearer ' + token}
    };
      const response = await axios
      .post(API_URL + "/follow/" + id + "/userFollowingCount", {followedId}, config);
    if (response.data) {
      localStorage.setItem("userFollowingCount", JSON.stringify(response.data));
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
      localStorage.setItem("followerInfo", JSON.stringify(response.data));
    }
    return response.data;
  }

    //NOTE: should be GET request but axios won't post data with GET 
  async getUserFollowerInfo(id, token, followedId){
    const config = {
      headers: { Authorization: 'Bearer ' + token}
    };
      const response = await axios
      .post(API_URL + "/follow/" + id + "/userFollowers", {followedId}, config);
    if (response.data) {
      localStorage.setItem("userFollowerInfo", JSON.stringify(response.data));
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
      localStorage.setItem("followingInfo", JSON.stringify(response.data));
    }
    return response.data;
  }

  //NOTE: should be GET request but axios won't post data with GET 
  async getUserFollowingInfo(id, token, followedId){
    const config = {
      headers: { Authorization: 'Bearer ' + token}
    };
      const response = await axios
      .post(API_URL + "/follow/" + id + "/userFollowing", {followedId}, config);
    if (response.data) {
      localStorage.setItem("userFollowingInfo", JSON.stringify(response.data));
    }
    return response.data;
  }

  async getFollowingStatus(id, token, followedId){
    console.log("testing id on client side this is folowerId", id)
    console.log("testing id on client side this is folowedId", followedId)
    const config = {
      headers: { Authorization: 'Bearer ' + token}
    };
      console.log("testing getFollowingStatus")
      const response = await axios
      .post(API_URL + "/follow/" + id + "/followingStatus", {followedId}, config);
    if (response.data) {
      localStorage.setItem("follow", JSON.stringify(response.data));
      let data = JSON.parse(localStorage.getItem("follow"));
      console.log("!!!!!!!!!!!!!!!!!!!!: ", data)
    }
    return response.data;
  }

  //NOTE: should be GET request but axios won't post data with GET 
  async getFollowingStatusEUM(id, token, followedId){
    const config = {
      headers: { Authorization: 'Bearer ' + token}
    };
      const response = await axios
      .post(API_URL + "/follow/" + id + "/followingStatusEUM", {followedId}, config);
    if (response.data) {
      localStorage.setItem("followingStatusEUM", JSON.stringify(response.data));
    }
    return response.data;
  }

  //NOTE: should be GET request but axios won't post data with GET 
  async getFollowingStatusIUM(id, token, followedId){
    const config = {
      headers: { Authorization: 'Bearer ' + token}
    };
      const response = await axios
      .post(API_URL + "/follow/" + id + "/followingStatusIUM", {followedId}, config);
    if (response.data) {
      localStorage.setItem("followingStatusIUM", JSON.stringify(response.data));
    }
    return response.data;
  }
}



export default new FollowService();