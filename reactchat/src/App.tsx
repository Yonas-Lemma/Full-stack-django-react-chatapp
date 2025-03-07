import { createBrowserRouter,Route,RouterProvider, createRoutesFromElements} from "react-router-dom";
import Home from "./assets/pages/Home";
import Explore from "./assets/pages/Home";
import { ThemeProvider } from "@mui/material/styles";
import {CreateMuiTheme} from "./theme/theme";



const routes = createRoutesFromElements(
<Route>
  <Route path="/" element={<Home/>} />
  <Route path="/explore/:categoryName" element={<Explore/>} />

</Route>
);


const router = createBrowserRouter(routes);

const App = ()=>{
  const theme = CreateMuiTheme();
  return (<ThemeProvider theme={theme}>
    <RouterProvider router={router}/>
    </ThemeProvider>);
};

export default App;
