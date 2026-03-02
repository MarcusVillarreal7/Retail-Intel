import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import WelcomeModal from "./components/WelcomeModal";
import ExecutiveOverview from "./pages/ExecutiveOverview";
import ChannelMix from "./pages/ChannelMix";
import InventoryAging from "./pages/InventoryAging";
import ClientRetention from "./pages/ClientRetention";
import WholesaleDoors from "./pages/WholesaleDoors";

export default function App() {
  return (
    <div className="flex min-h-screen bg-bg-primary">
      <WelcomeModal />
      <Sidebar />
      <main className="flex-1 ml-60 p-8">
        <Routes>
          <Route path="/" element={<ExecutiveOverview />} />
          <Route path="/channels" element={<ChannelMix />} />
          <Route path="/inventory" element={<InventoryAging />} />
          <Route path="/retention" element={<ClientRetention />} />
          <Route path="/wholesale" element={<WholesaleDoors />} />
        </Routes>
      </main>
    </div>
  );
}
