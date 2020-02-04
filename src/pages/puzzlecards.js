import React, { Component } from 'react';
import { Card , Button } from 'antd';
import { connect } from 'dva';

const namespace = 'puzzlecards';

const mapStateToProps = (state) => {
    const cardList = state[namespace].data;
    return {
        cardList,
    };
};

//定义一个action来用来和dva打交道
const mapDispatchToProps = (dispatch) => {
    return {
        onDidMount: () => {
            dispatch({
                type: `${namespace}/queryInitCards`,
            });
        },
        onClickAdd: (newCard) => {
            //约定用 payload字段表示额外信息
            const action = {
                // type实际值: 'puzzlecards/addNewCard',
                //type: '${namespace}/addNewCard',  //错误，要用 ``ES6语法，操蛋，大坑。 ``才可以使用${}
                //type: `${namespace}/addNewCard`,
                type: namespace+'/addNewCard',
                payload: newCard,
            };
            //dispatch 函数就是和 dva model 打交道的唯一途径
            dispatch(action);
        },
    };
}

//通过connect, 注入 PuzzleCardsPage的 Props
@connect(mapStateToProps, mapDispatchToProps)
export default class PuzzleCardsPage extends Component{
    componentDidMount() {
        this.props.onDidMount();
    }
    render() {
        return(
            <div>
                {
                    this.props.cardList.map(card => {
                        return (
                            <Card key={card.id}>
                                <div>Q: {card.setup}</div>
                                <div>
                                    <strong>A: {card.punchline}</strong>
                                </div>
                            </Card>
                        );
                    })
                }

                <div>
                    <Button onClick = {
                        () => this.props.onClickAdd(
                        {
                            setup: '什么时候？',
                            punchline: '凌晨五点',
                        })
                    }>
                        添加卡片
                    </Button>
                </div>

            </div>
        );
    }
}