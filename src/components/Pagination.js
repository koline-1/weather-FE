import { Link } from 'react-router-dom';

export default function Pagination({ totalCount, page, path, serviceId }) {

    const pages = [];

    const totalPage = Math.floor(totalCount/10)+(totalCount%10 !== 0 ? 1:0);
    const floor = Math.floor(page/10) * 10;
    const ceil = Math.ceil(page/10) * 10;
    for(let i=floor+1; i <= (totalPage > ceil ? ceil : totalPage); i++){
        pages.push(i);
    }

    return (
        <>
            {pages.map((page) => {
                return <Link to={`/data/${path}/${serviceId}?page=${page}`}>{page}</Link>
            })}
        </>
    )
}