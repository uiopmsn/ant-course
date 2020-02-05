//import request from '../utils/request';


import request from "../utils/request";

export default {
    namespace: 'myForm',
    state: {
        visible: false,
        counter: 0,
        data: [],
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
            const data = [...payload];
            return {
                data
            };
        },
        addOne(state, { payload: newCard }){
            const nextCounter = state.counter + 1;
            const newCardWithId = { ...newCard, id: nextCounter };
            const nextData = state.data.concat(newCardWithId);
            return {
                visible: false,
                counter: nextCounter,
                data: nextData,
            };
        },
        setVisible(state, { payload }){
            const visible = payload;
            const newState = {...state};
            newState.visible = visible;
            return  newState ;
        }

    },



};

