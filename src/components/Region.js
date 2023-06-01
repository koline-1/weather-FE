const services = require('../services.json');
const { PropTypes } = require('prop-types');

export default function Region({ path, serviceId, code }) {
    const data = services[path];
    const locations = data[serviceId].locations;
    const keys = Object.keys(locations);
    let region = "";
    [].forEach.call(keys, (key) => {
        if (key === code) {
            region = locations[key];
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