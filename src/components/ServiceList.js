const { Link } = require('react-router-dom');
const { PropTypes } = require('prop-types');
const ButtonLink = require('./ButtonLink').default;
const styles = require('../styles/components/ServiceList.module.css').default;

export default function ServiceList({ path, isViaData }) {

    return (
        <div className={styles.tabs}>
            {keys.map((key, index) => {
                return (
                    <div key={index}>
                        <Link to={(isViaData ? '/data' : '')+(`/${path}/${key}`) + (isViaData ? '?page=1' : '/location')}>{services[path+"Term"][key].title}</Link>
                    </div>
                );
            })}
        </div>
    )
}

ServiceList.propTypes = {
    path: PropTypes.string.isRequired,
    isViaData: PropTypes.bool.isRequired
}