import ChatPage from "./pages/Chat/ChatPage";
import HomePage from "./pages/Home/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/chatpage" element={<ChatPage />} />
      </Routes>
    </Router>
  );
}

export default App;
