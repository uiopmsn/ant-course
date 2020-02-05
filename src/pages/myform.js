import React from 'react';
import { Table, Modal, Button, Form, Input } from 'antd';
import { connect } from 'dva';

const FormItem = Form.Item;

const mapStateToProps = (state) =>{
    return {
        visible: state['myForm'].visible,
        data: state['myForm'].data,
        cardsLoading: state.loading.effects['myForm/queryList'],
    }
};

class MyForm extends React.Component {
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
            type: 'myForm/queryList',
        });
    }

    //    其中每一个 Form.Item 都是一个表单域。而 getFieldDecorator 是用于将包裹的组件与表单进行双向绑定使用
    //     设置改表单域是否是必填项（required: true）或者是否需要类型检查（type: url）
    render() {
        const { visible, data, cardsLoading } = this.props;
        //const { form: { getFieldDecorator } } = this.props;
        //试验效果一样的写法
        const getFieldDecorator = this.props.form.getFieldDecorator;

        return(
            <div>
                <Button onClick={ ()=>this.setModal(true) }>新建</Button>
                <Table columns={this.columns} dataSource={data} loading={cardsLoading} rowKey="id" />

                <Modal title="新建记录"
                       visible={visible}
                       onOk={this.handleOk}
                       onCancel={ ()=>this.setModal(false) }>

                    <Form>
                        <FormItem label="名称">
                            {
                                getFieldDecorator('name',
                                    {
                                        rules: [{ required: true }],
                                    }
                                )(<Input />)
                            }
                        </FormItem>
                        <FormItem label="描述">
                            {getFieldDecorator('desc')(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem label="链接">
                            {getFieldDecorator('url', {
                                rules: [{ type: 'url' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            </div>


        );
    }

    //打开和关闭弹窗
    setModal = (visible) => {
        const { dispatch } = this.props;
        const action = {
            type: 'myForm/setVisible',
            payload: visible
        }
        dispatch(action);
    }


    //提交表单
    handleOk = () => {
        const { dispatch, form: { validateFields } } = this.props;
        validateFields((err, values) => {
            if (!err) {
                dispatch({
                    type: 'myForm/addOne',
                    payload: values,
                });
            }
        });
    }
}

export default connect(mapStateToProps)(Form.create()(MyForm));