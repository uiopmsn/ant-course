const listData = [
    {
        name : 'umi',
        desc : '极快的类 Next.js 的 React 应用框架',
        url  : 'https://umijs.org'
    },
    {
        name : 'antd',
        desc : '一个服务于企业级产品的设计体系',
        url  : 'https://ant.design/index-cn'
    },
    {
        name : 'antd-pro',
        desc : '一个服务于企业级产品的设计体系',
        url  : 'https://ant.design/index-cn'
    }
];

export default {
    'get /dev/getList': listData
}