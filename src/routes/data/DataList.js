import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import DataListView from '../../components/DataListView';
import Pagination from '../../components/Pagination';
import ButtonLink from '../../components/ButtonLink';
import layout from '../../styles/layout/Layout.module.css';
import styles from '../../styles/data/DataList.module.css';
import Title from '../../components/Title';
import services from '../../services.json';

export default function DataList() {
    const [data, setData] = useState();
    const [count, setCount] = useState("");
    const [loading, setLoading] = useState(true);
    const { path, serviceId } = useParams();
    
    const loc = useLocation();
    const page = new URLSearchParams(loc.search).get("page") ?? "1";

    const title = `${services[path+"Term"][serviceId].title} 저장 데이터`;
    
    useEffect(() => {
        document.title = title;
        const getData = async() => {
            const res = await (await fetch(`http://localhost:8080/${path}-term/${serviceId}/count`)).json();
            setCount(res.count);
            const response = await (await fetch(`http://localhost:8080/${path}-term/${serviceId}/list?size=15&page=${Number(page)-1}`)).json();
            setData(response);
            setLoading(false);
        }
        getData();
    }, [serviceId, path, page, title])

    return (
        <>
            <Title title={title} />
            <div className={layout.sub_content}>
                {loading ? <></> : (
                    <div>
                        <h4 className={styles.count}>총 <strong>{count}</strong>개의 저장된 데이터가 있습니다.</h4>
                        <DataListView path={path} serviceId={serviceId} data={data} byLocation={false} page={page} />
                    </div>
                )}
            </div>
            <Pagination page={page} path={path} serviceId={serviceId} totalCount={count} byLocation={false} />
            <div className={layout.sub_button}>
                <ButtonLink to={`/data/${path}`} text={"뒤로"} />
                <ButtonLink to={`/data/${path}/${serviceId}/location`} text={"지역별 조회"} />
                <ButtonLink to={path === 'mid' ? `/mid/${serviceId}/location` : `/short/location`} text={"실시간 조회"} />
            </div>
        </>
    );
}