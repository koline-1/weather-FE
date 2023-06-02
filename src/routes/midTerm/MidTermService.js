import Title from '../../components/Title';
import ServiceList from '../../components/ServiceList';
import layout from '../../styles/layout/Layout.module.css';
import ButtonLink from '../../components/ButtonLink';

export default function MidTermService() {
    return (
        <>
            <Title title='중기 예보 목록' />
            <div className={layout.sub_content}>
                <ServiceList path="mid" isViaData={false} />
            </div>
            <div className={layout.sub_button}>
                <ButtonLink to='/' text='뒤로' />
            </div>
        </>
    )
}