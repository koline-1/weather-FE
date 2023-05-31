import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import ButtonLink from '../../components/ButtonLink';
import ServiceList from '../../components/ServiceList';
import services from '../../services.json';
import layout from '../../styles/layout/Layout.module.css'
import Title from '../../components/Title';

export default function ShortTermService() {

    const { nxValue, nyValue } = useParams();
    
    useEffect(() => {
        document.title='단기 예보 목록';
    }, [])

    return (
        <>
            <Title title={'단기 예보 목록'} />
            <div className={layout.sub_content}>
                <ServiceList path="short" services={services.shortTerm} nxValue={nxValue} nyValue={nyValue} />
            </div>
            <div className={layout.sub_button}>
                <ButtonLink to='/short/location' text='뒤로' />
                <ButtonLink to='/data/short' text='저장데이터 조회' />
            </div>
        </>
    );

}