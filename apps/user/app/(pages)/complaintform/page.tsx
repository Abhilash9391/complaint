"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import AppBar from "../../../components/appbar";

export default function Complaintform() {
    const [complaint, setComplaint] = useState("");
    const searchParams = useSearchParams();
    const segment = searchParams.get("segment");

    const buttonHandle = async () => {
        if (!complaint.trim()) return alert("Please enter a valid complaint.");

        try {
            await axios.post("http://localhost:3000/api/complaint", { complaint, segment });
            alert("Complaint submitted successfully!");
            setComplaint("");
        } catch (error) {
            alert("Error submitting complaint. Please try again.");
        }
    };

    return (
        <><AppBar/>
        <div className="complaint-container">
            <div className="complaint-box">
                <h2 className="complaint-title">Submit a Complaint</h2>
                <p className="complaint-category">Category: <strong>{segment || "General"}</strong></p>

                <textarea
                    value={complaint}
                    onChange={(e) => setComplaint(e.target.value)}
                    placeholder="Describe your complaint..."
                    className="complaint-input"
                />

                <button onClick={buttonHandle} className="complaint-btn">Submit</button>
            </div>
        </div>
        </>
    );
}
