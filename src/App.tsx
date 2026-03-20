import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 relative overflow-hidden">
      <div className="ecg-background"></div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent"></div>

      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <Navbar />

      <main className="ml-64 pt-20 p-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'analysis' && (
            <div className="bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl rounded-2xl p-12 border border-blue-500/20 shadow-2xl text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Patient Analysis Module</h2>
              <p className="text-slate-400">Advanced analytics and detailed patient assessment coming soon...</p>
            </div>
          )}
          {activeTab === 'voice' && (
            <div className="bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl rounded-2xl p-12 border border-blue-500/20 shadow-2xl text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Voice Assistant</h2>
              <p className="text-slate-400">Hands-free voice-activated triage assistant coming soon...</p>
            </div>
          )}
          {activeTab === 'history' && (
            <div className="bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl rounded-2xl p-12 border border-blue-500/20 shadow-2xl text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Full History</h2>
              <p className="text-slate-400">Complete case history and analytics dashboard coming soon...</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
