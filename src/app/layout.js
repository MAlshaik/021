import { Kalam } from "next/font/google";
import './globals.css'

export const metadata = {
  title: '021',
  description: 'A community of builders at Michigan State University',
}

const kalam = Kalam({
    weight: "300",
    subsets: ["latin"],
});


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={kalam.className}>{children}</body>
    </html>
  )
}
