import request from '../utils/request';

const namespace = 'bar';

const acTyp = {
  fetch_dogImg: 'fetch_dogImg',
  fetch_dogImg_success: 'fetch_dogImg_success',
};

Object.freeze(acTyp);

export default {
  namespace,
  acTyp,
  state: {
    dogImgURL: 'https://images.dog.ceo/breeds/puggle/IMG_114654.jpg',
  },
  effects: {
    *[acTyp.fetch_dogImg](_, sagaEffects) {
      const { call, put } = sagaEffects;
      const rsp = yield call(request, 'https://dog.ceo/api/breeds/image/random');
      yield put({ type: acTyp.fetch_dogImg_success, dogImgURL: rsp.message });
    },
  },
  reducers: {
    [acTyp.fetch_dogImg_success](state, { dogImgURL }) {
      return { ...state, dogImgURL };
    },
  },
}
