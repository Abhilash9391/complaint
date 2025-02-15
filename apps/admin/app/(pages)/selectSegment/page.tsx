"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSegmentClick = (segment: string) => {
    router.push(`/giveSolutions?segment=${encodeURIComponent(segment)}`);
  };

  return (
    <div className="admin-container">
     
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>View and manage complaints by category.</p>
      </header>

     
      <section className="segment-section">
        {["delivery", "customer care", "refund"].map((segment) => (
          <div key={segment} className="segment-card" onClick={() => handleSegmentClick(segment)}>
            <img
              src={
                segment === "delivery"
                  ? "https://images.pexels.com/photos/4246110/pexels-photo-4246110.jpeg?auto=compress&cs=tinysrgb&w=500"
                  : segment === "customer care"
                  ? "https://images.pexels.com/photos/8867430/pexels-photo-8867430.jpeg?auto=compress&cs=tinysrgb&w=500"
                  : "https://images.pexels.com/photos/4968654/pexels-photo-4968654.jpeg?auto=compress&cs=tinysrgb&w=500"
              }
              alt={`${segment} Issues`}
              className="segment-image"
            />
            <div className="segment-info">
              <h3>
                {segment === "delivery"
                  ? "📦 Delivery Issues"
                  : segment === "customer care"
                  ? "☎️ Customer Care"
                  : "💰 Refund Problems"}
              </h3>
              <p>
                {segment === "delivery"
                  ? "Problems with package delivery"
                  : segment === "customer care"
                  ? "Facing support issues"
                  : "Delayed or missing refunds"}
              </p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
