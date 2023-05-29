import { Link } from 'react-router-dom';

const services = require('../services.json');
const { PropTypes } = require('prop-types');

export default function DataListView ({ path, serviceId, data }) {
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
        const locations = services.shortTerm[serviceId].locations;
        let region;
        [].forEach.call(locations, (location) => {
            if (location.nxValue === row.nxValue && location.nyValue === row.nyValue) {
                region = location.region;
                return false;
            }
        })
        return region;
    }

    return (
        <>
            {data === null || data.length === 0 ? <h1>데이터가 없습니다.</h1> : (
                <table>
                    <tbody>
                        {data.map((each, index) => {
                            return (
                                <tr key={index}>
                                    <th>id</th>
                                    <td>{each.id}</td>
                                    {path === "mid" ? (<>
                                        <th>지역</th>
                                        <td><Link to={`/data/mid/${serviceId}/${each.id}`}>{getMidTermRegion(each)}</Link></td>
                                    </>) : (<>
                                        <th>예보지점</th>
                                        <td><Link to={`/data/short/${serviceId}/${each.id}`}>{getShortTermRegion(each)}</Link></td>
                                    </>)}
                                    <th>날짜</th>
                                    <td>{each.date}</td>
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
            date: PropTypes.string.isRequired,
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
    path: PropTypes.string.isRequired
}