import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import layout from '../styles/layout/Layout.module.css';
import styles from '../styles/components/Title.module.css'

export default function Title({ title }) {
    return (
        <>
            <div className={styles.home_container}>
                <Link to='/' className={styles.home_link}>Home</Link>
            </div>
            <div className={layout.sub_title}>
                <h1>{title}</h1>
            </div>
        </>
    );
}

Title.propTypes = {
    title: PropTypes.string.isRequired
}