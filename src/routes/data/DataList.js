import DataListView from '../../components/DataListView';
import Pagination from '../../components/Pagination';

const { useEffect, useState } =  require('react');
const { useParams, useLocation } =  require('react-router-dom');
const ButtonLink = require('../../components/ButtonLink').default;

export default function DataList() {
    const [data, setData] = useState();
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const { path, serviceId } = useParams();
    
    const loc = useLocation();
    const page = new URLSearchParams(loc.search).get("page");

    useEffect(() => {
        const getData = async() => {
            const res = await (await fetch(`http://localhost:8080/${path}-term/${serviceId}/count`)).json();
            setCount(res.count);
            const response = await (await fetch(`http://localhost:8080/${path}-term/${serviceId}/list?size=10&page=${Number(page)-1}`)).json();
            setData(response);
            setLoading(false);
        }
        getData();
    }, [serviceId, path, page])

    return (
        <>
            {loading ? <></> : (
                <div>
                    <h4>총 <strong>{count}</strong>개의 저장된 데이터가 있습니다.</h4>
                    <DataListView path={path} serviceId={serviceId} data={data} />
                    <Pagination page={page} path={path} serviceId={serviceId} totalCount={count} />
                    <div>
                        <ButtonLink to={`/data/${path}`} text={"뒤로"} />
                        <ButtonLink to={`/data/${path}/${serviceId}/location`} text={"지역별 조회"} />
                        <ButtonLink to={path === 'mid' ? `/mid/${serviceId}/location` : `/short/location`} text={"실시간 조회"} />
                    </div>
                </div>
            )}
        </>
    );
}