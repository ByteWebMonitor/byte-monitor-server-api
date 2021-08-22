const request = require('./request')

// request.post('/performance/getRecentXMinNums', {
//     app_id: '114514114514abc',
//     xMin: 10
// }).then( res=> {
//     console.log(res.data)
// })


// request.post('/performance/getRecentXMinNums', {
//     app_id: '114514114514abc',
//     xMin: 60000000000000
// }).then( res=> {
//     console.log(res.data)
// })


// request.post('/performance/getAllItemList', {
//     app_id: '114514114514abc',
//     skip: 0,
//     limit: 30
// }).then( res=> {
//     console.log(res.data)
// })


request.post('/performance/statXMinAvg', {
    app_id: '114514114514abc',
    xMin: 10000
}).then( res=> {
    console.log(res.data)
})

