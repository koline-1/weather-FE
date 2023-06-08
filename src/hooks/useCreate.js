import { useCallback, useState } from "react";
import { useMutation } from "react-query";

export default function useCreate(path, serviceId, data) {

    const [result, setResult] = useState();

    const { mutate } = useMutation(async() => {
        const response = await (await fetch(`http://localhost:8080/${path}-term/${serviceId}/current`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
              data : data
            }),
        })).json()
        .catch((error) => console.log("error:", error));

        setResult(response);
    })

    const alertResult = useCallback(() => {
      if (result) {
        if (path === 'mid') {
          if (Number(result.stnId) === 0 || result.regId === "") {
              alert("이미 저장한 데이터 입니다.");
          } else if (Number(result.stnId) > 0 || result.regId !== "") {
              alert("데이터를 성공적으로 저장하였습니다.");
          } else {
              alert("알 수 없는 오류가 발생했습니다.");
          }
        } else {
          if (serviceId === "status") {
            if (result.baseDate !== "") {
                alert("데이터를 성공적으로 저장하였습니다.");
            } else if (result.baseDate === "") {
                alert("이미 저장한 데이터 입니다.");
            } else {
                alert("알 수 없는 오류가 발생했습니다.");
            }
        } else {
            if (Number(result.count) === 0) {
                alert("이미 저장한 데이터 입니다.");
            } else if (Number(result.count) > 0) {
                alert(result.count+"개의 데이터를 성공적으로 저장하였습니다.");
            } else {
                alert("알 수 없는 오류가 발생했습니다.");
            }
        }
        }
    }
    }, [path, result, serviceId])

    return { mutate, result, alertResult };
}