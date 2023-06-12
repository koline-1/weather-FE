import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import ButtonLink from '../../components/ButtonLink';
import services from '../../json/services.json';
import layout from '../../styles/layout/Layout.module.css';
import Title from '../../components/Title';
import DataView from '../../components/DataView';
import useGet from '../../hooks/useGet';
import useCreate from '../../hooks/useCreate';


export default function ShortTermCurrent() {

    const { serviceId, nxValue, nyValue } = useParams();
    const location = [nxValue, nyValue];
    const { data, isLoading } = useGet('short', serviceId, location);
    const { mutate, alertResult } = useCreate('short', serviceId, data);

    useEffect(() => {
        alertResult()
    }, [alertResult])
    
    return (
        <>
            <Title title={services.shortTerm[serviceId].title} />
            <div className={layout.sub_content}>
                {isLoading || !data ? <></> : serviceId === "status" ?
                    <DataView path='short' serviceId={serviceId} data={data} isViaData={false} />
                    :
                    <div>
                        {data.map((each, index) => {
                            return <DataView key={index} path='short' serviceId={serviceId} data={each} isViaData={false} />
                        })}
                    </div>
                }
            </div>
            <div className={layout.sub_button}>
                <ButtonLink to={`/short/${serviceId}/location/`} text="뒤로" />
                <button onClick={mutate}>저장</button>
                <ButtonLink to={`/data/short/${serviceId}/location/${nxValue}/${nyValue}?page=1`} text="저장데이터 조회" />
            </div>
        </>
    );
    
}