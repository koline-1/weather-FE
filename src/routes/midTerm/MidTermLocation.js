import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ButtonLink from '../../components/ButtonLink';
import services from '../../services.json';
import layout from '../../styles/layout/Layout.module.css';
import Title from '../../components/Title';

export default function MidTermLocation() {
    const [keySet, setKeySet] = useState([]);
    const { serviceId } = useParams();
    const title = `${services.midTerm[serviceId].title} 위치 설정`;
    
    useEffect(() => {
        document.title=title;
      
        const keys = Object.keys(services.midTerm[serviceId].locations);
        setKeySet(keys);
    }, [serviceId, title]);

    return (
        <>
            <Title title={title} />
            <div className={layout.sub_content}>
                {keySet.map((key, index) => {
                    return (
                        <div key={index}>
                            <Link to={`/mid/${serviceId}/${key}`} >{services.midTerm[serviceId].locations[key]}</Link>
                        </div>
                    )
                })}
            </div>
            <div className={layout.sub_button} >
                <ButtonLink to='/mid/service' text='뒤로' />
                <ButtonLink to={`/data/mid/${serviceId}`} text='저장데이터 조회' />
            </div>
        </>
    );
}