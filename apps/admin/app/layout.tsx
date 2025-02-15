import Providers from "./providers";
import "./styles/selectSegment.css"
import "./styles/modal.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
