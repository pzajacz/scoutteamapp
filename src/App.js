import './App.css';
import WalletsPage from "./pages/WalletsPage";
import {Container} from "@mui/material";
import {Routes, Route} from "react-router-dom";
import WalletPage from "./pages/WalletPage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import MainMenu from "./components/MainMenu";
import ProfileEditPage from "./pages/ProfileEditPage";
import WalletEditPage from "./pages/WalletEditPage";
import {useAuth} from "./hooks/useAuth";

function App() {
  const {authToken} = useAuth()
  console.log(authToken);
  return (
    <Container maxWidth="xs">
    { authToken !== false ? (<MainMenu/>) : null}
     <Routes>
       <Route path="/" element={<LoginPage/>} />
       <Route path="/registration" element={<RegistrationPage/>} />
       <Route path="/settings" element={<ProfileEditPage/>} />
       <Route path="/wallets" element={<WalletsPage/>} />
       <Route path="/wallet/:id" element={<WalletPage/>} />
       <Route path="/walletedit/:id" element={<WalletEditPage/>} />
     </Routes>
    </Container>
  );
}

export default App;
