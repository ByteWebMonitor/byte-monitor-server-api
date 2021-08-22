const request = require('./request')





const mock = (async () => {
    let statTimeStamp = new Date(2021,7,10).getTime()
    let nowTimeStamp = new Date().getTime()
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
        statTimeStamp += 24*60*60 * 1000
    }


})

mock()