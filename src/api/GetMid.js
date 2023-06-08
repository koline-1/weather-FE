import apiInfo from '../json/apiInfo.json';

const GetMid = async( queryKey ) => {
    const location = queryKey[2];
    const serviceId = queryKey[1];

    const date = new Date();
    let hour = date.getHours();

    if (hour < 6) {
        date.setDate(date.getDate-1);
        hour = '18';
    } else if (6 <hour && hour < 18) {
        hour = '06';
    } else {
        hour = '18';
    }

    const month = date.getMonth()+1;
    const day = date.getDate();

    const baseDateTime = `${date.getFullYear()}${month < 10 ? '0'+month : month}${day < 10 ? '0'+day : day}${hour}00`;

    const url = `${apiInfo.address}/${apiInfo.mid.service}/${apiInfo.mid[serviceId]}?${apiInfo.parameters}&serviceKey=${apiInfo.key}&` +
                (serviceId === 'expectation' ? `stnId` : `regId`) +`=${location}&tmFc=${baseDateTime}`;

    const json = await (await fetch(url)).json();

    const data = json.response.body.items.item[0];

    if (serviceId === 'expectation') {
        data.stnId = location;
    } else {
        data.regId = location;
    }

    return data;
}

export default GetMid;