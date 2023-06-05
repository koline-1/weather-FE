import apiInfo from '../json/apiInfo.json';
import GetShortVersion from './GetShortVersion';

const GetShortExtra = async( queryKey ) => {
    const location = queryKey[2];
    const nxValue = location[0];
    const nyValue = location[1];
    const path = queryKey[0];

    const date = new Date();
    const minute = date.getMinutes();

    if (minute < 45) {
        date.setHours(date.getHours() - 1);
    }

    const month = date.getMonth()+1;
    const day = date.getDate();
    const hour = date.getHours();

    const baseDate = `${date.getFullYear()}${month < 10 ? '0'+month : month}${day < 10 ? '0'+day : day}`;
    const baseTime = `${hour < 10 ? '0'+hour : hour}${minute < 10 ? '0'+minute : minute}`;

    const url = `${apiInfo.address}/${apiInfo.short.service}/${apiInfo.short.extra}?${apiInfo.parameters}` +
                `&serviceKey=${apiInfo.key}&nx=${nxValue}&ny=${nyValue}&base_date=${baseDate}&base_time=${baseTime}`;
    const json = await(await fetch(url)).json();

    const rawData = json.response.body.items.item;
    const processedData = [];
    const firstHour = date.getHours()+1+'00';

    if (path === 'main') {
        [].forEach.call(rawData, (each) => {
            if (each.fcstTime === firstHour) {
                processedData.push(each);
            }
        })
    } else {
        const version = await GetShortVersion('VSRT', baseDate+baseTime);
        for (let i = 0; i < 6; i++) {
            const entity = {...SHORT_TERM_EXTRA};
            entity.baseDate = baseDate;
            entity.baseTime = baseTime;
            entity.nxValue = nxValue;
            entity.nyValue = nyValue;
            entity.version = version;
            for (let j=i; j < 60; j=j+6){
                const tmp = rawData[j];
                switch (tmp.category) {
                    case "LGT":
                        entity.forecastDate = tmp.fcstDate;
                        entity.forecastTime = tmp.fcstTime;
                        entity.lightning = tmp.fcstValue;
                        break;
                    case "PTY":
                        entity.rainType = tmp.fcstValue;
                        break;
                    case "T1H":
                        entity.temperature = tmp.fcstValue;
                        break;
                    case "RN1":
                        entity.hourPrecipitation = tmp.fcstValue;
                        break;
                    case "SKY":
                        entity.skyStatus = tmp.fcstValue;
                        break;
                    case "UUU":
                        entity.horizontalWind = tmp.fcstValue;
                        break;
                    case "VVV":
                        entity.verticalWind = tmp.fcstValue;
                        break;
                    case "REH":
                        entity.humidity = tmp.fcstValue;
                        break;
                    case "VEC":
                        entity.windDirection = tmp.fcstValue;
                        break;
                    case "WSD":
                        entity.windSpeed = tmp.fcstValue;
                        break;
                    default:
                        break;
                }
            }
            processedData.push(entity);
        }
    }

    return processedData;
}

const SHORT_TERM_EXTRA = {
    "baseDate": "",
    "baseTime": "",
    "forecastDate": "",
    "forecastTime": "",
    "horizontalWind": "",
    "hourPrecipitation": "",
    "humidity": "",
    "lightning": "",
    "nxValue": "",
    "nyValue": "",
    "rainType": "",
    "skyStatus": "",
    "temperature": "",
    "version": "",
    "verticalWind": "",
    "windDirection": "",
    "windSpeed": "",
}

export default GetShortExtra;