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
        cardsList: [],
        chartData: [
            [
                { genre: '猫', sold: 275 },
                { genre: '狗', sold: 1150 },
                { genre: '熊', sold: 120 },
                { genre: '鹿', sold: 350 },
                { genre: '虎', sold: 150 },
            ],
            [
                { genre: 'cc', sold: 120 },
                { genre: 'dd', sold: 350 },
                { genre: 'ee', sold: 150 },
            ],
            [
                { genre: 'aa', sold: 275 },
                { genre: 'bb', sold: 1150 },
            ]
        ],
        chartVisible: false,
        id: null,
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
        //初始化列表信息
        initList(state, {payload}) {
            const newState = {...state};
            newState.cardsList = payload;
            return newState;
        },

        //打开图表
        getChart(state, {payload}){
            const newState = {...state};
            newState.id = payload;
            newState.chartVisible = true;
            return newState;
        },

        //关闭图表
        closeChart(state){
            const newState = {...state};
            newState.chartVisible = false;
            return newState;
        }

    }
};