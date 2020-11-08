import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import postService from "./services/post.sevice";

export default new Vuex.Store({
  // the vuex state variable
  state: {
    posts: [],
    postActions: []
  },

  
  // the vuex mutations
  mutations: {
    SET_POSTS(state, payload) {
      state.posts = payload;
    },
    SET_POSTS_ACTIONS(state, payload) {
      state.postActions = payload;
    }

  },


  // the vuex actions (setters)
  actions: {
    // get all posts (API call)
    setPosts({ commit }) {
      postService
        .getAllPosts()
        .then((response) => {
          commit("SET_POSTS", response.data.slice(0, 5));
        })
        .catch((err) => {
          console.log(err);
          commit("SET_POSTS", []);
        });
    },

    // swap elements
    swapElements({ commit, getters }, payload) {
      let postArr = JSON.parse(JSON.stringify(getters.getPosts));
      let temp = postArr[payload.index_1]

      postArr[payload.index_1] = postArr[payload.index_2]
      postArr[payload.index_2] = temp

      commit("SET_POSTS", postArr);
    },

    // save post actions
    setPostAction({ commit, getters }, payload) {
      let postActionArr = []
      postActionArr = JSON.parse(JSON.stringify(getters.getPostsActions));

      postActionArr.push(payload)
      let sorted = postActionArr.sort(function (a, b) {
        return new Date(b.id) - new Date(a.id);
      });
      commit("SET_POSTS_ACTIONS", sorted);
    },

    // time travel function
    timeTravel({ commit, getters }, payload) {
      let postArr = JSON.parse(JSON.stringify(getters.getPosts));

      let selectedPost = postArr.filter((el) => {
        return el.id == payload.postId
      });

      let tmp = postArr[payload.previousIndex - 1]

      postArr[payload.newIndex - 1] = tmp
      postArr[payload.previousIndex - 1] = selectedPost[0]

      commit("SET_POSTS", postArr);
    },

    // remove selected time travel element
    removePostAction({ commit, getters }, payload) {
      let postActionArr = JSON.parse(JSON.stringify(getters.getPostsActions));
      postActionArr.splice(payload, 1)

      commit("SET_POSTS_ACTIONS", postActionArr);
    },

  },


  // the vuex getters
  getters: {
    getPosts: (state) => state.posts,
    getPostsActions: (state) => state.postActions,
  },
});
