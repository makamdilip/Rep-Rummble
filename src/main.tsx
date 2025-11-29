import { StrictMode, Suspense } from "react";
import { AuthProvider } from "./context/AuthContext";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./context/ThemeContext";
import { AppDataProvider } from "./context/AppDataContext";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <BrowserRouter>
          <Suspense fallback={null}>
            <AuthProvider>
              <AppDataProvider>
                <App />
              </AppDataProvider>
            </AuthProvider>
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>
);
