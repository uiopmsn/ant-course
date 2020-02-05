import React, {Component} from 'react';
import { Table, Button, Modal } from 'antd';
import { connect } from "dva";
import SampleChart from "../../components/SampleChart";

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
        {
            title: '',
            dataIndex: '_',
            render: (_, {id}) => {
                return (
                    <Button onClick={() => { this.showChart(id); }}>图表</Button>
                );
            },
        },
    ];

    componentDidMount() {
        this.props.dispatch({
            type: 'cards/queryList',
        });
    }

    showChart = (id) => {
        this.props.dispatch({
            type: 'cards/getChart',
            payload: id,
        });
    };

    handleCloseChart = () => {
        this.props.dispatch({
            type: 'cards/closeChart'
        });
    };

    render() {
        const { cardsList, cardsLoading } = this.props;
        const { chartVisible, id, chartData } = this.props;
        return(
            <div>
                <Table columns={this.columns} dataSource={cardsList} loading={cardsLoading} rowKey="id" />
                <Modal title="图表"
                       visible={chartVisible}
                       footer={null}
                       onCancel={this.handleCloseChart}>
                    <SampleChart data={chartData[id]} />
                </Modal>
            </div>
        );
    };
}


function mapStateToProps(state) {
    return {
        cardsList: state.cards.cardsList,
        chartVisible: state.cards.chartVisible,
        id: state.cards.id,
        chartData: state.cards.chartData,
        //其中当用户 dispatch 对应 effect 时，dva 会自动注入对应 effect 的 loading 状态。
        // 因而我们可以很方便的将 state.loading.effects 中的状态传入。
        cardsLoading: state.loading.effects['cards/queryList'],
    };
}

export default connect(mapStateToProps)(List);