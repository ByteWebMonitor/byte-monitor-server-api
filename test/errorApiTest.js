const request = require('./request')

request.post('/error/getRecentXMinNums', {
    app_id: '114514114514abc',
    xMin: 10
}).then( res=> {
    console.log(res.data)
}).catch(e => {
    console.error(e)
})


request.post('/error/getRecentXMinNums', {
    app_id: '114514114514abc',
    xMin: 60000000000000
}).then( res=> {
    console.log(res.data)
}).catch(e=>{
    console.error(e)
})


request.post('/error/getAllItemList', {
    app_id: '114514114514abc',
    skip: 0,
    limit: 3
}).then( res=> {
    console.log(res.data)
})