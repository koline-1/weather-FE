import { useEffect, useState } from 'react';
import ButtonLink from '../../components/ButtonLink';

const { useParams, Link } = require('react-router-dom');
const services = require('../../services.json');

export default function MidTermLocation() {
    const [keySet, setKeySet] = useState([]);
    const { serviceId } = useParams();
    
    useEffect(() => {
      document.title=services.midTerm[serviceId].title;
      
      const keys = Object.keys(services.midTerm[serviceId].locations);
      setKeySet(keys);
    }, [serviceId]);

    return (
        <div>
            {keySet.map((key, index) => {
                return (
                    <div key={index}>
                        <Link to={`/mid/${serviceId}/${key}`} >{services.midTerm[serviceId].locations[key]}</Link>
                    </div>
                )
            })}
            <ButtonLink to='/mid/service' text='뒤로' />
            <ButtonLink to={`/data/mid/${serviceId}`} text='저장데이터 조회' />
        </div>
    );
}