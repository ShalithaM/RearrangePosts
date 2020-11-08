/* eslint-disable */
import instance from "@/services/instance.js";


const GetAllPosts = payload => {
  return instance.instance
    .get('', payload)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return []
    });
};


export default {
  getAllPosts: GetAllPosts,

};
