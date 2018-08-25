import request from '../utils/request';

function delay(millseconds) {
  return new Promise(function(resolve) {
    setTimeout(resolve, millseconds);
  });
}

const namespace = 'bar';

const acTyp = {
  fetch_dogImg: 'fetch_dogImg',
  fetch_dogImg_success: 'fetch_dogImg_success',
  start_polling_dogImg: 'start_polling_dogImg',
  stop_polling_dogImg: 'stop_polling_dogImg',
};

Object.freeze(acTyp);

const endPointURL = 'https://dog.ceo/api/breeds/image/random';

function* pollingDogImgSagaWorker(sagaEffects) {
  const { call, put } = sagaEffects;
  while (true) {
    const rsp = yield call(request, endPointURL);
    yield call(delay, 1000);
    yield put({ type: acTyp.fetch_dogImg_success, dogImgURL: rsp.message });
  }
}

export default {
  namespace,
  acTyp,
  state: {
    dogImgURL: 'https://images.dog.ceo/breeds/puggle/IMG_114654.jpg',
  },
  effects: {
    *[acTyp.fetch_dogImg](_, sagaEffects) {
      const { call, put } = sagaEffects;
      const rsp = yield call(request, endPointURL);
      yield put({ type: acTyp.fetch_dogImg_success, dogImgURL: rsp.message });
    },
    'poll dog image': [function*(sagaEffects) {
      const { call, take, race } = sagaEffects;
      while (true) {
        yield take(acTyp.start_polling_dogImg);
        yield race([
          call(pollingDogImgSagaWorker, sagaEffects),
          take(acTyp.stop_polling_dogImg),
        ]);
      }
    }, { type: 'watcher' }],
  },
  reducers: {
    [acTyp.fetch_dogImg_success](state, { dogImgURL }) {
      return { ...state, dogImgURL };
    },
    [acTyp.start_polling_dogImg](state) {
      return { ...state };
    },
    [acTyp.stop_polling_dogImg](state) {
      return { ...state };
    },
  },
}
