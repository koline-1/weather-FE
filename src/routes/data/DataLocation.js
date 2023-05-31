import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ButtonLink from '../../components/ButtonLink';
import layout from '../../styles/layout/Layout.module.css';
import services from '../../services.json';
import Title from '../../components/Title';
import styles from '../../styles/common/Common.module.css';

export default function DataLocation () {
    const [keySet, setKeySet] = useState([]);
    const [locations, setLocations] = useState([]);
    const { path, serviceId } = useParams();

    const title = `${services[path+'Term'][serviceId].title} 저장 데이터 지역별 조회`;
    
    useEffect(() => {
        document.title = title;
        if (path === "mid") {
            const keys = Object.keys(services.midTerm[serviceId].locations);
            setKeySet(keys);
        } else {
            const locations = services.shortTerm[serviceId].locations;
            setLocations(locations);
        }
    }, [serviceId, path, title])

    return (
        <>
            <Title title={title} />
            <div className={layout.sub_content}>
                <div className={styles.tabs}>
                    { path === "mid" ? (
                        keySet.map((key, index) => {
                            return (
                                <Link key={index} to={`/data/mid/${serviceId}/location/${key}?page=1`} >
                                    {services.midTerm[serviceId].locations[key]}
                                </Link>
                            )
                            
                        })
                    ) : (
                        locations.map((location, index) => {
                            return <Link key={index} to={`/data/short/${serviceId}/location/${location.nxValue}/${location.nyValue}?page=1`} >{location.region}</Link>
                        })
                    )}
                </div>
            </div>
            <div className={layout.sub_button}>
                <ButtonLink to={`/data/${path}`} text={"뒤로"} />
                <ButtonLink to={`/data/${path}/${serviceId}?page=1`} text={"전체 조회"} />
            </div>
        </>
    );
}