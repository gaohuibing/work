import Vue from 'vue'
import Vuex from 'vuex'
import GoodsType from './store/GoodsType'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        GoodsType
    }
});