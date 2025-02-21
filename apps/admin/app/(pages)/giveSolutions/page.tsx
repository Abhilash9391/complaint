"use client";

import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import SkeletonLoader from "../../../components/skeleton";
import { useSession } from "next-auth/react";

interface Complaint {
  id: number;
  createdAt: string;
  userId: number;
  status: string;
  complaint: string;
  segment?: string;
  solution: {
    solution: string;
    staff: any;
    createdAt: string | number | Date; id: number; text: string
  }[];
}

export default function GiveSolutionPage() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const segment = searchParams.get("segment");

  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [solutionText, setSolutionText] = useState("");
  const [submitting, setSubmitting] = useState(false);


  useEffect(() => {
    if (!segment) return;

    const fetchComplaints = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/getComplaints/?segment=${segment}`);
        setComplaints(response.data);
        console.log(response.data)
      } catch (err) {
        setError("Failed to fetch complaints. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [segment]);


  const openModal = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
    setIsModalOpen(true);
  };


  const closeModal = () => {
    setIsModalOpen(false);
    setSolutionText("");
    setSubmitting(false);
  };


  const submitSolution = async () => {
    if (!selectedComplaint || !solutionText.trim()) return;

    setSubmitting(true);
    try {
      await axios.post("http://localhost:3001/api/postSolution", {
        complaintId: Number(selectedComplaint.id),
        solution: solutionText,
        //@ts-ignore
        staffId: Number(session?.user?.id)
      });


      alert("solution added succesfully")

      closeModal();
    } catch (err) {
      console.error("Error submitting solution:", err);
      alert("Failed to submit solution. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (<><SkeletonLoader /></>)
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="solution-container">
      <h1>Complaints for {segment}</h1>

      {complaints.length > 0 ? (
        <ul className="complaint-list">
          {complaints.map((complaint) => (
            <li key={complaint.id} className="complaint-item">
              <p><strong>Complaint:</strong> {complaint.complaint}</p>
              <p><strong>Status:</strong> {complaint.status}</p>
              <p><strong>Filed At:</strong> {new Date(complaint.createdAt).toLocaleString()}</p>


              {complaint.solution?.length > 0 ? (
                <div className="solution-section">
                  <strong>Solutions:</strong>
                  <ul>
                    {complaint.solution.map((sol: { id: Key | null | undefined; solution: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; staff: { name: any; }; createdAt: string | number | Date; }) => (
                      <li key={sol.id}>
                        <p>{sol.solution}</p>
                        <p><strong>Given By:</strong> {sol.staff?.name ?? "Unknown"}</p>
                        <p><strong>At:</strong> {new Date(sol.createdAt).toLocaleString()}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="no-solution">No solution provided yet.</p>
              )}


              <button className="open-modal-btn" onClick={() => openModal(complaint)}>
                Give Solution
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No complaints found for this segment.</p>
      )}
      


      {isModalOpen && selectedComplaint && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Provide Solution</h2>
            <p><strong>Complaint:</strong> {selectedComplaint.complaint}</p>

            <textarea
              className="solution-input"
              placeholder="Enter solution here..."
              value={solutionText}
              onChange={(e) => setSolutionText(e.target.value)}
              disabled={submitting}
            />

            <div className="modal-buttons">
              <button className="submit-btn" onClick={submitSolution} disabled={submitting}>
                {submitting ? "Submitting..." : "Submit"}
              </button>
              <button className="cancel-btn" onClick={closeModal} disabled={submitting}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
