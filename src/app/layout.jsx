// app/layout.js
"use client";
import { AuthProvider } from "./contextmodule/Context/_AuthContext";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import store from "./redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@coreui/coreui/dist/css/coreui.css"; // ✅ correct
export default function RootLayout({ children }) {
  useEffect(() => {
    // Dynamically import Bootstrap JS once the component is mounted
    import("bootstrap/dist/js/bootstrap.bundle.js");
  }, []); // Empty dependency array ensures this effect only runs once after the component mounts
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <AuthProvider>{children}</AuthProvider>
          </Provider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
