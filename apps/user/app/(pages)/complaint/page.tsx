"use client";
import { Segment } from "@repo/ui/segment";
import AppBar from "../../../components/appbar";
import { useRouter } from "next/navigation";

export default function Complaint() {
  const router = useRouter();

  return (
    <div className="complaint-page">
      {/* App Bar at the top */}
      <AppBar />

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Raise Your Complaint Easily</h1>
          <p className="hero-description">
            Select a category and let us help you resolve your issue.
          </p>
        </div>
      </div>

      {/* Complaint Categories */}
      <div className="complaint-section">
        <div className="complaint-card" onClick={() => router.push(`/complaintform?segment=delivery`)}>
          <img
            src="https://images.pexels.com/photos/4246110/pexels-photo-4246110.jpeg?auto=compress&cs=tinysrgb&w=500"
            alt="Delivery Issue"
            className="complaint-img"
          />
          <h3>📦 Delivery Issues</h3>
          <p>Report problems with your package or delays.</p>
        </div>

        <div className="complaint-card" onClick={() => router.push(`/complaintform?segment=customer care`)}>
          <img
            src="https://images.pexels.com/photos/8867430/pexels-photo-8867430.jpeg?auto=compress&cs=tinysrgb&w=500"
            alt="Customer Support"
            className="complaint-img"
          />
          <h3>☎️ Customer Care</h3>
          <p>Facing issues with support? Let us know.</p>
        </div>

        <div className="complaint-card" onClick={() => router.push(`/complaintform?segment=refund`)}>
          <img
            src="https://images.pexels.com/photos/4968654/pexels-photo-4968654.jpeg?auto=compress&cs=tinysrgb&w=500"
            alt="Refund Issue"
            className="complaint-img"
          />
          <h3>💰 Refund Problems</h3>
          <p>Delayed or missing refunds? Report here.</p>
        </div>
      </div>
    </div>
  );
}
