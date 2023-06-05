import shortTermLocations from '../json/shortTermLocations.json';
import React from 'react';
import services from '../json/services.json';
import styles from '../styles/components/DataUpdateView.module.css'

export default function DataUpdateView ({ path, serviceId, data }) {
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
                                {key === 'nyValue' || key === "id" || key === "date" ? <></> : (
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
        </>
    )
}