// src/store/index.js

import { createStore } from 'vuex';
import apiClient from '../axios';

export default createStore({
  state: {
    user: null,
    token: localStorage.getItem('token') || null,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_TOKEN(state, token) {
      state.token = token;
      if (token) {
        localStorage.setItem('token', token);
      } else {
        localStorage.removeItem('token');
      }
    },
  },
  actions: {
    async register({ commit }, userData) {
      const response = await apiClient.post('/users/register', userData);
      commit('SET_USER', response.data);
      commit('SET_TOKEN', response.data.token);
    },
    async login({ commit }, credentials) {
      const response = await apiClient.post('/users/login', credentials);
      commit('SET_USER', response.data);
      commit('SET_TOKEN', response.data.token);
    },
    logout({ commit }) {
      commit('SET_USER', null);
      commit('SET_TOKEN', null);
    },
    async fetchUser({ commit }) {
      const response = await apiClient.get('/users/profile');
      commit('SET_USER', response.data);
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    getUser: (state) => state.user,
  },
});
