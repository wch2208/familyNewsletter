import ChatPage from "./pages/ChatPage";
import HomePage from "./pages/HomePage";
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
