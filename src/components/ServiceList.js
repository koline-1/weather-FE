const { Link } = require('react-router-dom');
const { PropTypes } = require('prop-types');
const ButtonLink = require('./ButtonLink').default;
const styles = require('../styles/components/ServiceList.module.css').default;

export default function ServiceList({ path, title, services, nxValue, nyValue }) {

    return (
        <div className={styles.white}>
            <h1>{title}</h1>
            <div>
                {services.map((each) => {
                    return <Link to={`/${path}/${each.serviceId}/${path === "mid" ? "location" : nxValue+"/"+nyValue}`}>{each.title}</Link>
                })}
            </div>
            <ButtonLink to='/' text='뒤로' />
        </div>
    )
}

ServiceList.propTypes = {
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    services: PropTypes.arrayOf(
        PropTypes.shape({
            serviceId: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired
        })
    ),
    nxValue: PropTypes.string,
    nyValue: PropTypes.string
}