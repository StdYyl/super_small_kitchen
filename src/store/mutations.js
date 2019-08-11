import {
  ADD, CHANGE_POS,
  DELETE,
  FIND,
  NEXT,
  PRIOR,
} from './mutation-types';

export default {
  [ADD](state, { item }) {
    state.DataList.unshift(item);
  },
  [NEXT](state, { item }) {
    if (item === 1) {
      state.addKitchenStepInfo.first.flag = true;
    } else if (item === 2) {
      state.addKitchenStepInfo.second.flag = true;
    } else if (item === 3) {
      state.addKitchenStepInfo.third.flag = true;
    } else if (item === 4) {
      state.addKitchenStepInfo.fourth.flag = true;
    }
  },
  [PRIOR](state, { item }) {
    if (item === 1) {
      state.addKitchenStepInfo.first.flag = false;
    } else if (item === 2) {
      state.addKitchenStepInfo.second.flag = false;
    } else if (item === 3) {
      state.addKitchenStepInfo.third.flag = false;
    } else if (item === 4) {
      state.addKitchenStepInfo.fourth.flag = false;
    }
  },
  [CHANGE_POS](state, { item }) {
    console.log('change_pos');
    state.city = [item[0], item[1], item[2]];
  },
};
