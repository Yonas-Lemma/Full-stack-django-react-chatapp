import { createBrowserRouter,Route,RouterProvider, createRoutesFromElements} from "react-router-dom";
import Home from "./assets/pages/Home";
import Explore from "./assets/pages/Home";

import ToggleColorMode from "./assets/components/ToggleColorMode";
import Server from "./assets/pages/Server";



const routes = createRoutesFromElements(
<Route>
  <Route path="/" element={<Home/>} />
  <Route path="/server" element={<Server/>} />
  <Route path="/explore/:categoryName" element={<Explore/>} />

</Route>
);


const router = createBrowserRouter(routes);

const App = ()=>{
  return (
    <ToggleColorMode>
    <RouterProvider router={router} />
    </ToggleColorMode>
);
};

export default App;
