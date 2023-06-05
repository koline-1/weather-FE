import services from '../services.json';
import { PropTypes } from 'prop-types';
import styles from '../styles/components/DataView.module.css';

export default function DataView ({ path, serviceId, data, isViaData }) {
    const service = services[path+"Term"];
    const datalist = service[serviceId].data
    const keys = Object.keys(datalist);

    return (
        <>
            {data === null || data.length === 0 ? <h1>데이터가 없습니다.</h1> : (
                <table className={styles.table}>
                    <tbody>
                        {keys.map((key, index) => {
                            return (
                                <>
                                    {!isViaData && (key === "id" || key === "date") ? <></> : (
                                        <tr key={index}>
                                            <th>{datalist[key]}</th>
                                            <td>{data[key]}</td>
                                        </tr>
                                    )}
                                </>
                            )
                        })}
                    </tbody>
                </table>
            )}  
        </>
    )
}

DataView.propTypes = {
    data: PropTypes.shape({
            id: PropTypes.number.isRequired,
            date: PropTypes.string
        }),
    serviceId: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    isViaData: PropTypes.bool.isRequired
}