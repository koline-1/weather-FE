import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ButtonLink from '../../components/ButtonLink';
import services from '../../services.json';
import layout from '../../styles/layout/Layout.module.css';
import Title from '../../components/Title';
import LocationList from '../../components/LocationList';

export default function MidTermLocation() {
    const { serviceId } = useParams();
    return (
        <>
            <Title title={`${services.midTerm[serviceId].title} 위치 설정`} />
            <div className={layout.sub_content}>
                <LocationList path='mid' serviceId={serviceId} isViaData={false} />
            </div>
            <div className={layout.sub_button} >
                <ButtonLink to='/mid/service' text='뒤로' />
                <ButtonLink to={`/data/mid/${serviceId}`} text='저장데이터 조회' />
            </div>
        </>
    );
}