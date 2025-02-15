"use client";
import AppBar from "../components/appbar";

export default function HomePage() {
  return (
    <div className="homepage">
      {/* App Bar */}
      <AppBar />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Effortless Complaint Registration</h1>
          <p>File your complaints quickly and track resolutions in real-time.</p>
          <a href="/complaint" className="btn">Register a Complaint</a>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature">
          
          <h3>24/7 Support</h3>
          <p>Our team is available round the clock to address your issues.</p>
        </div>
        <div className="feature">
          
          <h3>Secure System</h3>
          <p>Your data is encrypted and protected for complete security.</p>
        </div>
        <div className="feature">
          
          <h3>Easy Tracking</h3>
          <p>Track your complaints and receive live updates on progress.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Complaint Portal. All Rights Reserved.</p>
        <img src="https://source.unsplash.com/150x50/?logo,brand" alt="Company Logo" />
      </footer>
    </div>
  );
}
