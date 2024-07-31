import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Navbar from "./components/Navbar/Navbar";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user, authIsReady } = useContext(AuthContext);

  return (
    <div className="App">
      {authIsReady && (
        <>
          <Navbar />
          <Routes>
            {user && <Route path="/" Component={Home} />}
            {!user && (
              <>
                <Route path="/login" Component={Login} />
                <Route path="/signup" Component={Signup} />
              </>
            )}

            <Route
              path="*"
              element={
                user ? (
                  <Navigate to="/" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
