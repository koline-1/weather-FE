import shortTermLocations from '../json/shortTermLocations.json';
import React from 'react';
import services from '../json/services.json';
import styles from '../styles/components/DataUpdateView.module.css'
import ButtonLink from "../components/ButtonLink";
import { PropTypes } from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const textarea_key = ["wfSv"];

export default function DataUpdateView ({ path, serviceId, data, dataId }) {

    const { register, handleSubmit, formState: { isSubmitting } } = useForm();

    const navigate = useNavigate();

    const loc = useLocation();
    const page = new URLSearchParams(loc.search).get("page") ?? "1";
    const byLocation = JSON.parse(new URLSearchParams(loc.search).get("byLocation")) ?? false;

    const service = services[path+"Term"];
    const locations = Object.keys(service[serviceId].locations);
    const datalist = service[serviceId].data;
    const keys = Object.keys(datalist);
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

    const onSuccess = async (values) => {
        const json = await (await fetch(`http://localhost:8080/${path}-term/${serviceId}/${dataId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                data : values
            }),
        })).json();
        console.log(json);

        navigate(`/data/${path}/${serviceId}/${dataId}?byLocation=${byLocation}&page=${page}`)
    }

    const onError = (error) => {
        console.log('error: ', error);
    }


    return (
        <>
            <form onSubmit={handleSubmit(onSuccess, onError)}>
                <input type='hidden' value={dataId} {...register('id')} />
                <div className={styles.form_div}>
                    <table className={styles.table}>
                        <tbody>
                            {keys.map((key, index) => {
                                if (key === 'stnId' || key === 'regId' || key === 'nxValue') {
                                    return (
                                        <tr key={index}>
                                            <th>예보지점</th>
                                            <td>
                                                <select 
                                                    defaultValue={serviceId === 'expectation' ? data.stnId : data.regId} 
                                                    {...register(serviceId === 'expectation' ? 'stnId' : 'regId')}
                                                >
                                                    {locations.map((loc, index) => {
                                                        return (
                                                            <option key={loc+index} value={loc}>
                                                                {service[serviceId].locations[loc]}
                                                            </option>
                                                        )
                                                    })}
                                                </select>
                                            </td>
                                        </tr>
                                    )
                                }
                                return (
                                    <React.Fragment key={index}>
                                        {key === 'nyValue' || key === "id" || key === "date" ? <></> : (
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