const request = require('./request')

let statTimeStamp = new Date('2021-08-11 00:00:00 +0800').getTime()
let nowTimeStamp = new Date('2021-08-16 00:00:00 +0800').getTime()
let step_ms = 24 * 60 * 60 * 1000


const mock = (async () => {

    console.log(statTimeStamp, nowTimeStamp)
    while (statTimeStamp< nowTimeStamp) {
        console.log(statTimeStamp)

        let data = {
        deviceType:"PC",
        OS:"Linux",
        OSVersion:"",
        screenHeight:1200,
        screenWidth:1920,
        language:"en",
        netWork:"4g",
        orientation:"横屏",
        browser:"Chrome",
        browserInfo:"Chrome（版本: 92.0.4515.131&nbsp;&nbsp;内核: Blink）",
        user_id:"PWNnPecyFp",
        time: new Date(statTimeStamp),
        app_id:"byte-monitor-docs"
    }
        await request.post('/device/upload',data)
        statTimeStamp += step_ms
    }


})

mock()