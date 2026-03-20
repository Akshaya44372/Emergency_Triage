import { motion } from 'framer-motion';
import { Bell, User } from 'lucide-react';

export default function Navbar() {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="fixed top-0 left-64 right-0 h-20 bg-slate-900/80 backdrop-blur-xl border-b border-blue-500/20 z-40"
    >
      <div className="h-full px-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Emergency Triage Dashboard</h2>
          <p className="text-sm text-slate-400">Real-time patient assessment and prioritization</p>
        </div>

        <div className="flex items-center gap-4">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-full border border-green-500/30"
          >
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
            <span className="text-sm font-semibold text-green-400">AI Live</span>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-3 bg-slate-800/50 rounded-xl hover:bg-slate-800 transition-colors border border-slate-700/50"
          >
            <Bell className="w-5 h-5 text-slate-400" />
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-red-500/50">
              3
            </div>
          </motion.button>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 px-4 py-2 bg-slate-800/50 rounded-xl cursor-pointer hover:bg-slate-800 transition-colors border border-slate-700/50"
          >
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-white">Dr. Smith</p>
              <p className="text-xs text-slate-400">Administrator</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
