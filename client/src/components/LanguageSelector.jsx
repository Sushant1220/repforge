import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Check, ChevronDown, X } from 'lucide-react';
import { LANGUAGES } from '../i18n';

export const LanguageSelector = ({ variant = 'default' }) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const dropdownRef = useRef(null);

  const currentLang = LANGUAGES.find(l => l.code === i18n.language) || LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang.code);
    setIsOpen(false);

    // Toast confirmation
    setToastMessage(`Language changed to ${lang.nativeName}`);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#ccff00] text-black font-heading font-extrabold text-xs px-4 py-2.5 rounded-2xl shadow-[0_0_20px_rgba(204,255,0,0.4)] flex items-center gap-2 animate-bounce">
          <Globe className="w-4 h-4 text-black" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
          variant === 'compact'
            ? 'bg-white/5 border-white/10 hover:border-white/20 text-xs text-gray-200'
            : 'bg-white/5 border-white/10 hover:border-[#ccff00]/40 text-xs font-bold text-white hover:text-[#ccff00]'
        }`}
        aria-label="Select Language"
      >
        <Globe className="w-4 h-4 text-[#ccff00]" />
        <span className="flex items-center gap-1.5">
          <span>{currentLang.flag}</span>
          <span className="font-semibold">{currentLang.nativeName}</span>
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu / Bottom Sheet */}
      {isOpen && (
        <>
          {/* Desktop & Tablet Dropdown */}
          <div className="hidden sm:block absolute right-0 mt-2 w-56 rounded-2xl bg-[#121318] border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-50 py-2 overflow-hidden backdrop-blur-xl max-h-80 overflow-y-auto custom-scrollbar">
            <div className="px-3 py-1.5 border-b border-white/10 mb-1 flex items-center justify-between">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Select Language</span>
              <Globe className="w-3.5 h-3.5 text-[#ccff00]" />
            </div>

            {LANGUAGES.map((lang) => {
              const isSelected = i18n.language === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang)}
                  className={`w-full px-3.5 py-2 text-left text-xs font-medium flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer ${
                    isSelected ? 'text-[#ccff00] font-bold bg-[#ccff00]/10' : 'text-gray-300'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="text-base">{lang.flag}</span>
                    <span>{lang.nativeName}</span>
                    <span className="text-[10px] text-gray-500">({lang.name})</span>
                  </span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#ccff00]" />}
                </button>
              );
            })}
          </div>

          {/* Mobile Bottom Sheet Overlay */}
          <div className="sm:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col justify-end">
            <div className="bg-[#121318] rounded-t-3xl border-t border-white/10 p-5 space-y-4 max-h-[80vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-[#ccff00]" />
                  <h3 className="text-sm font-heading font-black text-white">Select Language / भाषा चुनें</h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full bg-white/5 text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                {LANGUAGES.map((lang) => {
                  const isSelected = i18n.language === lang.code;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang)}
                      className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#ccff00]/15 border-[#ccff00] text-[#ccff00] font-bold'
                          : 'bg-white/5 border-white/10 text-gray-200 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{lang.flag}</span>
                        <div>
                          <span className="text-xs block font-bold">{lang.nativeName}</span>
                          <span className="text-[9px] text-gray-400">{lang.name}</span>
                        </div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-[#ccff00]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
