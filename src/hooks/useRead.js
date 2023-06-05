import { useEffect, useState } from "react";
import { useQuery } from "react-query";

export default function useRead(path, serviceId, dataId) {

    const [result, setResult] = useState();

    const getData = async() => {
        return await (await fetch(`http://localhost:8080/${path}-term/${serviceId}/${dataId}`)).json();
    }

    const { data, isLoading } = useQuery([path, serviceId, dataId], getData);

    useEffect(() => {
        if (!isLoading && data !== result) {
            return setResult(data);
        }
    }, [isLoading, data, result])

    return result;
}