import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import styles from '../styles/components/ServiceList.module.css';

export default function ServiceList({ path, services, nxValue, nyValue }) {
    const [keySet, setKeySet] = useState([]);

    useEffect(() => {
        setKeySet(Object.keys(services));
    }, [services])

    return (
        <div className={styles.white}>
            <div>
                {keySet.map((key, index) => {
                    return (
                        <div key={index}>
                            <Link to={`/${path}/${key}/${path === "mid" ? "location" : nxValue+"/"+nyValue}`}>{services[key].title}</Link>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

ServiceList.propTypes = {
    path: PropTypes.string.isRequired,
    services: PropTypes.shape({
        title: PropTypes.string.isRequired,
        location: PropTypes.arrayOf(
            PropTypes.shape({
                code: PropTypes.string.isRequired,
                region: PropTypes.string.isRequired
            })
        )
    }),
    locationCode: PropTypes.string,
    nxValue: PropTypes.string,
    nyValue: PropTypes.string
}