import apiInfo from '../json/apiInfo.json';
import GetShortVersion from './GetShortVersion';

const GetShortStatus = async( queryKey ) => { 
    const location = queryKey[2];
    const nxValue = location[0];
    const nyValue = location[1];

    const date = new Date();
    const minute = date.getMinutes();

    if (minute < 40) {
        date.setHours(date.getHours() - 1);
    }

    const month = date.getMonth()+1;
    const day = date.getDate();
    const hour = date.getHours();

    const baseDate = `${date.getFullYear()}${month < 10 ? '0'+month : month}${day < 10 ? '0'+day : day}`;
    const baseTime = `${hour < 10 ? '0'+hour : hour}${minute < 10 ? '0'+minute : minute}`;

    const url = `${apiInfo.address}/${apiInfo.short.service}/${apiInfo.short.status}?${apiInfo.parameters}` +
                `&serviceKey=${apiInfo.key}&nx=${nxValue}&ny=${nyValue}&base_date=${baseDate}&base_time=${baseTime}`;
    const json = await (await fetch(url)).json();

    const rawData = json.response.body.items.item;

    const entity = SHORT_TERM_STATUS;

    entity.baseDate = baseDate;
    entity.baseTime = baseTime;
    entity.nxValue = nxValue;
    entity.nyValue = nyValue;

    for (let i = 0; i < rawData.length; i++) {
        const tmp = rawData[i];
        switch(tmp.category) {
            case "PTY":
                entity.rainType = tmp.obsrValue;
                break;
            case "REH":
                entity.humidity  = tmp.obsrValue;
                break;
            case "RN1":
                entity.hourPrecipitation  = tmp.obsrValue;
                break;
            case "T1H":
                entity.temperature  = tmp.obsrValue;
                break;
            case "UUU":
                entity.horizontalWind  = tmp.obsrValue;
                break;
            case "VVV":
                entity.verticalWind  = tmp.obsrValue;
                break;
            case "VEC":
                entity.windDirection  = tmp.obsrValue;
                break;
            case "WSD":
                entity.windSpeed  = tmp.obsrValue;
                break;
            default:
                break;
        }
    }
    const version = await GetShortVersion('ODAM', entity.baseDate+entity.baseTime);
    entity.version = version;

    return entity;
}

const SHORT_TERM_STATUS = {
    "baseDate": "",
    "baseTime": "",
    "horizontalWind": "",
    "hourPrecipitation": "",
    "humidity": "",
    "nxValue": "",
    "nyValue": "",
    "rainType": "",
    "temperature": "",
    "version": "",
    "verticalWind": "",
    "windDirection": "",
    "windSpeed": "",
}

export default GetShortStatus;