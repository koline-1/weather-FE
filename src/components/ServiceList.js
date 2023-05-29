import { useEffect, useState } from 'react';

const { Link } = require('react-router-dom');
const { PropTypes } = require('prop-types');
const ButtonLink = require('./ButtonLink').default;
const styles = require('../styles/components/ServiceList.module.css').default;

export default function ServiceList({ path, title, services, nxValue, nyValue }) {
    const [keySet, setKeySet] = useState([]);

    useEffect(() => {
        setKeySet(Object.keys(services));
    }, [services])

    return (
        <div className={styles.white}>
            <h1>{title}</h1>
            <div>
                {keySet.map((key, index) => {
                    return (
                        <div key={index}>
                            <Link to={`/${path}/${key}/${path === "mid" ? "location" : nxValue+"/"+nyValue}`}>{services[key].title}</Link>
                        </div>
                    );
                })}
            </div>
            <ButtonLink to='/' text='뒤로' />
        </div>
    )
}

ServiceList.propTypes = {
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
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