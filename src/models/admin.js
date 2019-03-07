import { fetchAdmins, fetchAdmin, createAdmin, updateAdmin, removeAdmin, fetchRoles } from '@/services/api';
import { message } from 'antd';

export default {
  namespace: 'admin',

  state: {
    list: [],
    roles: []
  },

  effects: {
    *fetchAll(_, { call, put }) {
      const response = yield call(fetchAdmins);
      yield put({
        type: 'show',
        payload: response,
      });
    },
    *fetchSingle(_, { call, put }) {
      const response = yield call(fetchAdmin);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    *fetchRoles(_, { call, put }) {
      const response = yield call(fetchRoles);
      yield put({
        type: 'showRoles',
        payload: response,
      });
    },
    *create({ payload }, { call, put }) {
      const response = yield call(createAdmin, payload);
      if (response) {
        yield put({
          type: 'add',
          payload: response,
        });
      }
    },
    *update({ payload }, { call, put }) {
      const response = yield call(updateAdmin, payload);
      yield put({
        type: 'replace',
        payload: response,
      });
    },
    *remove({ payload }, { call, put }) {
      yield call(removeAdmin, payload);
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
