import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ContactList from "./pages/ContactLists";
import ContactDetails from "./pages/ContactDetails";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/contacts"
          element={<ContactList />}
        />
        <Route
          path="/contact/details/:id"
          element={<ContactDetails />}
        />
        <Route
          path="*"
          element={
            <Navigate
              to="/contacts"
              replace
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
