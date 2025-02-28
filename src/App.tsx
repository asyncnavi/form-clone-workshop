import { UserProvider } from "./context/userContext";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from "./pages/home";
import FormPage from "./pages/form";

const router = createBrowserRouter([
    {
      path : "/", 
      element : <HomePage />
    }, {
      path  : "/form",
      element : <FormPage />
    }
])


const App = () => {
  return (
    <UserProvider>
        <RouterProvider router={router} />
    </UserProvider>
  );
};

export default App;
