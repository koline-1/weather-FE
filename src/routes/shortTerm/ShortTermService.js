const { useParams } = require('react-router-dom');
const { useEffect } = require('react');
const ServiceList = require('../../components/ServiceList').default;

export default function ShortTermService() {
    return (
        <>
            <Title title={'단기 예보 목록'} />
            <div className={layout.sub_content}>
                <ServiceList path="short" isViaData={false} />
            </div>
            <div className={layout.sub_button}>
                <ButtonLink to='/' text='뒤로' />
            </div>
        </>
    );

}