import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import ButtonLink from "../../components/ButtonLink";
import DataView from '../../components/DataView';
import layout from '../../styles/layout/Layout.module.css';
import services from '../../services.json';
import Title from "../../components/Title";


export default function DataRead() {
    const { path, serviceId, dataId } = useParams();
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    
    const loc = useLocation();
    const page = new URLSearchParams(loc.search).get("page") ?? "1";
    const byLocation = JSON.parse(new URLSearchParams(loc.search).get("byLocation")) ?? false;

    useEffect(() => {
        const getData = async() => {
            const resonse = await (await fetch(`http://localhost:8080/${path}-term/${serviceId}/${dataId}`)).json();
            setData(resonse);
            setLoading(false);
        }
        getData();
    }, [path, serviceId, dataId])

    return (
        <>
            <Title title={`${services[path+"Term"][serviceId].title} 저장 데이터 조회`} />
            <div className={layout.sub_content}>
                {loading ? <></> : <DataView path={path} data={data} serviceId={serviceId} isViaData={true} />}
            </div>
            <div className={layout.sub_button}>
                {loading ? <></> :
                    <ButtonLink 
                        to={`/data/${path}/${serviceId}` + (byLocation ? `/location` + (path === 'mid' ? (serviceId === 'expectation' ? `/${data.stnId}` : `/${data.regId}`) 
                            : `/${data.nxValue}/${data.nyValue}`) : ``) + `?page=${page}`} 
                        text={"뒤로"} 
                    />
                }
            </div>
        </>
    );
}