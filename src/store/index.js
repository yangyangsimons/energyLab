import { createApp } from 'vue';
import { createStore } from 'vuex';
import { AuthStore } from "./AuthStore";
import { AwlStore } from "./AwlStore";
export { AuthStore, AwlStore };
export { useSetStore } from './useSetStore';

const store = createStore({
    state: {
        switch: 1
    },
    mutations: {
        toggleSwitch(state) {
            state.switch = state.switch === 0 ? 1 : 0;
        }
    },
    actions: {
        toggleSwitch(context) {
            context.commit('toggleSwitch');
        }
    }
});

export default store;