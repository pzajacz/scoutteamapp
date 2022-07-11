import './App.css';
import WalletsPage from "./pages/WalletsPage";
import {Container} from "@mui/material";
import {Routes, Route} from "react-router-dom";
import WalletPage from "./pages/WalletPage";
import LoginPage from "./pages/LoginPage";
import LoginPageFormik from "./pages/LoginPageFormik";
import RegistrationPage from "./pages/RegistrationPage";
import MainMenu from "./components/MainMenu";
import ProfileEditPage from "./pages/ProfileEditPage";
import WalletAddPage from "./pages/WalletAddPage";
import {useAuth} from "./hooks/useAuth";
import WalletEditPageFormik from "./pages/WalletEditPageFormik";

function App() {
  const {authToken} = useAuth()
  console.log(authToken);
  return (
    <Container maxWidth="xs">
    { authToken !== false ? (<MainMenu/>) : null}
     <Routes>
       <Route path="/" element={<LoginPage/>} />
       <Route path="/login" element={<LoginPageFormik/>} />
       <Route path="/registration" element={<RegistrationPage/>} />
       <Route path="/settings" element={<ProfileEditPage/>} />
       <Route path="/wallets" element={<WalletsPage/>} />
       <Route path="/wallet/:id" element={<WalletPage/>} />
       <Route path="/addwallet" element={<WalletAddPage/>} />
       <Route path="/walleteditformik/:id" element={<WalletEditPageFormik/>} />
     </Routes>
    </Container>
  );
}

export default App;
