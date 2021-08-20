const request = require('./request')

request.post('/device/getRecentXMinNums', {
    xMin: 10
}).then( res=> {
    console.log(res.data)
})


request.post('/device/getRecentXMinNums', {
    xMin: 60000000000000
}).then( res=> {
    console.log(res.data)
})


request.post('/device/getAllItemList', {
    skip: 0,
    limit: 3
}).then( res=> {
    console.log(res.data)
})