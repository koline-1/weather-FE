import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import apiInfo from '../../apiInfo.json';

export default function useRead (path, serviceId, nxValue, nyValue) {
    
    const [result, setResult] = useState("");

    const queryKey = [path, serviceId, nxValue, nyValue];

    const getService = () => {
        if (serviceId === "extra") {
            return GET_SHORT_TERM_EXTRA(queryKey);
        }
    }

    const { data, isLoading } = useQuery(queryKey, getService);

    useEffect(() => {
        if (!isLoading) {
            setResult(data);
        }
    }, [data, isLoading])

    return result;
}


const GET_SHORT_TERM_EXTRA = async( queryKey ) => {
    const location = queryKey[2];
    const nxValue = location[0];
    const nyValue = location[1];
    const date = new Date();
    const min = date.getMinutes();

    if (min < 45) {
        date.setHours(date.getHours() - 1);
    }

    const month = date.getMonth()+1;
    const day = date.getDate();
    const hour = date.getHours();

    const baseDate = `${date.getFullYear()}${month < 10 ? '0'+month : month}${day < 10 ? '0'+day : day}`;
    const baseTime = `${hour < 10 ? '0'+hour : hour}${min < 10 ? '0'+min : min}`;

    const url = `${apiInfo.url}&nx=${nxValue}&ny=${nyValue}&base_date=${baseDate}&base_time=${baseTime}`;
    const json = await(await fetch(url)).json();

    const allData = json.response.body.items.item;
    const currentData = [];
    const firstHour = date.getHours()+1+'00';

    [].forEach.call(allData, (each) => {
        if (each.fcstTime === firstHour) {
            currentData.push(each);
        }
    })

    return currentData;
}