import { useParams } from "react-router-dom";
import { useEffect } from "react";
import ButtonLink from "../../components/ButtonLink";
import services from '../../json/services.json';
import layout from '../../styles/layout/Layout.module.css';
import Title from "../../components/Title";
import DataView from "../../components/DataView";
import useGet from "../../hooks/useGet";
import useCreate from "../../hooks/useCreate";

export default function MidTermCurrent() {
    const { serviceId, locationCode } = useParams();
    const data = useGet('mid', serviceId, locationCode);
    const { mutate, alertResult } = useCreate('mid', serviceId, data);

    useEffect(() => {
        alertResult()
    }, [alertResult])
    
    return (
        <>
            <Title title={services.midTerm[serviceId].title} />
            <div className={layout.sub_content}>
                <DataView path='mid' serviceId={serviceId} data={data} isViaData={false} />
            </div>
            <div className={layout.sub_button}>
                <ButtonLink to={"/mid/"+serviceId+"/location"} text="뒤로" />
                <button onClick={mutate}>저장</button>
                <ButtonLink to={`/data/mid/${serviceId}/location/${locationCode}?page=1`} text="저장데이터 조회" />
            </div>
        </>
    );
}