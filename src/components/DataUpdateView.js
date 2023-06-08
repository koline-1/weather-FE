import shortTermLocations from '../json/shortTermLocations.json';
import React, { useEffect, useState } from 'react';
import services from '../json/services.json';
import styles from '../styles/components/DataUpdateView.module.css'
import ButtonLink from "../components/ButtonLink";
import { PropTypes } from 'prop-types';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useUpdate from '../hooks/useUpdate';

const textarea_key = ["wfSv"];

export default function DataUpdateView ({ path, serviceId, data, dataId }) {

    const { register, handleSubmit, formState: { isSubmitting } } = useForm();
    const [location, setLocation] = useState(path === 'mid' ? (serviceId === 'expectation' ? data.stnId : data.regId) : `${data.nxValue}-${data.nyValue}`);

    const loc = useLocation();
    const page = new URLSearchParams(loc.search).get("page") ?? "1";
    const byLocation = JSON.parse(new URLSearchParams(loc.search).get("byLocation")) ?? false;
    
    const { mutate, handleResult } = useUpdate(path, serviceId, dataId, byLocation, page);

    const service = services[path+"Term"];
    const locations = path === 'mid' ? Object.keys(service[serviceId].locations) : shortTermLocations;
    const datalist = service[serviceId].data;
    const keys = Object.keys(datalist);

    const handleLocationChange = (e) => {
        if (path === 'mid') {
            setLocation(e.target.value);
        } else {
            setLocation(e.target.value.split('-'));
        }
    }

    const onSuccess = async (values) => {
        // select에서 두 개의 value를 register 할 수 없어서 useState사용해 fetch 하기전 값 추가
        if (path === 'mid') {
            if (serviceId === 'expectation') {
                values.stnId = location;
            } else {
                values.regId = location;
            }
        } else {
            values.nxValue = location[0];
            values.nyValue = location[1];
        }

        mutate(values);
    }

    const onError = (error) => {
        console.log('error: ', error);
    }

    useEffect(() => {
        handleResult();
    }, [handleResult])


    return (
        <>
            <form onSubmit={handleSubmit(onSuccess, onError)}>
                <div className={styles.form_div}>
                    <table className={styles.table}>
                        <tbody>
                            {keys.map((key, index) => {
                                if (key === 'stnId' || key === 'regId' || key === 'nxValue') {
                                    return (
                                        <tr key={index}>
                                            <th>예보지점</th>
                                            <td>
                                                <select defaultValue={location} onChange={handleLocationChange}>
                                                    {locations.map((loc, index) => {
                                                        return (
                                                            <React.Fragment key={loc+index}>
                                                                {path === 'mid' ? (
                                                                    <option value={loc}>
                                                                        {service[serviceId].locations[loc]}
                                                                    </option>
                                                                    ) : (
                                                                    <option value={`${loc.nxValue}-${loc.nyValue}`}>
                                                                        {loc.region}
                                                                    </option>
                                                                )}
                                                            </React.Fragment>
                                                        )
                                                    })}
                                                </select>
                                            </td>
                                        </tr>
                                    )
                                }
                                return (
                                    <React.Fragment key={index}>
                                        {key === 'nyValue' || key === "id" || key === "created" || key === "updated" ? <></> : (
                                            <tr>
                                                <th>{datalist[key]}</th>
                                                <td>
                                                    {textarea_key.includes(key) ? (
                                                        <textarea 
                                                            defaultValue={data[key]}
                                                            {...register(key)}
                                                        />
                                                    ):(    
                                                        <input
                                                            type='text'
                                                            defaultValue={data[key]}
                                                            {...register(key)}
                                                        />
                                                    )}
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className={styles.sub_button}>
                    <ButtonLink to={`/data/${path}/${serviceId}/${dataId}?byLocation=${byLocation}&page=${page}`} text='뒤로' />
                    <button type="submit" disabled={isSubmitting}>완료</button>
                </div>
            </form>
        </>
    )
}

DataUpdateView.propTypes = {
    path: PropTypes.string.isRequired,
    serviceId: PropTypes.string.isRequired,
    data: PropTypes.any.isRequired,
    dataId: PropTypes.string.isRequired
}