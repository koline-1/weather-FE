import { useLocation, useParams } from "react-router-dom";
import ButtonLink from "../../components/ButtonLink";
import layout from '../../styles/layout/Layout.module.css';
import services from '../../json/services.json';
import Title from "../../components/Title";
import useRead from "../../hooks/useRead";
import DataUpdateView from "../../components/DataUpdateView";

export default function DataUpdate() {
    const { path, serviceId, dataId } = useParams();
    const data = useRead(path, serviceId, dataId);

    const loc = useLocation();
    const page = new URLSearchParams(loc.search).get("page") ?? "1";
    const byLocation = JSON.parse(new URLSearchParams(loc.search).get("byLocation")) ?? false;

    // const updateData = () => {
    //     data.wfSv = 'testtest';
    //     const test = async() => {
    //         const json = await (await fetch(`http://localhost:8080/${path}-term/${serviceId}/${dataId}`, {
    //             method: "PATCH",
    //             headers: {
    //                 "Content-Type": "application/json; charset=utf-8"
    //             },
    //             body: JSON.stringify({
    //                 data : data
    //             }),
    //         })).json();
    //         console.log('json = ', json)
    //     }
    //     test();
    // };

    return (
        <>
            <Title title={`${services[path+"Term"][serviceId].title} 저장 데이터 조회`} />
            <div className={layout.sub_content}>
                {!data ? <></> : <DataUpdateView path={path} serviceId={serviceId} data={data} />}
            </div>
            <div className={layout.sub_button}>
                {!data ? <></> : (
                    <>
                        <ButtonLink to={`/data/${path}/${serviceId}/${dataId}?byLocation=${byLocation}&page=${page}`} text='뒤로' />
                        <ButtonLink to={`/data/${path}/${serviceId}/${dataId}?byLocation=${byLocation}&page=${page}`} text='완료' />
                    </>
                )}
            </div>
        </>
    )
}