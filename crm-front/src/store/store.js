import { createStore } from 'vuex';

export default createStore({
    state: {
        isLoading: false,
        notify: {
            isActive: false,
            color: 'lightblue',
            text: 'Ooops...',
        },

    },
    mutations: {
        setNotify(state, payload) {
            state.notify = { ...state.notify, ...payload };
        },
        isLoading(state, isLoading) {
            state.isLoading = isLoading;
        },
    },
    getters: {
        getIsLoading(state) {
            return state.isLoading;
        },
        getNotify(state) {
            return state.notify;
        },
    },
});
