import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import ButtonLink from "../../components/ButtonLink";
import DataListView from '../../components/DataListView';


export default function DataListByLocation() {
    const { path, serviceId, nxValue, nyValue } = useParams();
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const getData = async() => {
            const response = await (await fetch(`http://localhost:8080/${path}-term/${serviceId}/list?size=10&page=0&nxValue=${nxValue}&nyValue=${nyValue}`)).json();
            setData(response);
            setLoading(false);
        }
        getData();
    }, [path, serviceId, nxValue, nyValue])
       
    return (
        <>
            { loading ? <></> : (
                <>
                    <DataListView path={path} serviceId={serviceId} data={data} />
                    <ButtonLink to={`/data/${path}/${serviceId}/location`} text={"뒤로"} />
                    <ButtonLink to={`/short/${serviceId}/${nxValue}/${nyValue}`} text={"실시간 조회"} />
                </>
            )}
        </>
    );
}