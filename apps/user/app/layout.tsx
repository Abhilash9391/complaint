

import "./styles/globals.css"; 
import "./styles/all.css"
import "./styles/appbar.css"
import "./styles/home.css"
import "./styles/complaintform.css"
import "./styles/complaint.css"
import Providers from "./providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
