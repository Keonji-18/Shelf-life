import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from "./components/Home.tsx";
import SignIn from "./components/SignIn.tsx";
import SignUp from "./components/SignUp.tsx";
import {ThemeProvider} from "@/components/theme-provider.tsx";

export default function App(){

  return (<>
    <ThemeProvider defaultTheme={"dark"} storageKey="vite-ui-theme">
      <Router>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

        </Routes>

      </Router>

    </ThemeProvider>
  </>)
}