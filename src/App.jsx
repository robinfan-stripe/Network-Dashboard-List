import { Routes, Route } from 'react-router-dom';
import { Sidebar, Header } from './components/PlatformLayout';

// Pages
import Home from './pages/Home';
import Balances from './pages/Balances';
import Transactions from './pages/Transactions';
import Directory from './pages/Directory';
import ProductCatalog from './pages/ProductCatalog';
import Payments from './pages/Payments';
import Billing from './pages/Billing';
import Reporting from './pages/Reporting';
import ConnectOverview from './pages/ConnectOverview';
import ConnectedAccounts from './pages/ConnectedAccounts';
import EmbeddedFinance from './pages/EmbeddedFinance';

export default function App() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="flex flex-row flex-1 min-h-0 bg-white">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area - outer div handles scroll, inner div handles max-width */}
        <div className="w-full flex flex-col min-w-0 relative overflow-auto">
          <div className="max-w-[1280px] w-full mx-auto">
            {/* Header */}
            <Header sticky />

            {/* Content */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/balances" element={<Balances />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/directory" element={<Directory />} />
              <Route path="/product-catalog" element={<ProductCatalog />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/billing" element={<Billing />} />
              <Route path="/reporting" element={<Reporting />} />
              <Route path="/connect" element={<ConnectOverview />} />
              <Route path="/connect/accounts" element={<ConnectedAccounts />} />
              <Route path="/embedded-finance" element={<EmbeddedFinance />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}
