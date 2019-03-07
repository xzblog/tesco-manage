import { stringify } from 'qs';
import request from '@/utils/request';

export async function fakeAccountLogin(params) {
  return request('/api/admin/login', {
    method: 'POST',
    body: params,
  });
}

// 管理员相关
export async function createAdmin(params) {
  return request('/api/admin/users', {
    method: 'POST',
    body: params,
  });
}

export async function removeAdmin(id) {
  return request(`/api/admin/users/${id}`, {
    method: 'DELETE',
  });
}

export async function updateAdmin(params) {
  const { id, data } = params;
  return request(`/api/admin/users/${id}`, {
    method: 'PUT',
    body: data,
  });
}

export async function fetchAdmins() {
  return request('/api/admin/users', {
    method: 'GET',
  });
}

export async function fetchAdmin(id) {
  return request(`/api/admin/users/${id}`, {
    method: 'GET',
  });
}

// 角色
export async function fetchRoles() {
  return request('/api/admin/roles', {
    method: 'GET',
  });
}

// 广告
export async function createAdverts(params) {
  return request('/api/admin/adverts', {
    method: 'POST',
    body: params,
  });
}

export async function removeAdverts(id) {
  return request(`/api/admin/adverts/${id}`, {
    method: 'DELETE',
  });
}

export async function updateAdverts(params) {
  const { id, data } = params;
  return request(`/api/admin/adverts/${id}`, {
    method: 'PUT',
    body: data,
  });
}

export async function fetchAdverts() {
  return request('/api/admin/adverts', {
    method: 'GET',
  });
}







export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'update',
    },
  });
}



export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices(params = {}) {
  return request(`/api/notices?${stringify(params)}`);
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}
