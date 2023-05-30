import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ButtonLink from '../../components/ButtonLink';

const services = require('../../services.json');

export default function DataLocation () {
    const [keySet, setKeySet] = useState([]);
    const [locations, setLocations] = useState([]);
    const { path, serviceId } = useParams();
    
    useEffect(() => {
        if (path === "mid") {
            const keys = Object.keys(services.midTerm[serviceId].locations);
            setKeySet(keys);
        } else {
            const locations = services.shortTerm[serviceId].locations;
            setLocations(locations);
        }
    }, [serviceId, path])

    return (
        <>
            <div>
                { path === "mid" ? (
                    keySet.map((key, index) => {
                        const service =services.midTerm;
                        const region = service[serviceId].locations[key];
                        return <div key={index}><Link to={`/data/mid/${serviceId}/location/${key}?page=1`} >{region}</Link></div>
                        
                    })
                ) : (
                    locations.map((location, index) => {
                        return <div key={index}><Link to={`/data/short/${serviceId}/location/${location.nxValue}/${location.nyValue}?page=1`} >{location.region}</Link></div>
                    })
                )}
            </div>
            <ButtonLink to={`/data/${path}`} text={"뒤로"} />
            <ButtonLink to={`/data/${path}/${serviceId}?page=1`} text={"전체 조회"} />
        </>
    );
}