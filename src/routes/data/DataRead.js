import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ButtonLink from "../../components/ButtonLink";
const DataView = require('../../components/DataView').default;


export default function DataRead() {
    const { path, serviceId, dataId } = useParams();
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

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
            {loading ? <></> : <DataView path={path} data={data} serviceId={serviceId} />}
            <ButtonLink to={`/data/${path}/${serviceId}`} text={"뒤로"} />
        </>
    );
}