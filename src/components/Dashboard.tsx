import { useState } from 'react';
import InputCard from './InputCard';
import ResponseCard, { TriageResponse } from './ResponseCard';
import HistoryPanel from './HistoryPanel';

interface HistoryItem {
  id: string;
  summary: string;
  priority: 'critical' | 'moderate' | 'low';
  timestamp: Date;
}

const demoResponses: Record<string, TriageResponse> = {
  critical: {
    priority: 'critical',
    action: 'IMMEDIATE EMERGENCY INTERVENTION - Call Code Blue, prepare for cardiac catherization',
    explanation: 'Patient presenting with classic acute myocardial infarction symptoms: chest pain with radiation, diaphoresis, and dyspnea. Immediate cardiac assessment and intervention required to prevent further myocardial damage.',
    confidence: 94,
    responseTime: 234,
    timestamp: new Date(),
  },
  moderate: {
    priority: 'moderate',
    action: 'Urgent evaluation required - Admit to observation unit, monitor vital signs every 15 minutes',
    explanation: 'Symptoms suggest potential infection requiring urgent attention but not immediately life-threatening. Close monitoring and prompt antibiotic therapy recommended.',
    confidence: 87,
    responseTime: 198,
    timestamp: new Date(),
  },
  low: {
    priority: 'low',
    action: 'Standard outpatient care - Schedule follow-up appointment within 48 hours',
    explanation: 'Symptoms are mild and stable. No immediate danger indicators present. Conservative management with close follow-up is appropriate.',
    confidence: 91,
    responseTime: 176,
    timestamp: new Date(),
  },
};

export default function Dashboard() {
  const [response, setResponse] = useState<TriageResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: '1',
      summary: '67yo F, acute chest pain, SOB, radiation to jaw',
      priority: 'critical',
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: '2',
      summary: '34yo M, severe abdominal pain, fever 39.2°C',
      priority: 'moderate',
      timestamp: new Date(Date.now() - 7200000),
    },
    {
      id: '3',
      summary: '28yo F, minor laceration to hand, bleeding controlled',
      priority: 'low',
      timestamp: new Date(Date.now() - 10800000),
    },
  ]);

  const handleSubmit = (text: string) => {
    setIsLoading(true);
    setResponse(null);

    setTimeout(() => {
      let selectedResponse: TriageResponse;

      const lowerText = text.toLowerCase();
      if (lowerText.includes('chest pain') || lowerText.includes('heart') || lowerText.includes('cardiac')) {
        selectedResponse = demoResponses.critical;
      } else if (lowerText.includes('fever') || lowerText.includes('infection') || lowerText.includes('moderate')) {
        selectedResponse = demoResponses.moderate;
      } else {
        selectedResponse = demoResponses.low;
      }

      setResponse(selectedResponse);

      const newHistoryItem: HistoryItem = {
        id: Date.now().toString(),
        summary: text.substring(0, 60) + (text.length > 60 ? '...' : ''),
        priority: selectedResponse.priority,
        timestamp: new Date(),
      };

      setHistory([newHistoryItem, ...history]);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <InputCard onSubmit={handleSubmit} isLoading={isLoading} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ResponseCard response={response} />
        </div>
        <div className="lg:col-span-1">
          <HistoryPanel history={history} />
        </div>
      </div>
    </div>
  );
}
