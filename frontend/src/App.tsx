import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from "./pages/Home.tsx";
import SignIn from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";
import {ThemeProvider} from "@/components/theme-provider.tsx";
import axios from "axios";
import Logout from "@/pages/Logout.tsx";
import {EmptyHousehold} from "@/pages/EmptyHousehold.tsx";

axios.defaults.withCredentials = true;
export default function App(){

  return (<>
    <ThemeProvider defaultTheme={"dark"} storageKey="vite-ui-theme">
      <Router>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path='/logout' element={<Logout />} />
          <Route path={'/households/member'} element={<EmptyHousehold/>} />

        </Routes>

      </Router>

    </ThemeProvider>
  </>)
}