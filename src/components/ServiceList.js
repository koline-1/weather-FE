const { Link } = require('react-router-dom');
const { PropTypes } = require('prop-types');
const ButtonLink = require('./ButtonLink').default;
const styles = require('../styles/components/ServiceList.module.css').default;

export default function ServiceList({ title, links }) {

    return (
        <div className={styles.white}>
            <h1>{title}</h1>
            <div>
                {links.map((each) => {
                    return <Link to={each.link}>{each.text}</Link>
                })}
            </div>
            <ButtonLink to='/' text='뒤로' />
        </div>
    )
}

ServiceList.propTypes = {
    title: PropTypes.string.isRequired,
    links: PropTypes.arrayOf(
        PropTypes.shape({
            link: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired
        })
    )
}