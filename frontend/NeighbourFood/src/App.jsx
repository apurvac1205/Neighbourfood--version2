import {Routes,Route} from "react-router-dom";

import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import VendorDashboard from "./pages/VendorDashboard/VendorDashboard";
import NGODashboard from "./pages/NGODashboard/NGODashboard";

export default function App(){

return(

<Routes>

<Route path="/" element={<Landing/>}/>

<Route path="/login" element={<Login/>}/>

<Route path="/register" element={<Register/>}/>

<Route path="/vendor" element={<VendorDashboard/>}/>

<Route path="/ngo" element={<NGODashboard/>}/>

</Routes>

);

}