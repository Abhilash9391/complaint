"use client";

import { RecoilRoot, useRecoilValue } from "recoil";
import { staffState } from "@repo/recoil/staffState";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";


export default function Complaintform() {
    const [complaint,setComplaint] = useState("")
    
    const searchParams = useSearchParams();
    const segment = searchParams.get("segment");
    const buttonHandle = ()=>{ 
        axios.post("http://localhost:3000/api/complaint",{ complaint,segment})
       

    }
    return (
        <>
        <div className="flex">
           <input type = "text" onChange = {(e)=>{setComplaint(e.target.value)}} placeholder="raise your complaint "></input>

           <button onClick={buttonHandle} > send </button>

        </div>
          
        </>
    );
}

