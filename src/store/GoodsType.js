import api from '../utils/api';

export default {
    state: {
        goodstype: [],
    },
    mutations: {
        setGoodsType(state, goodstype) {

            state.goodstype = [...goodstype];
            console.log(state.goodstype, 'aabb')
        },
    },
    actions: {
        getGoodsType({ commit }) {
            api.get('sort/get_sort')
                .then(response => {
                    commit('setGoodsType', response.data.data);
                });
        },
    },
    getters: {
        goodstype: state => state.goodstype,
    },
}