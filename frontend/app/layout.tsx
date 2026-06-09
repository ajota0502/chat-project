import type { Metadata } from "next";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Chat App",
  description: "Prueba técnica",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}