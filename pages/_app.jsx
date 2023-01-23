import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "next-themes";
import "../styles/globals.css";
// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default MyApp;
