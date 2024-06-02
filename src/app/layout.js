import RenderAllModal from "@/Components/Home/Modal/RenderAllModal";
import Footer from "@/Components/Home/Utility/Footer";
import ResponsiveAppBar from "@/Components/Home/Utility/ResponsiveAppBar";
import { UserAuthContexProvider } from "@/Context/UserAuthContext";
import { UseStoreContextProvider } from "@/Context/UseStoreContext";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata = {
  title: "Wealth Summit",
  description: `We provide a wide range of digital resources designed to enhance your life and contribute to your overall well-being and prosperity. Our offerings are tailored to help you achieve financial success, improve your knowledge, and streamline your daily activities, ensuring that you can lead a more productive, fulfilling, and wealthy life.`,
  openGraph: {
    images: "/logo.jpg",
    title: "Wealth Summit",
    description: `We provide a wide range of digital resources designed to enhance your life and contribute to your overall well-being and prosperity. Our offerings are tailored to help you achieve financial success, improve your knowledge, and streamline your daily activities, ensuring that you can lead a more productive, fulfilling, and wealthy life.`,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en"  >
      <head>
        <link rel="shortcut icon" href="/logo.jpg" type="image/x-icon" />
        <link
          rel="stylesheet"
          href="https://unicons.iconscout.com/release/v4.0.8/css/line.css"
        />
      </head>
      <body className=" bg-ground bgPattern  min-h-screen text-white">
        <UseStoreContextProvider>
          <UserAuthContexProvider>
            <RenderAllModal />
            <Toaster position="top-center" reverseOrder={false} />
            {children}
            <Footer />
          </UserAuthContexProvider>
        </UseStoreContextProvider>{" "}
      </body>
    </html>
  );
}
