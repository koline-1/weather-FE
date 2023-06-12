import { useParams, useLocation } from 'react-router-dom';
import DataListView from '../../components/DataListView';
import Pagination from '../../components/Pagination';
import ButtonLink from '../../components/ButtonLink';
import layout from '../../styles/layout/Layout.module.css';
import Title from '../../components/Title';
import services from '../../json/services.json';
import useCount from '../../hooks/useCount';

export default function DataList() {
    const { path, serviceId } = useParams();
    
    const loc = useLocation();
    const page = new URLSearchParams(loc.search).get("page") ?? "1";
    const isUpdated = JSON.parse(new URLSearchParams(loc.search).get("isUpdated")) ?? false;

    const { count, isLoading, refetch } = useCount(path, serviceId, page);

    if (isUpdated) {
        refetch();
    }

    return (
        <>
            <Title title={`${services[path+"Term"][serviceId].title} 저장 데이터`} />
            {isLoading ? <></> : (
                <>
                    <div className={layout.sub_content}>
                        <DataListView path={path} serviceId={serviceId} byLocation={false} page={page} count={count} />
                    </div>
                    <Pagination page={page} path={path} serviceId={serviceId} totalCount={count} byLocation={false} />
                </>
            )}
            <div className={layout.sub_button}>
                <ButtonLink to={`/data/${path}`} text={"뒤로"} />
                <ButtonLink to={`/data/${path}/${serviceId}/location`} text={"지역별 조회"} />
                <ButtonLink to={`/${path}/${serviceId}/location`} text={"실시간 조회"} />
            </div>
        </>
    );
}