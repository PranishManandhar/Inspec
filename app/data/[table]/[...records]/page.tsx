"use client";
import { useParams } from "next/navigation";
export default function records(){
    var param = useParams();
    return(
        <>
            this page is {param.table}/{param.records}
        </>

    );
}