import { defineStore } from 'pinia';

export const postStore = defineStore('post', {
  state() {
    return {
      post: null,
    };
  },

  actions: {
    setPost(post) {
      localStorage.setItem('postdetail', JSON.stringify(post));
      this.post = JSON.parse(localStorage.getItem('postdetail'));
    },
    clearPost() {
      localStorage.removeItem('postdetail');
      this.post = null;
    },
  },
  getters: {
    getPost : (state) => state.post,
  },
});