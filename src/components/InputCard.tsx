import { motion } from 'framer-motion';
import { Mic, Send, AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface InputCardProps {
  onSubmit: (text: string) => void;
  isLoading: boolean;
}

export default function InputCard({ onSubmit, isLoading }: InputCardProps) {
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleSubmit = () => {
    if (input.trim()) {
      onSubmit(input);
      setInput('');
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/20 shadow-2xl"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg shadow-lg shadow-blue-500/30">
          <AlertCircle className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white">Patient Condition Input</h3>
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Describe patient symptoms and condition in detail...&#10;&#10;Example: 45-year-old male, chest pain, shortness of breath, sweating, pain radiating to left arm..."
        disabled={isLoading}
        className="w-full h-40 bg-slate-950/50 border border-slate-700/50 rounded-xl p-4 text-white placeholder-slate-500 resize-none focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-50"
      />

      <div className="flex gap-3 mt-4">
        <motion.button
          onClick={toggleListening}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isLoading}
          className={`
            flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed
            ${isListening
              ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-500/30'
              : 'bg-slate-800/50 text-slate-300 hover:bg-slate-800 border border-slate-700/50'
            }
          `}
        >
          <Mic className={`w-5 h-5 ${isListening ? 'animate-pulse' : ''}`} />
          <span>{isListening ? 'Listening...' : 'Voice Input'}</span>
        </motion.button>

        {isListening && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-1"
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  height: [10, 30, 10],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
                className="w-1 bg-gradient-to-t from-red-600 to-rose-400 rounded-full"
              />
            ))}
          </motion.div>
        )}

        <motion.button
          onClick={handleSubmit}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isLoading || !input.trim()}
          className="ml-auto flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Analyze</span>
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}
