const request = require('./request')

// request.post('/device/getRecentXMinNums', {
//     app_id: '114514114514abc',
//     xMin: 10
// }).then( res=> {
//     console.log(res.data)
// })


// request.post('/device/getRecentXMinNums', {
//     app_id: '114514114514abc',
//     xMin: 60000000000000
// }).then( res=> {
//     console.log(res.data)
// })


// request.post('/device/getAllItemList', {
//     app_id: '114514114514abc',
//     skip: 0,
//     limit: 3
// }).then( res=> {
//     console.log(res.data)
// })


// request.post('/device/statXMinRecentPvBrowserRatio', {
//     app_id: '114514114514abc',
//     xMin: 60000000000000
// }).then( res=> {
//     console.log(res.data)
// })


// request.post('/device/statXMinRecentPvOsRatio', {
//     app_id: '114514114514abc',
//     xMin: 60000000000000
// }).then( res=> {
//     console.log(res.data)
// })

request.post('/device/statXDayPerDayPv', {
    app_id: '114514114514abc',
    xDay: 20
}).then( res=> {
    console.log(res.data)
}).catch(e=>{
    console.log(e)
})

// request.post('/device/statXHourPerHourPv', {
//     app_id: '114514114514abc',
//     xHour: 72
// }).then( res=> {
//     console.log(res.data)
// }).catch(e=>{
//     console.log(e)
// })