import Vue from 'vue';
import Vuex from 'vuex';
// import * as actions from './actions';
// import * as getters from './getters';

Vue.use(Vuex);

const state = {
    'headerTitle': '控制中心',
    'func_1': {},
    'func_2': {},
    'func_3': {}
};

const mutations = {
    UPDATE_SYSINFO(state, info) {
        state.headerTitle = info.title;
        state.func_1 = info.func[0];
        state.func_2 = info.func[1];
        state.func_3 = info.func[2];
    }
};

export default new Vuex.Store({
    state,
    mutations
    // actions,
    // getters
});
