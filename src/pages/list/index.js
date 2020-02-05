import React, {Component} from 'react';
import { Table } from 'antd';
import { connect } from "dva";

class List extends Component {

    //定义表格所需要的列
    columns = [
        {
            title: '名称',
            dataIndex: 'name',
        },
        {
            title: '描述',
            dataIndex: 'desc',
        },
        {
            title: '链接',
            dataIndex: 'url',
            render: value => <a href={value}>{value}</a>,
        },
    ];

    componentDidMount() {
        this.props.dispatch({
            type: 'cards/queryList',
        });
    }

    render() {
        const { cardsList, cardsLoading } = this.props;
        return(
            <div>
                <Table columns={this.columns} dataSource={cardsList} loading={cardsLoading} rowKey="id" />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        //dva model 的namespace两种写法都可以，测试有效
        //cardsList: state.cards.cardsList,
        cardsList: state['cards'].cardsList,
        //其中当用户 dispatch 对应 effect 时，dva 会自动注入对应 effect 的 loading 状态。
        // 因而我们可以很方便的将 state.loading.effects 中的状态传入。
        cardsLoading: state.loading.effects['cards/queryList'],
    };
}

export default connect(mapStateToProps)(List);