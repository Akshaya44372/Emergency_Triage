import { motion } from 'framer-motion';
import { Clock, AlertTriangle, Activity } from 'lucide-react';

interface HistoryItem {
  id: string;
  summary: string;
  priority: 'critical' | 'moderate' | 'low';
  timestamp: Date;
}

interface HistoryPanelProps {
  history: HistoryItem[];
}

const priorityColors = {
  critical: 'bg-red-500/20 text-red-400 border-red-500/30',
  moderate: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  low: 'bg-green-500/20 text-green-400 border-green-500/30',
};

const priorityLabels = {
  critical: 'CRITICAL',
  moderate: 'MODERATE',
  low: 'LOW',
};

export default function HistoryPanel({ history }: HistoryPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/20 shadow-2xl"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-lg shadow-lg shadow-cyan-500/30">
          <Activity className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white">Recent Cases</h3>
        <span className="ml-auto text-sm font-semibold text-slate-400">
          {history.length} total
        </span>
      </div>

      {history.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-slate-500" />
          </div>
          <p className="text-slate-400">No case history yet</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          {history.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.02, x: 4 }}
              className="bg-slate-950/50 rounded-xl p-4 border border-slate-700/30 cursor-pointer hover:border-blue-500/30 transition-all"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <p className="text-sm text-slate-300 flex-1 line-clamp-2">{item.summary}</p>
                <span
                  className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold border ${priorityColors[item.priority]}`}
                >
                  <AlertTriangle className="w-3 h-3" />
                  {priorityLabels[item.priority]}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Clock className="w-3 h-3" />
                <span>
                  {item.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}{' '}
                  - {item.timestamp.toLocaleDateString()}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
