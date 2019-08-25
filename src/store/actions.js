import {
  ADD,
  DELETE,
  FIND,
  NEXT,
  PRIOR,
  INITSTEP,
  CHANGE_POS,
  CLEAR_FROM,
  SET_STORAGE,
  REMOVE_STORAGE,
} from './mutation-types';

export default {
  add({ commit }, item) {
    commit(ADD, { item });
  },
  next({ commit }, item) {
    commit(NEXT, { item });
  },
  prior({ commit }, item) {
    commit(PRIOR, { item });
  },
  initStep({ commit }, item) {
    commit(INITSTEP);
  },
  change_pos({ commit }, item) {
    commit(CHANGE_POS, { item });
  },
  setStorage({ commit }, item) {
    commit(SET_STORAGE, { item });
  },
  removeStorage({ commit }) {
    commit(REMOVE_STORAGE);
  },
  clear_from({ commit }) {
    commit(CLEAR_FROM);
  },
};
