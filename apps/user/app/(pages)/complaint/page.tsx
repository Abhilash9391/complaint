"use client";
import { Segment } from "@repo/ui/segment";


import { useRouter } from "next/navigation";
import { staffState } from "@repo/recoil/staffState";
import Complaintform from "../complaintform/page";
import { useState } from "react";

export default function Complaint() {
  
  const router = useRouter();

  return (
    <div className="flex items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <Segment
          onclick={() => {
            

            router.push(`/complaintform?segment=${encodeURIComponent("delivery")}`);
          }}
          title="delivery"


        />
        <Segment
          onclick={() => {
            
            router.push(`/complaintform?segment=${encodeURIComponent("customer care")}`);
          }}
          title="customer care "

        />
      </div>
      <div>hey hi</div>
    </div>
  );
}
