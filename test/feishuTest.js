    const axios=require('axios')
    const Robot = require('byte-monitor-feishu-robot/index');
    const webhook = "https://open.feishu.cn/open-apis/bot/v2/hook/118bfe1d-683d-4a13-a797-f9596a80273e"
    const Rebot = Robot({ webhook });

const feishu = (async () => {


    const body={
        "app_id": "114514114514abc",
        "xMin": 60000
      }
    const resutl = await axios.post('https://qcgtsp.app.cloudendpoint.cn/api/device/statXMinRecentPvBrowserRatio', body)
    //   res=>{
    Rebot.sendRickText(resutl.data[0].browser, resutl.data[0].num, 'en_us')


})

feishu()