import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Sidebar, Header } from './components/PlatformLayout';
import ControlPanel from './components/ControlPanel';

// Pages
import Home from './pages/Home';
import Balances from './pages/Balances';
import Transactions from './pages/Transactions';
import Directory from './pages/Directory';
import ProductCatalog from './pages/ProductCatalog';
import ConnectOverview from './pages/ConnectOverview';
import ConnectedAccounts from './pages/ConnectedAccounts';
import EmbeddedFinance from './pages/EmbeddedFinance';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`min-h-screen bg-surface ${darkMode ? 'dark' : ''}`}>
      <ControlPanel darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)} />

      <div className="flex flex-col min-h-screen">
        <div className="flex flex-row flex-1 bg-surface">
          {/* Sidebar */}
          <Sidebar />

          {/* Header - fixed */}
          <Header />

          {/* Main Content Area - offset for fixed sidebar and header */}
          <div className="ml-sidebar-width pt-[60px] flex flex-col min-w-0 flex-1 relative scrollbar-auto">
            <div className="max-w-[1280px] w-full mx-auto">

              {/* Content */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/balances" element={<Balances />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/directory" element={<Directory />} />
                <Route path="/product-catalog" element={<ProductCatalog />} />
                <Route path="/connect" element={<ConnectOverview />} />
                <Route path="/connect/accounts" element={<ConnectedAccounts />} />
                <Route path="/embedded-finance" element={<EmbeddedFinance />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
