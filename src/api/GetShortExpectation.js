import apiInfo from '../json/apiInfo.json';
import GetShortVersion from './GetShortVersion';

const GetShortExpectation = async( queryKey ) => {
    const location = queryKey[2];
    const nxValue = location[0];
    const nyValue = location[1];

    const date = new Date();

    const releaseTimeArray = ['2', '5', '8', '11', '14', '17', '20', '23'];

    let hour = date.getHours();
    const minute = date.getMinutes();
    const quotient = Math.floor((hour - 2) / 3);
    const remainder = (hour - 2) % 3;

    if (remainder < 0 || (remainder === 0 && quotient === 0 && minute < 11)) {
        date.setDate(date.getDate()-1);
        hour = '23';
    } else if (remainder >= 0 && (quotient !== 0 && minute < 11)) {
        hour = releaseTimeArray[quotient - 1];
    } else if (quotient === 0 && ((remainder === 0 && minute >= 11) || (remainder > 0 && minute < 11))) {
        hour = '2';
    } else {
        hour = releaseTimeArray[quotient];
    }

    const month = date.getMonth()+1;
    const day = date.getDate();

    const baseDate = `${date.getFullYear()}${month < 10 ? '0'+month : month}${day < 10 ? '0'+day : day}`;
    const baseTime = `${hour < 10 ? '0'+hour : hour}${minute < 10 ? '0'+minute : minute}`;

    const url = `${apiInfo.address}/${apiInfo.short.service}/${apiInfo.short.expectation}?${apiInfo.parameters}` +
                `&serviceKey=${apiInfo.key}&nx=${nxValue}&ny=${nyValue}&base_date=${baseDate}&base_time=${baseTime}`;
    const json = await(await fetch(url)).json();

    const rawData = json.response.body.items.item;
    const processedData = [];
    let entity = {...SHORT_TERM_EXPECTATION};

    const version = await GetShortVersion('SHRT', baseDate+baseTime);
    
    for (let i = 0; i < rawData.length; i++) {
        const tmp = rawData[i];

        switch(tmp.category){
            case "TMP":
                if (i !== 0) {
                    entity.version = version;
                    processedData.push(entity);
                    entity = {...SHORT_TERM_EXPECTATION};
                }
                entity.baseDate = baseDate;
                entity.baseTime = baseTime;
                entity.forecastDate = tmp.fcstDate;
                entity.forecastTime = tmp.fcstTime;
                entity.nxValue = nxValue;
                entity.nyValue = nyValue;
                entity.hourTemperature = tmp.fcstValue;
                break;
            case "UUU":
                entity.horizontalWind = tmp.fcstValue;
                break;
            case "VVV":
                entity.verticalWind = tmp.fcstValue;
                break;
            case "WSD":
                entity.windSpeed = tmp.fcstValue;
                break;
            case "VEC":
                entity.windDirection = tmp.fcstValue;
                break;
            case "SKY":
                entity.skyStatus = tmp.fcstValue;
                break;
            case "REH":
                entity.humidity = tmp.fcstValue;
                break;
            case "POP":
                entity.rainPossibility = tmp.fcstValue;
                break;
            case "PTY":
                entity.rainType = tmp.fcstValue;
                break;
            case "PCP":
                entity.hourPrecipitation = tmp.fcstValue;
                break;
            case "SNO":
                entity.snowDepth = tmp.fcstValue;
                break;
            case "WAV":
                entity.waveHeight = tmp.fcstValue;
                break;
            case "TMN":
                entity.minimumTemperature = tmp.fcstValue;
                break;
            case "TMX":
                entity.maximumTemperature = tmp.fcstValue;
                break;
            default:
                break;
        }
    }

    return processedData;
}

const SHORT_TERM_EXPECTATION = {
"baseDate":"",
"baseTime":"",
"date":"",
"forecastDate":"",
"forecastTime":"",
"horizontalWind":"",
"hourPrecipitation":"",
"hourTemperature":"",
"humidity":"",
"id":"",
"maximumTemperature":"",
"minimumTemperature":"",
"nxValue":"",
"nyValue":"",
"rainPossibility":"",
"rainType":"",
"skyStatus":"",
"snowDepth":"",
"version":"",
"verticalWind":"",
"waveHeight":"",
"windDirection":"",
"windSpeed":"",
}

export default GetShortExpectation;