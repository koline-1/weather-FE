const services = require('../services.json');
const { PropTypes } = require('prop-types');

export default function Region({ path, serviceId, code }) {
    const data = services[path];
    const locations = data[serviceId].locations;
    let region = "";
    [].forEach.call(locations, (location) => {
        if (location.code === code) {
            region = location.region;
            return false;
        }
    })
    return <li>예보구역: {region}</li>;
}

Region.propTypes = {
    path: PropTypes.string.isRequired,
    serviceId: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired
}