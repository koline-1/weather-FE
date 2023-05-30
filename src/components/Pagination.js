import { Link } from 'react-router-dom';
import styles from '../styles/components/Pagination.module.css';
import { PropTypes } from 'prop-types';

export default function Pagination({ totalCount, page, path, serviceId, byLocation, locationCode, nxValue, nyValue }) {

    const pages = [];

    const totalPage = Math.floor(totalCount/10)+(totalCount%10 !== 0 ? 1:0);
    const floor = Math.floor((page-1)/10) * 10;
    const ceil = Math.ceil(page/10) * 10;
    for(let i=floor+1; i <= (totalPage > ceil ? ceil : totalPage); i++){
        pages.push(i);
    }

    return (
        <div className={styles.pagination_container}>
            <div>
                {floor === 0 ? <></> : (
                    <>
                        <Link to={(byLocation ? `/data/${path}/${serviceId}/location` + (path === "mid" ? `/${locationCode}` : `/${nxValue}/${nyValue}`) 
                            : `/data/${path}/${serviceId}`) + `?page=1`} >
                                <button>
                                    {"<<"}
                                </button>
                        </Link>
                        <Link to={(byLocation ? `/data/${path}/${serviceId}/location` + (path === "mid" ? `/${locationCode}` : `/${nxValue}/${nyValue}`) 
                            : `/data/${path}/${serviceId}`) + `?page=${floor}`} >
                                <button>
                                    {"<"}
                                </button>
                        </Link>
                    </>
                )}
            </div>
            <div>
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
            <div>
                {totalPage <= ceil ? <></> : (
                    <>
                        <Link to={(byLocation ? `/data/${path}/${serviceId}/location` + (path === "mid" ? `/${locationCode}` : `/${nxValue}/${nyValue}`) 
                            : `/data/${path}/${serviceId}`) + `?page=${ceil+1}`} >
                                <button>
                                    {">"}
                                </button>
                        </Link>
                        <Link to={(byLocation ? `/data/${path}/${serviceId}/location` + (path === "mid" ? `/${locationCode}` : `/${nxValue}/${nyValue}`) 
                            : `/data/${path}/${serviceId}`) + `?page=${totalPage}`} >
                                <button>
                                    {">>"}
                                </button>
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