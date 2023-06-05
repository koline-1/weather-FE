import apiInfo from '../json/apiInfo.json';

const GetShortVersion = async(serviceCode, baseDateTime) => {
    const url = `${apiInfo.address}/${apiInfo.short.service}/${apiInfo.short.version}?${apiInfo.parameters}&serviceKey=${apiInfo.key}&ftype=${serviceCode}&basedatetime=${baseDateTime}`;
    const json = await (await fetch(url)).json();

    return json.response.body.items.item[0].version;
}

export default GetShortVersion;