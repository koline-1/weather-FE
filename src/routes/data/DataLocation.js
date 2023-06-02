import { useParams } from 'react-router-dom';
import ButtonLink from '../../components/ButtonLink';
import layout from '../../styles/layout/Layout.module.css';
import services from '../../services.json';
import Title from '../../components/Title';
import LocationList from '../../components/LocationList';

export default function DataLocation () {
    const { path, serviceId } = useParams();
    return (
        <>
            <Title title={`${services[path+'Term'][serviceId].title} 저장 데이터 지역별 조회`} />
            <div className={layout.sub_content}>
                <LocationList path={path} serviceId={serviceId} viaData={true} />
            </div>
            <div className={layout.sub_button}>
                <ButtonLink to={`/data/${path}`} text={"뒤로"} />
                <ButtonLink to={`/data/${path}/${serviceId}?page=1`} text={"전체 조회"} />
            </div>
        </>
    );
}