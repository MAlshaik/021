import './globals.css'
import { Kalam } from "next/font/google";

const kalam = Kalam({
    weight: "300",
    subsets: ["latin"],
});

export const metadata = {
  title: '021',
  description: 'A community of builders at Michigan State University',
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={kalam.className}>{children}</body>
    </html>
  )
}
