const request = require('./request')

request.post('/error/getRecentXMinNums', {
    xMin: 10
}).then( res=> {
    console.log(res.data)
}).catch(e => {
    console.error(e)
})


request.post('/error/getRecentXMinNums', {
    xMin: 60000000000000
}).then( res=> {
    console.log(res.data)
}).catch(e=>{
    console.error(e)
})


request.post('/error/getAllItemList', {
    skip: 0,
    limit: 3
}).then( res=> {
    console.log(res.data)
})