import { getUsername, getToken } from "@/libs/utils/app";
const state = () => ({
  iscollapsed: JSON.parse(sessionStorage.getItem("collapsed")) || false,
  token: getToken() || "",
  username: getUsername() || "",
});

const getters = {};

const mutations = {
  SET_COLLAPSED(state) {
    state.iscollapsed = !state.iscollapsed;
    sessionStorage.setItem("collapsed", state.iscollapsed);
  },
  SET_TOKEN(state, payload) {
    state.token = payload;
  },
  SET_USERNAME(state, payload) {
    state.username = payload;
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}