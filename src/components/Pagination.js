import { Link } from 'react-router-dom';
import styles from '../styles/components/Pagination.module.css';
import { PropTypes } from 'prop-types';

export default function Pagination({ totalCount, page, path, serviceId, byLocation, locationCode, nxValue, nyValue }) {
console.log('count = ', totalCount);
    const pages = [];

    const totalPage = Math.floor(totalCount/15)+(totalCount%15 !== 0 ? 1:0);
    const floor = Math.floor((page-1)/10) * 10;
    const ceil = Math.ceil(page/10) * 10;
    for(let i=floor+1; i <= (totalPage > ceil ? ceil : totalPage); i++){
        pages.push(i);
    }

    return (
        <div className={styles.pagination_container}>
            <div className={styles.prev_button_container}>
                {floor === 0 ? <></> : (
                    <>
                        <Link to={(byLocation ? `/data/${path}/${serviceId}/location` + (path === "mid" ? `/${locationCode}` : `/${nxValue}/${nyValue}`)
                            : `/data/${path}/${serviceId}`) + `?page=1`} className={`${styles.prev_button} ${floor === 1 ? styles.disabled : ""}`}>
                            {"<<"}
                        </Link>
                        <Link to={(byLocation ? `/data/${path}/${serviceId}/location` + (path === "mid" ? `/${locationCode}` : `/${nxValue}/${nyValue}`)
                            : `/data/${path}/${serviceId}`) + `?page=${floor - 1}`} className={`${styles.prev_button} ${floor === 1 ? styles.disabled : ""}`}>
                            {"<"}
                        </Link>
                    </>
                )}
            </div>
            <div className={styles.pages_container}>
                {pages.map((each, index) => {
                    return (
                        <Link 
                            to={(byLocation ? `/data/${path}/${serviceId}/location` + (path === "mid" ? `/${locationCode}` : `/${nxValue}/${nyValue}`) 
                                : `/data/${path}/${serviceId}`) + `?page=${each}`}
                            className={`${styles.page_link} ${each === Number(page) ? styles.active : ""}`} 
                            key={index}>
                                {each}
                        </Link>
                    )
                })}
            </div>
            <div className={styles.next_button_container}>
                {totalPage <= ceil ? <></> : (
                    <>
                        <Link to={(byLocation ? `/data/${path}/${serviceId}/location` + (path === "mid" ? `/${locationCode}` : `/${nxValue}/${nyValue}`) 
                            : `/data/${path}/${serviceId}`) + `?page=${ceil+1}`} className={`${styles.next_button} ${ceil + 1 > totalPage ? styles.disabled : ""}`} >
                                {">"}
                        </Link>
                        <Link to={(byLocation ? `/data/${path}/${serviceId}/location` + (path === "mid" ? `/${locationCode}` : `/${nxValue}/${nyValue}`) 
                            : `/data/${path}/${serviceId}`) + `?page=${totalPage}`} className={`${styles.next_button} ${ceil + 1 > totalPage ? styles.disabled : ""}`}>
                                {">>"}
                        </Link>
                    </>
                )}
            </div>
        </div>
    )
}

Pagination.propTypes = {
    totalCount: PropTypes.string.isRequired,
    page: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    serviceId: PropTypes.string.isRequired,
    byLocation: PropTypes.bool.isRequired,
    locationCode: PropTypes.string,
    nxValue: PropTypes.string,
    nyValue: PropTypes.string
}