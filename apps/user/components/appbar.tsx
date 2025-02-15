"use client";

import { usePathname } from "next/navigation";

export default function AppBar() {
  const pathname = usePathname();

  return (
    <header className="appbar">
      <div className="logo">
        <a href="/">Complaint Portal</a>
      </div>
      <nav>
        {pathname !== "/complaint" && <a href="/complaint">Register</a>}
        {pathname !== "/about" && <a href="/about">About</a>}
        {pathname.startsWith("/complaintform") && <a href="/">Home</a>}
      </nav>
    </header>
  );
}
