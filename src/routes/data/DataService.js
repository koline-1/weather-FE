import { useParams } from 'react-router-dom';
import Title from '../../components/Title';
import ButtonLink from '../../components/ButtonLink';
import layout from '../../styles/layout/Layout.module.css';
import ServiceList from '../../components/ServiceList';

export default function DataService() {
    const { path } = useParams();
    return (
        <>
            <Title title={path === 'mid' ? '중기 예보 저장 데이터 조회' : '단기 예보 저장 데이터 조회'} />
            <div className={layout.sub_content}>
                <ServiceList path={path} isViaData={true} />
            </div>
            <div className={layout.sub_button}>
                <ButtonLink to='/data' text={"뒤로"} />
            </div>
        </>
    )
}