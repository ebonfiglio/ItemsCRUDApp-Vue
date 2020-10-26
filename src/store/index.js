import Vue from 'vue'
import Vuex from 'vuex'

import itemService from '../services/ItemService';
import {
  GET_ITEMS, 
  GET_MAX_PRICES,
  UPDATE_ITEM,
  DELETE_ITEM,
  ADD_ITEM,
} from '../store/mutation-types'

Vue.use(Vuex)

const state = () => ({
  items: [],
  maxPrices: [],
  topMaxPrices: []
});
const mutations = {
  [ADD_ITEM](state, item) {
    state.items.push(item); // mutable addition
  },
  [UPDATE_ITEM](state, item) {
    const index = state.items.findIndex(h => h.id === item.id);
    state.items.splice(index, 1, item);
    state.items = [...state.items];
  },
  [GET_ITEMS](state, items) {
    state.items = items;
  },
  [DELETE_ITEM](state, itemId) {
    state.items = [...state.items.filter(p => p.id !== itemId)];
  },
  [GET_MAX_PRICES](state, maxPrices) {
    state.maxPrices = maxPrices;
  }
};
const actions = {
 
  async addItemAction({ commit }, item) {
    const addedItem = await itemService.create(item);
    commit(ADD_ITEM, addedItem);
  },
  async deleteItemAction({ commit }, item) {
    var statusCode = await itemService.delete(item.Id);
    if(statusCode === 200) commit(DELETE_ITEM, item.Id);
  },
  async getItemsAction({ commit }) {
    const items = await itemService.getAll();
    commit(GET_ITEMS, items);
  },
  async updateItemAction({ commit }, item) {
    const updatedItem = await itemService.update(item);
    commit(UPDATE_ITEM, updatedItem);
  },
  async getMaxPricesAction({ commit }) {
    const items = await itemService.maxPricesOfItems();
    commit(GET_MAX_PRICES, items);
  },
};
const getters = {
  // parameterized getters are not cached. so this is just a convenience to get the state.
  getItemById: state => id => state.items.find(i => i.id === id),
  getMaxPriceByName: state => name => state.maxPrices.find(i => i.name === name),
  getTopMaxPrices: state => state.maxPrices?.sort(function(a, b) { 
    return b.cost - a.cost;
}).slice(0, 3)
};
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
  });
