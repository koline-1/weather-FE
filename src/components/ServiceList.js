import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import styles from '../styles/common/Common.module.css';
import services from '../services.json';

export default function ServiceList({ path, isViaData }) {

    const keys = Object.keys(services[path+"Term"]);

    return (
        <div className={styles.tabs}>
            {keys.map((key, index) => {
                return (
                    <div key={index}>
                        <Link to={(isViaData ? '/data' : '')+(`/${path}/${key}`) + (isViaData ? '?page=1' : '/location')}>{services[path+"Term"][key].title}</Link>
                    </div>
                );
            })}
        </div>
    )
}

ServiceList.propTypes = {
    path: PropTypes.string.isRequired,
    isViaData: PropTypes.bool.isRequired
}