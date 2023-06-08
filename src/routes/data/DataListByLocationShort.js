import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom"
import ButtonLink from "../../components/ButtonLink";
import DataListView from '../../components/DataListView';
import Pagination from "../../components/Pagination";
import layout from '../../styles/layout/Layout.module.css';
import Title from "../../components/Title";
import services from '../../json/services.json';
import styles from '../../styles/data/DataList.module.css';

export default function DataListByLocation() {
    const { path, serviceId, nxValue, nyValue } = useParams();
    const [data, setData] = useState();
    const [count, setCount] = useState("");
    const [loading, setLoading] = useState(true);
    
    const loc = useLocation();
    const page = new URLSearchParams(loc.search).get("page") ?? "1";
    
    useEffect(() => {
        const getData = async() => {
            const res = await (await fetch(`http://localhost:8080/${path}-term/${serviceId}/count?nxValue=${nxValue}&nyValue=${nyValue}`)).json();
            setCount(res.count);
            const response = await (await fetch(`http://localhost:8080/${path}-term/${serviceId}/list?size=15&page=${Number(page)-1}&nxValue=${nxValue}&nyValue=${nyValue}`)).json();
            setData(response);
            setLoading(false);
        }
        getData();
    }, [path, serviceId, nxValue, nyValue, page])
       
    return (
        <>
            <Title title={`${services[path+'Term'][serviceId].title} 저장 데이터 지역별 조회`} />
            { loading ? <></> : (
                <div className={layout.sub_content}>
                    <h4 className={styles.count}>총 <strong>{count}</strong>개의 저장된 데이터가 있습니다.</h4>
                    <DataListView path={path} serviceId={serviceId} data={data} byLocation={true} page={page} count={count} />
                </div>
            )}
            <Pagination page={page} path={path} serviceId={serviceId} totalCount={count} byLocation={true} nxValue={nxValue} nyValue={nyValue} />
            <div className={layout.sub_button}>
                <ButtonLink to={`/data/${path}/${serviceId}/location`} text={"뒤로"} />
                <ButtonLink to={`/short/${serviceId}/${nxValue}/${nyValue}`} text={"실시간 조회"} />
            </div>
        </>
    );
}