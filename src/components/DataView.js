import services from '../json/services.json';
import shortTermLocations from '../json/shortTermLocations.json';
import React from 'react';
import { PropTypes } from 'prop-types';
import styles from '../styles/components/DataView.module.css';

export default function DataView ({ path, serviceId, data, isViaData }) {

    const service = services[path+"Term"];
    let location;

    if (path === 'mid') {
        location = serviceId === 'expectation' ? service[serviceId].locations[data.stnId] : service[serviceId].locations[data.regId]
    } else {
        const nxValue = data.nxValue;
        const nyValue = data.nyValue;
        [].forEach.call(shortTermLocations, (loc) => {
            if (loc.nxValue === nxValue && loc.nyValue === nyValue) {
                location = loc.region;
                return false;
            }
        })
    }

    const datalist = service[serviceId].data;
    const keys = Object.keys(datalist);

    return (
        <>
            {data === null || data.length === 0 ? <h1>데이터가 없습니다.</h1> : (
                <table className={styles.table}>
                    <tbody>
                        {keys.map((key, index) => {
                            if (key === 'stnId' || key === 'regId' || key === 'nxValue') {
                                return (
                                    <tr key={index}>
                                        <th>예보지점</th>
                                        <td>{location}</td>
                                    </tr>
                                )
                            }
                            return (
                                <React.Fragment key={index}>
                                    {key === 'nyValue' || (!isViaData && (key === "id" || key === "created" || key === "updated")) ? <></> : (
                                        <tr>
                                            <th>{datalist[key]}</th>
                                            <td>{data[key]}</td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            )
                        })}
                    </tbody>
                </table>
            )}  
        </>
    )
}

DataView.propTypes = {
    data: PropTypes.any.isRequired,
    serviceId: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    isViaData: PropTypes.bool.isRequired
}


