import { useParams } from "react-router-dom";
import services from '../../json/services.json';
import Title from "../../components/Title";
import useRead from "../../hooks/useRead";
import DataUpdateView from "../../components/DataUpdateView";

export default function DataUpdate() {
    const { path, serviceId, dataId } = useParams();
    const data = useRead(path, serviceId, dataId);

    return (
        <>
            <Title title={`${services[path+"Term"][serviceId].title} 저장 데이터 조회`} />
            {!data ? <></> : <DataUpdateView path={path} serviceId={serviceId} data={data} dataId={dataId} />}
        </>
    )
}