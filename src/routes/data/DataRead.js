import { useLocation, useParams } from "react-router-dom";
import ButtonLink from "../../components/ButtonLink";
import DataView from '../../components/DataView';
import layout from '../../styles/layout/Layout.module.css';
import services from '../../json/services.json';
import Title from "../../components/Title";
import useRead from "../../hooks/useRead";
import useDelete from "../../hooks/useDelete";
import { useEffect } from "react";

export default function DataRead() {
    const { path, serviceId, dataId } = useParams();
    
    const loc = useLocation();
    const page = new URLSearchParams(loc.search).get("page") ?? "1";
    const byLocation = JSON.parse(new URLSearchParams(loc.search).get("byLocation")) ?? false;
    
    const { data, isLoading } = useRead(path, serviceId, dataId);
    const updatedData = loc.state;

    const { mutate, handleResult } = useDelete(path, serviceId, data, byLocation, page);

    useEffect(() => {
        handleResult();
    }, [handleResult])

    return (
        <>
            <Title title={`${services[path+"Term"][serviceId].title} 저장 데이터 조회`} />
            <div className={layout.sub_content}>
                {!data || isLoading ? <></> : <DataView path={path} data={updatedData ?? data} serviceId={serviceId} isViaData={true} />}
            </div>
            <div className={layout.sub_button}>
                {!data ? <></> : (
                    <>
                        <ButtonLink 
                            to={`/data/${path}/${serviceId}` + (byLocation ? `/location` + (path === 'mid' ? (serviceId === 'expectation' ? `/${data.stnId}` : `/${data.regId}`) 
                                : `/${data.nxValue}/${data.nyValue}`) : ``) + `?page=${page}`} 
                            text={"뒤로"} 
                        />
                        <ButtonLink to={`/data/${path}/${serviceId}/${dataId}/update?byLocation=${byLocation}&page=${page}`} text='수정' />
                        <button type='button' onClick={mutate}>삭제</button>
                    </>
                )}
            </div>
        </>
    );
}