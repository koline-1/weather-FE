import { useQuery } from "react-query";


export default function useList(path, serviceId, page, locationCode, nxValue, nyValue) {

    const url = `http://localhost:8080/${path}-term/${serviceId}/list?size=15&page=${Number(page)-1}`;
    const sub_url = locationCode || (nxValue && nyValue) ? path === 'mid' ? `&location=${locationCode}` : `&nxValue=${nxValue}&nyValue=${nyValue}` : '';

    const getData = async() => {
        return await (await fetch(url + sub_url)).json();
    }

    const keys = [path, serviceId, page, locationCode, nxValue, nyValue, "list"];
    const queryKey = keys.filter((item) => item);

    const { data, isLoading, refetch } = useQuery(queryKey, getData);

    return { data, isLoading, refetch }
}