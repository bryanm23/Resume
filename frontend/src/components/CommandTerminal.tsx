import React, { useState, useRef, useEffect } from 'react';

interface Command {
  input: string;
  output: string | JSX.Element;
  timestamp: Date;
}

interface CommandTerminalProps {
  onNavigate: (section: string) => void;
  onFilter: (category: string) => void;
  onSearch: (term: string) => void;
}

const CommandTerminal: React.FC<CommandTerminalProps> = ({ onNavigate, onFilter, onSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Command[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands = {
    help: () => ({
      output: (
        <div className="space-y-1">
          <p className="text-cyan-400">Available commands:</p>
          <p className="text-gray-300">goto [section] - Navigate to a section (projects/skills/experience/education)</p>
          <p className="text-gray-300">filter [category] - Filter skills or projects by category</p>
          <p className="text-gray-300">search [term] - Search through the resume</p>
          <p className="text-gray-300">clear - Clear terminal history</p>
          <p className="text-gray-300">help - Show this help message</p>
        </div>
      )
    }),
    goto: (section: string) => {
      const validSections = ['projects', 'skills', 'experience', 'education'];
      if (validSections.includes(section.toLowerCase())) {
        onNavigate(section.toLowerCase());
        return { output: `Navigating to ${section}...` };
      }
      return { output: 'Invalid section. Use: projects, skills, experience, or education' };
    },
    filter: (category: string) => {
      onFilter(category);
      return { output: `Filtering by category: ${category}` };
    },
    search: (term: string) => {
      onSearch(term);
      return { output: `Searching for: ${term}` };
    },
    clear: () => {
      setHistory([]);
      return { output: '' };
    }
  };

  const executeCommand = (cmd: string) => {
    const parts = cmd.trim().split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');

    let result: { output: string | JSX.Element } = {
      output: 'Command not found. Type "help" for available commands.'
    };

    if (command in commands) {
      result = commands[command as keyof typeof commands](args);
    }

    setHistory(prev => [...prev, { input: cmd, output: result.output, timestamp: new Date() }]);
    setInput('');
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim()) {
      executeCommand(input.trim());
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex].input);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex].input);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const toggleTerminal = () => {
    setIsOpen(!isOpen);
    if (!isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  return (
    <>
      <button
        onClick={toggleTerminal}
        className="fixed bottom-4 right-4 bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 p-2 rounded-lg hover:bg-cyan-500/30 transition-all duration-200 z-50"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </button>

      <div className="fixed bottom-16 right-4 w-96 h-96 z-50">
        {isOpen && (
          <div
            className="w-full h-full bg-gray-900/95 border border-cyan-500/30 rounded-lg shadow-lg overflow-hidden"
            style={{ opacity: 1, transform: 'translateY(0)' }}
          >
            <div className="flex items-center justify-between p-2 bg-cyan-500/20 border-b border-cyan-500/30">
              <span className="text-cyan-400 text-sm">Terminal</span>
              <button onClick={toggleTerminal} className="text-cyan-400 hover:text-cyan-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div ref={terminalRef} className="p-4 h-[calc(100%-4rem)] overflow-y-auto font-mono">
              {history.map((cmd, i) => (
                <div key={i} className="mb-4">
                  <div className="flex items-center text-sm">
                    <span className="text-cyan-500">$</span>
                    <span className="text-gray-400 ml-2">{cmd.input}</span>
                  </div>
                  <div className="mt-1 text-sm">{cmd.output}</div>
                </div>
              ))}
              <div className="flex items-center text-sm">
                <span className="text-cyan-500">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 ml-2 bg-transparent text-gray-300 focus:outline-none"
                  placeholder="Type 'help' for commands..."
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CommandTerminal; 