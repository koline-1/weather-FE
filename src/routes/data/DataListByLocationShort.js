import { useLocation, useParams } from "react-router-dom"
import ButtonLink from "../../components/ButtonLink";
import DataListView from '../../components/DataListView';
import Pagination from "../../components/Pagination";
import layout from '../../styles/layout/Layout.module.css';
import Title from "../../components/Title";
import services from '../../json/services.json';
import useCount from "../../hooks/useCount";

export default function DataListByLocation() {
    const { path, serviceId, nxValue, nyValue } = useParams();
    
    const loc = useLocation();
    const page = new URLSearchParams(loc.search).get("page") ?? "1";
    
    const { count, isLoading } =  useCount(path, serviceId, page, '', nxValue, nyValue);
       
    return (
        <>
            <Title title={`${services[path+'Term'][serviceId].title} 저장 데이터 지역별 조회`} />
            { isLoading ? <></> : (
                <>
                    <div className={layout.sub_content}>
                        <DataListView path={path} serviceId={serviceId} byLocation={true} page={page} count={count} nxValue={nxValue} nyValue={nyValue} />
                    </div>
                    <Pagination page={page} path={path} serviceId={serviceId} totalCount={count} byLocation={true} nxValue={nxValue} nyValue={nyValue} />
                </>
            )}
            <div className={layout.sub_button}>
                <ButtonLink to={`/data/${path}/${serviceId}/location`} text={"뒤로"} />
                <ButtonLink to={`/short/${serviceId}/${nxValue}/${nyValue}`} text={"실시간 조회"} />
            </div>
        </>
    );
}