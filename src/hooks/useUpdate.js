import { useCallback, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router";


export default function useUpdate(path, serviceId, dataId, byLocation, page) {

    const [result, setResult] = useState();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate } = useMutation(async(data) => {

        const updatedData = await (await fetch(`http://localhost:8080/${path}-term/${serviceId}/${dataId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                data : data
            }),
        })).json();

        setResult(updatedData);
    })

    const handleResult = useCallback(() => {

        const handleSuccess = () => {
            alert("성공적으로 수정되었습니다.")
    
            // 수정 완료 시 query cache를 삭제하여 수정 전 데이터 띄우는 현상 방지
            queryClient.invalidateQueries([path, serviceId, dataId]);
            navigate(`/data/${path}/${serviceId}/${dataId}?byLocation=${byLocation}&page=${page}`, { state: result })
        }

        const handleFailure = () => {
            alert("에러가 발생했습니다.")
        }

        if (result) {
            result.stnId || result.regId || result.baseDate ? handleSuccess() : handleFailure()
        }

    }, [byLocation, dataId, navigate, page, path, queryClient, result, serviceId])

    return { mutate, result, handleResult };
}