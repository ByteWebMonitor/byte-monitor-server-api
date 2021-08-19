const request = require('./request')

request.post('/performance/getRecentXMinNums', {
    xMin: 10
}).then( res=> {
    console.log(res.data)
})


request.post('/performance/getRecentXMinNums', {
    xMin: 60000000000000
}).then( res=> {
    console.log(res.data)
})