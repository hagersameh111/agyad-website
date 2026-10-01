import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/Scrolltotop";
import Home from "./pages/Home";
import ProjectDetails from "./pages/ProjectDetails";
import ProjectsPage from "./pages/ProjectsPage";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </>
  );
}