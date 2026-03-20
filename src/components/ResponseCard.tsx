import { motion } from 'framer-motion';
import { AlertTriangle, Clock, TrendingUp } from 'lucide-react';

export interface TriageResponse {
  priority: 'critical' | 'moderate' | 'low';
  action: string;
  explanation: string;
  confidence: number;
  responseTime: number;
  timestamp: Date;
}

interface ResponseCardProps {
  response: TriageResponse | null;
}

const priorityConfig = {
  critical: {
    color: 'from-red-600 to-rose-600',
    bgColor: 'from-red-600/20 to-rose-600/20',
    borderColor: 'border-red-500/30',
    textColor: 'text-red-400',
    label: 'CRITICAL',
    icon: AlertTriangle,
  },
  moderate: {
    color: 'from-yellow-600 to-orange-600',
    bgColor: 'from-yellow-600/20 to-orange-600/20',
    borderColor: 'border-yellow-500/30',
    textColor: 'text-yellow-400',
    label: 'MODERATE',
    icon: AlertTriangle,
  },
  low: {
    color: 'from-green-600 to-emerald-600',
    bgColor: 'from-green-600/20 to-emerald-600/20',
    borderColor: 'border-green-500/30',
    textColor: 'text-green-400',
    label: 'LOW',
    icon: AlertTriangle,
  },
};

export default function ResponseCard({ response }: ResponseCardProps) {
  if (!response) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/20 shadow-2xl flex items-center justify-center min-h-[300px]"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-slate-500" />
          </div>
          <p className="text-slate-400">No analysis yet. Enter patient details to begin.</p>
        </div>
      </motion.div>
    );
  }

  const config = priorityConfig[response.priority];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/20 shadow-2xl"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">AI Triage Assessment</h3>
        <motion.div
          animate={response.priority === 'critical' ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 1, repeat: Infinity }}
          className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${config.bgColor} rounded-full border ${config.borderColor}`}
        >
          <Icon className={`w-5 h-5 ${config.textColor}`} />
          <span className={`text-sm font-bold ${config.textColor}`}>{config.label}</span>
        </motion.div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2 block">
            Recommended Action
          </label>
          <p className="text-lg font-bold text-white leading-relaxed">{response.action}</p>
        </div>

        <div>
          <label className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2 block">
            Clinical Reasoning
          </label>
          <p className="text-sm text-slate-300 leading-relaxed">{response.explanation}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-700/50">
          <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-700/30">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              <label className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                Confidence Score
              </label>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold text-white">{response.confidence}%</p>
              <div className="flex-1 bg-slate-800 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${response.confidence}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className={`h-full bg-gradient-to-r ${config.color}`}
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-700/30">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-cyan-400" />
              <label className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                Response Time
              </label>
            </div>
            <p className="text-2xl font-bold text-white">{response.responseTime}ms</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
