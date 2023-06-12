import { useQuery } from 'react-query';
import GetMid from '../api/GetMid';
import GetShortExpectation from '../api/GetShortExpectation';
import GetShortExtra from '../api/GetShortExtra';
import GetShortStatus from '../api/GetShortStatus';

export default function useGet (path, serviceId, location) {

    // 10분마다 queryKey 갱신하여 데이터 받아옴
    const date = new Date();

    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDay();
    const hour = date.getHours();
    const minute = Math.floor(date.getMinutes()/10)*10;

    const time = `${year}${month <10 ? '0'+month : month}${day <10 ? '0'+day : day}${hour <10 ? '0'+hour : hour}${minute <10 ? '0'+minute : minute}`;

    const queryKey = [path, serviceId, location, time];

    const getService = () => {
        if (path === 'mid') {
            return GetMid(queryKey)
        } else {
            if (serviceId === 'expectation') {
                return GetShortExpectation(queryKey);
            } else if (serviceId === 'extra') {
                return GetShortExtra(queryKey);
            } else {
                return GetShortStatus(queryKey);
            }
        }
    }

    const { data, isLoading } = useQuery(queryKey, getService);

    return { data, isLoading };
}

