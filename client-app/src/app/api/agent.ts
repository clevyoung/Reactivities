import axios, { AxiosResponse } from 'axios';
import { IActivity } from '../models/activity';
import { history } from '../..';
import { toast } from 'react-toastify';

axios.defaults.baseURL = 'http://localhost:5000/api';

//axios interceptors => then이나 catch로 처리되기 전에 요청이나 응답을 가로챌 수 있다.

axios.interceptors.response.use(undefined, (error) => {
  //how we can utilize our router to redirect the user to our notfound component
  //네트워크 에러처리
  if (error.message === 'Network Error' && !error.response) {
    toast('Network error - make sure API is running');
  }
  const { status, data, config } = error.response;

  //404 에러처리
  if (status === 404) {
    history.push('/notfound');
  }
  //400 에러처리
  if (
    status === 400 &&
    config.method === 'get' &&
    data.errors.hasOwnProperty('id')
  ) {
    history.push('/notfound');
  }

  //500 에러처리
  if (status === 500) {
    toast.error('Server error - check the terminal for more info!');
  }
});

//두 개의 인자를 받음 1 응답 데이터 처리 2 오류 응답 처리

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>((resolve) =>
    setTimeout(() => resolve(response), ms)
  );

const requests = {
  get: (url: string) => axios.get(url).then(sleep(900)).then(responseBody),
  post: (url: string, body: {}) =>
    axios.post(url, body).then(sleep(900)).then(responseBody),
  put: (url: string, body: {}) =>
    axios.put(url, body).then(sleep(900)).then(responseBody),
  delete: (url: string) =>
    axios.delete(url).then(sleep(900)).then(responseBody),
};

const Activities = {
  list: (): Promise<IActivity[]> => requests.get('/activities'),
  details: (id: string) => requests.get(`/activities/${id}`),
  create: (activity: IActivity) => requests.post('/activities', activity),
  update: (activity: IActivity) =>
    requests.put(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.delete(`/activities/${id}`),
};

export default {
  Activities,
};
