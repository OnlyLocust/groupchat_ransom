
// import { Geist, Geist_Mono } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import { ReduxProvider } from "@/lib/ReduxProvider";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <ReduxProvider>
          <ToastContainer />
        {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
