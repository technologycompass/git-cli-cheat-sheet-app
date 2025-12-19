import React, { useState, useRef, useEffect } from 'react';
import { askGitAssistant } from '../services/geminiService';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { ChatMessage } from '../types';

const GitAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      role: 'user',
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await askGitAssistant(userMsg.text);
      const aiMsg: ChatMessage = {
        role: 'model',
        text: responseText,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 print:hidden">
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-105 flex items-center gap-2"
        >
          <MessageSquare size={24} />
          <span className="font-semibold hidden sm:inline">Ask AI Helper</span>
        </button>
      )}

      {isOpen && (
        <div className="bg-white rounded-xl shadow-2xl w-[90vw] sm:w-[400px] h-[500px] flex flex-col border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="bg-indigo-600 p-4 text-white flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <h3 className="font-bold">Git Assistant</h3>
            </div>
            <button onClick={toggleChat} className="text-indigo-100 hover:text-white">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.length === 0 && (
              <div className="text-center text-slate-500 mt-10">
                <Bot size={48} className="mx-auto mb-2 opacity-50" />
                <p>Hello! I'm your AI Git assistant.</p>
                <p className="text-sm">Ask me things like:</p>
                <ul className="text-sm mt-2 space-y-1">
                  <li className="bg-white p-2 rounded border border-slate-200 cursor-pointer hover:bg-slate-50" onClick={() => setInput("How do I undo the last commit?")}>"How do I undo the last commit?"</li>
                  <li className="bg-white p-2 rounded border border-slate-200 cursor-pointer hover:bg-slate-50" onClick={() => setInput("What is the difference between merge and rebase?")}>"Merge vs Rebase?"</li>
                </ul>
              </div>
            )}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === 'user' ? 'bg-indigo-100 text-indigo-600' : 'bg-green-100 text-green-600'
                  }`}
                >
                  {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                    msg.role === 'user'
                      ? 'bg-indigo-600 text-white rounded-tr-none'
                      : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none shadow-sm'
                  }`}
                >
                  {msg.role === 'model' ? (
                    <ReactMarkdown 
                        className="prose prose-sm prose-invert max-w-none prose-p:my-1 prose-pre:bg-slate-800 prose-pre:text-white prose-code:text-indigo-600 prose-code:bg-indigo-50 prose-code:px-1 prose-code:rounded"
                        components={{
                            code({node, className, children, ...props}: any) {
                                // Simple check to see if it's inline code or block
                                const match = /language-(\w+)/.exec(className || '')
                                const isInline = !match && !String(children).includes('\n');
                                
                                return isInline ? (
                                    <code className="bg-slate-200 text-slate-800 px-1 py-0.5 rounded font-mono" {...props}>
                                        {children}
                                    </code>
                                ) : (
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                )
                            }
                        }}
                    >
                        {msg.text}
                    </ReactMarkdown>
                  ) : (
                    msg.text
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                  <Bot size={16} />
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
                   <Loader2 size={16} className="animate-spin text-slate-400" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-slate-200 shrink-0">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about git commands..."
                className="w-full pl-4 pr-12 py-3 bg-slate-100 border-transparent focus:bg-white focus:border-indigo-500 rounded-full outline-none transition-all text-sm"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default GitAssistant;
