import {
  ADD,
  DELETE,
  FIND,
  NEXT,
  PRIOR,
  CHANGE_POS,
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
  change_pos({ commit }, item) {
    commit(CHANGE_POS, { item });
  },
};
