"use client";

import { useState, useEffect } from "react";
import AppBar from "../../../components/appbar";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Complaint() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showComplaints, setShowComplaints] = useState(false);

  useEffect(() => {
    if (status === "loading" || !session) return;

    const email = session.user?.email;

    async function fetchComplaints() {
      try {
        setLoading(true);
        const response = await fetch(`/api/myComplaints/?email=${email}`);

        if (!response.ok) throw new Error("Failed to fetch complaints");

        const data = await response.json();
        setComplaints(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchComplaints();
  }, [session, status]);

  if (status === "loading") return <div>Loading session...</div>;
  if (!session) return <div>Please log in to view your complaints.</div>;

  return (
    <div className="complaint-page">
      <AppBar />
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Raise Your Complaint Easily</h1>
          <p className="hero-description">
            Select a category and let us help you resolve your issue.
          </p>
        </div>
      </section>

      <div className="complaint-section">
        {[
          {
            segment: "delivery",
            title: "📦 Delivery Issues",
            description: "Report problems with your package or delays.",
            imgUrl: "https://images.pexels.com/photos/4246110/pexels-photo-4246110.jpeg?auto=compress&cs=tinysrgb&w=500"
          },
          {
            segment: "customer care",
            title: "☎️ Customer Care",
            description: "Facing issues with support? Let us know.",
            imgUrl: "https://images.pexels.com/photos/8867430/pexels-photo-8867430.jpeg?auto=compress&cs=tinysrgb&w=500"
          },
          {
            segment: "refund",
            title: "💰 Refund Problems",
            description: "Delayed or missing refunds? Report here.",
            imgUrl: "https://images.pexels.com/photos/4968654/pexels-photo-4968654.jpeg?auto=compress&cs=tinysrgb&w=500"
          }
        ].map(({ segment, title, description, imgUrl }) => (
          <div
            key={segment}
            className="complaint-card"
            onClick={() => router.push(`/complaintform?segment=${segment}`)}
          >
            <img
              src={imgUrl}
              alt={`${segment} Issue`}
              className="complaint-img"
            />
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        ))}
      </div>

      <div className="view-complaints-section">
        <button 
          className="view-btn" 
          onClick={() => setShowComplaints((prev) => !prev)}
        >
          {showComplaints ? "your complaints" : "Check My Complaints"}
        </button>

        {showComplaints && (
          <div className="complaints-list">
            {loading ? (
              <p>Loading your complaints...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              complaints.map((complaint: any) => (
                <div key={complaint.id} className="complaint-item">
                  <h4>{complaint.complaint}</h4>
                  <div className="solution">
                    <strong>Solution:</strong>
                    {complaint.solution.length > 0
                      ? complaint.solution.map((sol: { id: string; solution: string }) => (
                        <div key={sol.id}>{sol.solution}</div>
                      ))
                      : "No solution provided yet"}
                  </div>
                  <div className="created-at">
                    <strong>Created At:</strong> {new Date(complaint.createdAt).toLocaleString()}
                  </div>
                  <span className={`complaint-status ${complaint.status.toLowerCase()}`}>
                    {complaint.status}
                  </span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
