// app/layout.js
'use client'
import { AuthProvider } from "./contextmodule/Context/_AuthContext";
import { useEffect } from "react";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import store from "./redux/store";

export default function RootLayout({ children }) {
  useEffect(() => {
    // Dynamically import Bootstrap JS once the component is mounted
    import("bootstrap/dist/js/bootstrap.bundle.js");
  }, []); // Empty dependency array ensures this effect only runs once after the component mounts

  return (
    <html lang="en">
      <body>
        <Provider store={store}>

        <AuthProvider>{children}</AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
