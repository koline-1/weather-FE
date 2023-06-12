import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";

export default function useDelete (path, serviceId, data, byLocation, page) {

    const [result, setResult] = useState();
    const navigate = useNavigate();

    const { mutate } = useMutation(async() => {

        const response = await (await fetch(`http://localhost:8080/${path}-term/${serviceId}/${data.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
        })).json();

        setResult(response);
    })
    
    const handleResult = () => {

        const handleSuccess = () => {
            alert('성공적으로 삭제되었습니다.');

            navigate(`/data/${path}/${serviceId}` + (byLocation ? `/location` + (path === 'mid' ? (serviceId === 'expectation' ? `/${data.stnId}` : `/${data.regId}`) 
            : `/${data.nxValue}/${data.nyValue}`) : ``) + `?page=${page}&isUpdated=true`);
        }

        const handleFailure = () => {
            alert('에러가 발생했습니다.');
        }

        if (result) {
            result.result === 'Data not found.' ? handleFailure() : handleSuccess()
        }
    }


    return { mutate, handleResult }
}