import {
  KEY,
} from './mutation-types';

export default {
  getStorage(state) {
    if (!state.manager) {
      state.manager = JSON.parse(localStorage.getItem(KEY));
    }
    return state.manager;
  },
};
