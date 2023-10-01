import {
  Route,
  Routes,
  Navigate,
  BrowserRouter,
  useNavigate,
} from "react-router-dom";
import { PathConstants } from "./utils/constants";
import { Toaster } from "react-hot-toast";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Loader from "./ui/Loader";
import ProtectedRoute from "./ui/ProtectedRoute";
import { DarkThemeProvider } from "./context/useContextDarkMode";
import GlobalStyle from "./assets/styles/GlobalStyles";
import { StyleSheetManager } from "styled-components";

const AppLayout = lazy(() => import("./ui/AppLayout.jsx"));
const Cabins = lazy(() => import("./pages/Cabins.jsx"));
const Settings = lazy(() => import("./pages/Settings"));
const User = lazy(() => import("./pages/User"));
const Bookings = lazy(() => import("./pages/Bookings"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const DetailsBookings = lazy(() => import("./pages/DetailsBookings"));
const CheckInOut = lazy(() => import("./pages/CheckInOut"));
const Login = lazy(() => import("./pages/Login"));
const Account = lazy(() => import("./pages/Account"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});
const shouldForwardProp = (prop) => !prop.startsWith("$");
const ReactQueryDevtoolsProduction = lazy(() =>
  import('@tanstack/react-query-devtools/build/lib/index.prod.js').then(
    (d) => ({
      default: d.ReactQueryDevtools,
    }),
  ),
)


function App() {
  const [showDevtools, setShowDevtools] = useState(false)

  useEffect(() => {
    // @ts-ignore
    window.toggleDevtools = () => setShowDevtools((old) => !old)
  }, [])
  
  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <DarkThemeProvider>
           <QueryClientProvider client={queryClient} contextSharing={true}>
          <ReactQueryDevtools initialIsOpen={false} />
          {showDevtools && (
        <React.Suspense fallback={null}>
          <ReactQueryDevtoolsProduction />
        </React.Suspense>
      )}
<GlobalStyle />
           <BrowserRouter>
             <Routes>
               <Route
                element={
                  <Suspense fallback={<Loader />}>
                    <ProtectedRoute>
                      <AppLayout />
                    </ProtectedRoute>
                  </Suspense>
                }
              >
                <Route
                  index
                  element={<Navigate replace to={PathConstants.DASHBOARD} />}
                />
                <Route path={PathConstants.DASHBOARD} element={<Dashboard />} />
                <Route path={PathConstants.ACCOUNT} element={<Account />} />
                <Route path={PathConstants.BOOKINGS} element={<Bookings />} />
                <Route
                  path={PathConstants.DETAILSBOOKING}
                  element={<DetailsBookings />}
                />
                <Route
                  path={PathConstants.DETAILSCHECKIN}
                  element={<CheckInOut />}
                />
                <Route path={PathConstants.CABINS} element={<Cabins />} />
                <Route path={PathConstants.USERS} element={<User />} />
                <Route path={PathConstants.SETTINGS} element={<Settings />} />
              </Route>
              <Route
                path={PathConstants.LOGIN}
                element={
                  <Suspense fallback={<Loader />}>
                    <Login />
                  </Suspense>
                }
              />
              <Route
                path={PathConstants.NOTFOUND}
                element={
                  <Suspense fallback={<Loader />}>
                    <p>NOTFOUND</p>
                  </Suspense>
                }
              />
            </Routes>
          </BrowserRouter>
          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={12}
            containerStyle={{ margin: "1rem" }}
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
              },
              style: {
                fontSize: "1.6rem",
                maxWidth: "fit-content",
                padding: "1.6rem 2.4rem",
                backgroundColor: "var(--color-grey-0)",
                color: "var(--color-grey-700)",
              },
            }}
          />
        </QueryClientProvider>
      </DarkThemeProvider>
    </StyleSheetManager>
  );
}

export default App;
