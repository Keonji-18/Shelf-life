import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from "./components/Home.tsx";
import SignIn from "./components/SignIn.tsx";
import SignUp from "./components/SignUp.tsx";
import {ThemeProvider} from "@/components/theme-provider.tsx";
import axios from "axios";
import Logout from "@/components/Logout.tsx";

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

        </Routes>

      </Router>

    </ThemeProvider>
  </>)
}