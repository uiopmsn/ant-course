export default {
    plugins: [
        ['umi-plugin-react', {
            antd: true,
            dva: true,
        }],
    ],

    proxy: {
        '/dev': {
            target: 'http://localhost:8080',
            changeOrigin: true,
        },
    },

    routes:[
        {
            path: '/',
            component: '../layout',

            routes: [
                {
                    path: '/',
                    component: './HelloWorld',
                },

                {   path: 'list',
                    component: '../pages/list'
                },

                {
                    path: 'helloworld',
                    component: './HelloWorld',
                },
                {
                    path: '/dashboard',
                    routes: [
                        { path: '/dashboard/analysis', component: 'Dashboard/Analysis' },
                        { path: '/dashboard/monitor', component: 'Dashboard/Monitor' },
                        { path: '/dashboard/workplace', component: 'Dashboard/Workplace' }
                    ]
                },
                {
                    path: 'puzzlecards',
                    component: './puzzlecards'
                },
            ]

        }
    ],
}