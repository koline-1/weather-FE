import { useQuery } from "react-query";

export default function useCount(path, serviceId, page, locationCode, nxValue, nyValue) {

    const count_url = `http://localhost:8080/${path}-term/${serviceId}/count`;
    const count_sub_url = locationCode || (nxValue && nyValue) ? path === 'mid' ? `?location=${locationCode}` : `?nxValue=${nxValue}&nyValue=${nyValue}` : '';

    const getCount = async() => {
        const res = await (await fetch(count_url + count_sub_url)).json();
        return res.count;
    }

    const keys = [path, serviceId, page, locationCode, nxValue, nyValue, "count"];
    const queryKey = keys.filter((item) => item);
    const { data: count, isLoading, refetch } = useQuery(queryKey, getCount);

    return { count, isLoading, refetch }
}