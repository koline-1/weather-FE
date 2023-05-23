const { Link } = require('react-router-dom');
const { PropTypes } = require('prop-types');

export default function ButtonLink ({ to, text, onclick }) {
        return (
            <Link to={to}><button onClick={onclick}>{text}</button></Link>
        )
}

ButtonLink.propTypes = {
    to: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onclick: PropTypes.func,
}