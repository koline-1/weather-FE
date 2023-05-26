import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ButtonLink from '../../components/ButtonLink';

const services = require('../../services.json');

export default function MidTermDataService () {
    const [keySet, setKeySet] = useState([]);
    const { path, serviceId } = useParams();
    
    useEffect(() => {
        const keys = Object.keys(services.midTerm[serviceId].locations);
        setKeySet(keys);
    }, [serviceId])

    return (
        <>
            <div>
                {keySet.map((key) => {
                    const data = services.midTerm[serviceId].locations[key];
                    return <Link to={`/data/${path}/${serviceId}/${data.code}`} >{data.region}</Link>
                })}
            </div>
            <ButtonLink to={`/data/${path}`} text={"뒤로"} />
        </>
    );
}