import request from '../utils/request';

const delay = (millisecond) => {
    return new Promise((resolve) => {
        setTimeout(resolve, millisecond);
    });
};

export default {
    namespace: 'puzzlecards',
    state: {
        data: [],
        counter : 0,
    },

    //用来响应 action 并修改 state, 每一个 reducer 都是一个 function, 它的返回值作为新的 state,
    //返回值必须是一个新构造对象, 绝不能把旧 state 的引用返回
    //和 React 中 setState(prevState => { ... }) 很像,
    //区别是：reducer 的返回值会 整个取代 (Replace) 老的 state，而 setState 中回调函数的返回值是会 融合(Merge) 到老的 state 中去。
    reducers: {
        addNewCard(state, { payload: newCard }){
            const nextCounter = state.counter + 1;
            const newCardWithId = { ...newCard, id: nextCounter };
            const nextData = state.data.concat(newCardWithId);
            return {
                data: nextData,
                counter: nextCounter,
            };
        }
    },

    //异步操作
    //局部上看 effect 就是一个一个的 generator function。宏观上看，effect 是一层中间件
    //第一个对象就是匹配这个 effect 的 action 对象，因此可以取到约定的 payload 这个字段，第二个对象是 effect 原语集，其中 call, put 最为常用
    //call 第一个参数是一个函数，要求函数返回 Promise，之后的参数是该函数调用时的入参
    //put 也是一个函数，put 和 yield 配合使用，用来派发一个 action，和 page中的dispatch 的功能 一模一样！只不过是在 effect 函数中使用而已
    //yield put 派发的 action 如果是为了触发 同 model 中的其他 effect/reducer 执行，不需要指定 namespace 名称。
    effects:{
        *queryInitCards(_, sagaEffects){
            const { call, put } = sagaEffects;
            //const endPointURI = 'dev/getCardInfo';
            //使用mock
            const endPointURI = 'dev/random_joke';

            const puzzle = yield call(request, endPointURI);
            
            yield put({ type: 'addNewCard', payload: puzzle[0] });

            yield call(delay, 1000);

            //const puzzle2 = yield call(request, endPointURI);
            yield put({ type: 'addNewCard', payload: puzzle[1] });
        },


    }

};

