const request = require('./request')

request.post('/app/adminAddAppId', {
    admin_name: 'admin',
    app_id: 'byte-monitor-docs',
    app_name: '字节监控对外文档',
    app_desc: '字节监控对外文档~',
}).then( res=> {
    console.log(res.data)
}).catch(e => {
    console.error(e)
})



request.post('/app/getAdminAppIdList', {
    admin_name: 'admin',
}).then( res=> {
    console.log(res.data)
}).catch(e => {
    console.error(e)
})
