import { useParams } from 'react-router-dom';
import ButtonLink from '../../components/ButtonLink';
import layout from '../../styles/layout/Layout.module.css';
import Title from '../../components/Title';
import LocationList from '../../components/LocationList';

export default function ShortTermLocation() {
    const { serviceId } = useParams();
    return (
        <>
            <Title title={'단기 예보 위치 설정'} />
            <div className={layout.sub_content}>
                <LocationList path='short' serviceId={serviceId} viaData={false} />
            </div>
            <div className={layout.sub_button}>
                <ButtonLink to="/short/service" text="뒤로" />
                <ButtonLink to={`/data/short/${serviceId}?page=1`} text="저장데이터 조회" />
            </div>
        </>
    );
}