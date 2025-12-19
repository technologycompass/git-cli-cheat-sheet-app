import React from 'react';
import { GitCommand } from '../types';
import { Terminal, Copy, Check } from 'lucide-react';

interface CommandCardProps {
  command: GitCommand;
}

const CommandCard: React.FC<CommandCardProps> = ({ command }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(command.example);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5 hover:shadow-md transition-shadow break-inside-avoid mb-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-bold text-slate-800 font-mono bg-slate-100 px-2 py-1 rounded">
          {command.cmd}
        </h3>
        <button
          onClick={handleCopy}
          className="text-slate-400 hover:text-slate-600 transition-colors p-1"
          title="Copy example"
        >
          {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
        </button>
      </div>
      
      <p className="text-slate-600 text-sm mb-4">{command.description}</p>
      
      {command.flags.length > 0 && (
        <div className="mb-4">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Common Flags</span>
          <ul className="mt-2 space-y-1">
            {command.flags.map((flag, idx) => (
              <li key={idx} className="text-sm flex flex-col sm:flex-row sm:items-baseline gap-1">
                <span className="font-mono text-indigo-600 font-medium whitespace-nowrap">{flag.flag}</span>
                <span className="text-slate-500 text-xs sm:text-sm">- {flag.description}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="bg-slate-900 rounded-md p-3 relative group">
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
           <Terminal size={14} className="text-slate-500" />
        </div>
        <code className="text-green-400 font-mono text-sm block overflow-x-auto">
          $ {command.example}
        </code>
      </div>
    </div>
  );
};

export default CommandCard;
