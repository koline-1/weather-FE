import ButtonLink from '../../components/ButtonLink';
import ServiceList from '../../components/ServiceList';
import layout from '../../styles/layout/Layout.module.css'
import Title from '../../components/Title';

export default function ShortTermService() {
    return (
        <>
            <Title title={'단기 예보 목록'} />
            <div className={layout.sub_content}>
                <ServiceList path="short" viaData={false} />
            </div>
            <div className={layout.sub_button}>
                <ButtonLink to='/' text='뒤로' />
            </div>
        </>
    );

}