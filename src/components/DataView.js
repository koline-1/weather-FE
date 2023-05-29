const services = require('../services.json');
const { PropTypes } = require('prop-types');

export default function DataView ({ path, serviceId, data }) {
    const service = services[path+"Term"];
    const datalist = service[serviceId].data
    const keys = Object.keys(datalist);

    return (
        <>
            {data === null || data.length === 0 ? <h1>데이터가 없습니다.</h1> : (
                <table width={1700}>
                    <tbody>
                        {keys.map((key, index) => {
                            return (
                                <tr key={index}>
                                    <th width="150">{datalist[key]}</th>
                                    <td>{data[key]}</td>
                                </tr>
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
            date: PropTypes.string.isRequired
        }),
    serviceId: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired
}