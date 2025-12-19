import React, { useState, useRef } from 'react';
import { GIT_CATEGORIES } from './constants';
import CommandCard from './components/CommandCard';
import GitAssistant from './components/GitAssistant';
import { Search, Download, Github, Command } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const filteredCategories = GIT_CATEGORIES.map(category => ({
    ...category,
    commands: category.commands.filter(cmd => 
      cmd.cmd.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cmd.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cmd.flags.some(f => f.flag.includes(searchTerm.toLowerCase()) || f.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  })).filter(category => category.commands.length > 0);

  const handleDownloadPdf = async () => {
    if (!contentRef.current) return;
    setIsGeneratingPdf(true);

    try {
      const element = contentRef.current;
      const canvas = await html2canvas(element, {
        scale: 2, // Improve quality
        useCORS: true,
        backgroundColor: '#ffffff',
        windowWidth: 1200 // Force desktop width for consistency
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('git-cheat-sheet.pdf');
    } catch (error) {
      console.error('PDF Generation failed', error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Sticky Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-2 rounded-lg text-white">
                <Github size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">GitMaster</h1>
                <p className="text-xs text-slate-500 font-medium">Interactive Cheat Sheet</p>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-1 max-w-2xl">
              <div className="relative flex-1 group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                <input
                  type="text"
                  placeholder="Search commands (e.g., 'commit', 'undo', 'branch')..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border-transparent focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl transition-all outline-none"
                />
              </div>
              
              <button
                onClick={handleDownloadPdf}
                disabled={isGeneratingPdf}
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-medium transition-colors shadow-sm disabled:opacity-70 whitespace-nowrap"
              >
                {isGeneratingPdf ? (
                    <span className="animate-pulse">Generating...</span>
                ) : (
                    <>
                        <Download size={18} />
                        <span className="hidden sm:inline">Download PDF</span>
                    </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Printable Area Wrapper */}
        <div ref={contentRef} className="bg-slate-50 p-2 md:p-8"> 
           {/* Add a specific header for PDF only that usually hides */}
           <div className="hidden print-header mb-8 text-center">
              <h1 className="text-4xl font-bold mb-2">Git Cheat Sheet</h1>
              <p className="text-slate-500">Generated by GitMaster</p>
           </div>

          {filteredCategories.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Command size={32} className="text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">No commands found</h3>
              <p className="text-slate-500 max-w-md mx-auto mt-2">
                Try adjusting your search terms or ask the AI Assistant for help with specific scenarios.
              </p>
              <button 
                onClick={() => setSearchTerm('')}
                className="mt-6 text-indigo-600 font-medium hover:text-indigo-800"
              >
                Clear search
              </button>
            </div>
          ) : (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {filteredCategories.map((category) => (
                <div key={category.id} className="break-inside-avoid-column">
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-2 pb-2 border-b border-slate-200">
                      <span className="w-2 h-8 bg-indigo-500 rounded-full inline-block"></span>
                      {category.title}
                    </h2>
                    <p className="text-sm text-slate-500 mb-4">{category.description}</p>
                    <div className="flex flex-col gap-4">
                      {category.commands.map((cmd) => (
                        <CommandCard key={cmd.cmd} command={cmd} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-12 pt-8 border-t border-slate-200 text-center text-slate-400 text-sm">
             <p>GitMaster Cheat Sheet &copy; {new Date().getFullYear()}</p>
          </div>
        </div>

      </main>

      <GitAssistant />
    </div>
  );
};

export default App;
