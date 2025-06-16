import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/";
import { Home, ResearcherDetail } from "@/pages";
import { GraphDataProvider } from "@/context";

const App: React.FC = () => {
  return (
    <GraphDataProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/researcher/:id" element={<ResearcherDetail />} />
          </Routes>
        </Layout>
      </Router>
    </GraphDataProvider>
  );
};

export default App;
