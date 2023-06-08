import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import services from '../json/services.json';
import shortTermLocations from '../json/shortTermLocations.json';
import styles from '../styles/components/DataListView.module.css';

export default function DataListView ({ path, serviceId, data, byLocation, page, count }) {
    const getMidTermRegion = (row) => {
        let key;
        if (serviceId === "expectation") {
            key = row.stnId;
        } else {
            key = row.regId;
        }
        return services.midTerm[serviceId].locations[key];
    }

    const getShortTermRegion = (row) => {
        let region;
        [].forEach.call(shortTermLocations, (location) => {
            if (location.nxValue === row.nxValue && location.nyValue === row.nyValue) {
                region = location.region;
                return false;
            }
        })
        return region;
    }
console.log('count = ',count)
    return (
        <>
            {data === null || data.length === 0 ? <h1>데이터가 없습니다.</h1> : (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>
                                번호
                            </th>
                            <th>
                                {path === 'mid' ? '지역' : '예보지점'}
                            </th>
                            <th>
                                날짜
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((each, index) => {
                            return (
                                <tr key={index}>
                                    <td>{count - (((page - 1) * 15) + index)}</td>
                                    {path === "mid" ? (<>
                                        <td><Link to={`/data/mid/${serviceId}/${each.id}?byLocation=${byLocation}&page=${page}`}>{getMidTermRegion(each)}</Link></td>
                                    </>) : (<>
                                        <td><Link to={`/data/short/${serviceId}/${each.id}?byLocation=${byLocation}&page=${page}`}>{getShortTermRegion(each)}</Link></td>
                                    </>)}
                                    <td>{each.created}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )}  
        </>
    )
}

DataListView.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            created: PropTypes.string.isRequired,
            updated: PropTypes.string,
            baseDate:  PropTypes.string,
            baseTime:  PropTypes.string,
            forecastDate:  PropTypes.string,
            forecastTime:  PropTypes.string,
            nxValue: PropTypes.string,
            nyValue: PropTypes.string,
            version: PropTypes.string
        })
    ),
    serviceId: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    byLocation: PropTypes.bool.isRequired,
    page: PropTypes.string
}