import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import GetMid from '../api/GetMid';
import GetShortExpectation from '../api/GetShortExpectation';
import GetShortExtra from '../api/GetShortExtra';
import GetShortStatus from '../api/GetShortStatus';

export default function useRead (path, serviceId, location) {
    
    const [result, setResult] = useState("");

    const queryKey = [path, serviceId, location];

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

    useEffect(() => {
        if (!isLoading && data !== result) {
            setResult(data);
        }
    }, [data, isLoading, result])

    return result;
}

