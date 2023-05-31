import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Title from '../../components/Title';
import ServiceList from '../../components/ServiceList';
import services from '../../services.json';
import layout from '../../styles/layout/Layout.module.css';
import ButtonLink from '../../components/ButtonLink';

export default function MidTermService() {
    const { locationCode } = useParams();

    useEffect(() => {
        document.title='중기 예보 목록';
    }, [])

    return (
        <>
            <Title title='중기 예보 목록' />
            <div className={layout.sub_content}>
                <ServiceList path="mid" services={services.midTerm} locationCode={locationCode} />
            </div>
            <div className={layout.sub_button}>
                <ButtonLink to='/' text='뒤로' />
            </div>
        </>
    )
}