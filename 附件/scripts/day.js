
let getcity = async () => {
    let data = await request({url:"https://searchplugin.csdn.net/api/v1/ip/get", method: "GET"})
    let json = JSON.parse(data)
    console.log(json)
    if (json) {
        if (json.code == 200) {
            console.log(json.data.address.split(" "))
            return json.data.address.split(" ")[2]
        }
    }
    return "未知"
}
let getCityCode = async (city) => {
    let data = await request({
        url: "http://apis.juhe.cn/simpleWeather/cityList?key=eae2b7e10d28b42fa53bbdfac7dcc89e",
        method: "GET"
    })
    let json = JSON.parse(data)
    if (json) {
        if (json.error_code == 0) {
            for (let i = 0; i < json.result.length; i++) {
                if (json.result[i].city == city) {
                    console.log(json.result[i].id)
                    return json.result[i].id
                }
            }
        }
    }
    return ""

}
let getweather = async (code) => {
    let data = await request({
        url: "http://apis.juhe.cn/simpleWeather/query?city=1749&key=eae2b7e10d28b42fa53bbdfac7dcc89e",
        method: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
    let json = JSON.parse(data)
    console.log(json)
    if (json) {
        if (json.error_code == 0) {
            let data = json.result.realtime
            return {
                info: data.info,
                temperature: data.temperature,
                wind: data.direct+" "+data.power
            }
        }
    }
    return {
        info: "未知",
        temperature: "未知",
        wind: "未知"
    }
}
module.exports = async () =>{
    let city = await getcity()
    let code = await getCityCode(city)
    let weather = await getweather(code)
    return {
        city: city,
        weather: weather.info,
        temperature: weather.temperature,
        wind: weather.wind
    }
}