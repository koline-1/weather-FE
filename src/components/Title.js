import { PropTypes } from 'prop-types';
import layout from '../styles/layout/Layout.module.css';

export default function Title({ title }) {
    return (
        <div className={layout.sub_title}>
            <h1>{title}</h1>
        </div>
    );
}

Title.propTypes = {
    title: PropTypes.string.isRequired
}