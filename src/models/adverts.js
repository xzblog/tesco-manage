import { fetchAdverts, createAdverts, updateAdverts, removeAdverts } from '@/services/api';
import { message } from 'antd';

export default {
  namespace: 'adverts',

  state: {
    list: [],
    roles: []
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(fetchAdverts);
      yield put({
        type: 'show',
        payload: response,
      });
    },

    *create({ payload }, { call, put }) {
      const response = yield call(createAdverts, payload);
      if (response) {
        yield put({
          type: 'add',
          payload: response,
        });
      }
    },

    *update({ payload }, { call, put }) {
      const response = yield call(updateAdverts, payload);
      yield put({
        type: 'replace',
        payload: response,
      });
    },

    *remove({ payload }, { call, put }) {
      yield call(removeAdverts, payload);
      yield put({
        type: 'delete',
        payload,
      });
    },
  },

  reducers: {
    show(state, action) {
      return {
        ...state,
        list: action.payload.data,
      };
    },
    add(state, action) {
      const { list } = state;
      list.unshift(action.payload.data);
      message.success('添加成功');
      return {
        ...state,
        list
      };
    },
    replace(state, action) {
      const { list } = state;
      const id = action.payload.data._id;
      let index;
      list.forEach((item, i)=> {
        if (item._id === id) {
          index = i
        }
      });
      list.splice(index, 1, action.payload.data);
      message.success('更新成功');
      return {
        ...state,
        list
      };
    },
    delete(state, action) {
      const { list } = state;
      let index;
      list.forEach((item, i)=> {
        if (item._id === action.payload) {
          index = i
        }
      });
      list.splice(index, 1);
      message.success('删除成功');
      return {
        ...state,
        list
      };
    },
    showRoles(state, action) {
      return {
        ...state,
        roles: action.payload.data,
      };
    },
  },
};
