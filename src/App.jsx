import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";

import { AppNav } from "./components/AppNav";
import { HomePage } from "./pages/HomePage";
import { ContactPage } from "./pages/ContactPage";
import { ContactDetailsPage } from "./pages/ContactDetailsPage";
import { MarketPage } from "./pages/MarketPage";
import { ContactEditPage } from "./pages/ContactEditPage";
import { SignUpPage } from "./pages/SignUpPage";

import { loadLoggedInUser } from "./store/actions/userActions";

import "./assets/styles/styles.scss";

export default function App() {
  const { loggedInUser } = useSelector((state) => state.userModule);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(loadLoggedInUser());
  }, []);

  useEffect(() => {
    console.log("loggedInUser changed!", loggedInUser);
    // setKey(prevState => prevState + 1)
    // setLoggedInUser(useSelector((state) => state.userModule).loggedUser)
  }, [loggedInUser]);

  // const PrivateRoute = (props) => {
  //   console.log('loggedInUser',loggedInUser)
  //   if(loggedInUser){
  //     console.log('true')
  //     return <Route {...props} />
  //   }
  //   console.log('false')
  //   return <Navigate to="/signup" replace />
  // };

  const ProtectedRoute = ({ children }) => {
    if (!loggedInUser) {
      return <Navigate to="/signup" replace />;
    }

    return children;
  };

  return (
    <section className="main-layout">
      <section className="app">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
            className="main"
          />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/contact">
            <Route
              index
              element={
                <ProtectedRoute>
                  <ContactPage />
                </ProtectedRoute>
              }
            />
            <Route
              path=":id"
              element={
                <ProtectedRoute>
                  <ContactDetailsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="edit/:id?"
              element={
                <ProtectedRoute>
                  <ContactEditPage />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            path="/market"
            element={
              <ProtectedRoute>
                <MarketPage />
              </ProtectedRoute>
            }
          />
        </Routes>
        {location.pathname !== "/signup" && <AppNav />}
      </section>
    </section>
  );
}
