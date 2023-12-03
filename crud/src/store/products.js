import products from "../api/products";
import { Notify } from "quasar";

const initialState = () => {
  return {
    products: {},
    statistics: {},
  };
};
const state = initialState();
const getters = {
  getStatistics(state) {
    return state.statistics;
  },
  getAll(state) {
    let all = [];
    state.statistics.details.forEach((cat) => {
      	cat.products.forEach((prod) => {
      	  	all.push(prod);
      	});
    });
    return all;
  },
};

const mutations = {
  SET_STATISTICS(state, payload) {
    state.statistics = payload;
  },
  SET_PRODUCT_UPDATE(state, payload) {
    state.statistics.details.forEach((category, cindex) => {
      category.products.forEach((product, pindex) => {
        if (payload.id == product.id) {
          /*  console.log(product)
          console.log(payload) */
          state.statistics.details[cindex].products[pindex] = payload;
          Notify.create({
            message: "Current data updated",
            color: "primary",
            timeout: 2000,
          });
        }
      });
    });
  },
};

const actions = {
  async fetchStats({ commit }, payload) {
    let response = await products.getStatistics();
    /*  console.log(response); */
    if (response) {
      commit("SET_STATISTICS", response);
      return true;
    } else {
      return false;
    }
  },
  async updateProduct({ commit }, payload) {
    let response = await products.updateProduct(payload);
    console.log(response);
    if (response) {
      commit("SET_PRODUCT_UPDATE", response);
      return true;
    } else {
      return false;
    }
  },
};

export default {
  namespaced: true,
  actions,
  state,
  getters,
  mutations,
};
