import { useQuery } from "react-query";

export default function useRead(path, serviceId, dataId) {

    const getData = async() => {
        return await (await fetch(`http://localhost:8080/${path}-term/${serviceId}/${dataId}`)).json();
    }

    const { data, isLoading } = useQuery([path, serviceId, dataId], getData);

    return { data, isLoading };
}