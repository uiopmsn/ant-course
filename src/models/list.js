import request from '../utils/request';

/*
const delay = (millisecond) => {
    return new Promise((resolve) => {
        setTimeout(resolve, millisecond);
    });
};
*/

export default {
    namespace : 'cards',
    state : {
        cardsList: []
    },
    effects: {
        //代表事件的Action对象，由于函数体不需要Action内容，所有使用`_`占位符代替Action对象了
        *queryList(_, sagaEffects) {
            const { call, put } = sagaEffects;
            const endPointURI = 'dev/getList';
            const listData = yield call(request, endPointURI);
            //yield call(delay, 3000);
            yield put({ type: 'initList', payload: listData });
        }
    },
    reducers: {
        initList(state, {payload}) {
            const cardsList = [...payload];

            return {
                cardsList
            };
        }
    }
};