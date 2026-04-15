import React, { useState } from 'react';
import { Question, User } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, User as UserIcon, CheckCircle2, ListChecks } from 'lucide-react';

interface QuizProps {
  questions: Question[];
  user: User | null;
  onComplete: (answers: number[]) => void;
}

export default function Quiz({ questions, user, onComplete }: QuizProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
  const [showSummary, setShowSummary] = useState(false);

  const handleSelect = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = optionIndex;
    setAnswers(newAnswers);
    
    // Automatic advancement with a small delay
    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setShowSummary(true);
      }
    }, 400);
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1 && answers[currentStep] !== -1) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === questions.length - 1 && answers[currentStep] !== -1) {
      setShowSummary(true);
    }
  };

  const handleBack = () => {
    if (showSummary) {
      setShowSummary(false);
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentQuestion = questions[currentStep];
  const progress = showSummary ? 100 : ((currentStep + 1) / questions.length) * 100;

  const generateNarrative = () => {
    if (answers.includes(-1)) return "";

    const exp = questions[0].options[answers[0]].text.toLowerCase();
    const usage = questions[1].options[answers[1]].text.toLowerCase();
    const cc = questions[2].options[answers[2]].text.toLowerCase();
    const style = questions[3].options[answers[3]].text.toLowerCase();
    const type = questions[4].options[answers[4]].text.toLowerCase();
    const comfort = questions[5].options[answers[5]].text.toLowerCase();
    const budget = questions[6].options[answers[6]].text.toLowerCase();
    const engine = questions[7].options[answers[7]].text.toLowerCase();
    const brand = questions[8].options[answers[8]].text.toLowerCase();
    const location = questions[9].options[answers[9]].text.toLowerCase();

    return `Ciao ${user?.name || 'pilota'}, ho analizzato il tuo profilo. Sei un guidatore con un'esperienza ${exp} e cerchi una moto da usare principalmente per ${usage}. Ti orienti su cilindrate ${cc} con uno stile di guida ${style}. La tua passione va verso le ${type}, dove il comfort è considerato ${comfort}. Con un budget ${budget}, cerchi un motore che offra ${engine}. Hai espresso una preferenza per i brand di origine ${brand} e sogni di divorare chilometri tra ${location}.`;
  };

  if (showSummary) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden"
        >
          <div className="bg-stone-900 p-6 text-white flex items-center gap-3">
            <div className="p-2 bg-brand-primary rounded-lg">
              <ListChecks size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Il Tuo Profilo Pilota</h2>
              <p className="text-xs text-stone-400">Ecco cosa ho capito di te dalle tue risposte</p>
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div className="p-6 bg-stone-50 rounded-2xl border border-stone-100 relative">
              <div className="absolute -top-3 -left-3 p-2 bg-brand-primary text-white rounded-lg shadow-lg">
                <UserIcon size={16} />
              </div>
              <p className="text-lg text-stone-700 leading-relaxed italic font-medium">
                "{generateNarrative()}"
              </p>
            </div>
            
            <div className="flex items-center gap-2 text-stone-400 text-xs justify-center">
              <CheckCircle2 size={14} className="text-green-500" />
              <span>Tutti i parametri sono stati impostati correttamente</span>
            </div>
          </div>

          <div className="p-6 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleBack}
              className="flex-1 py-4 px-6 border border-stone-200 rounded-xl font-bold text-stone-600 hover:bg-stone-100 transition-all flex items-center justify-center gap-2"
            >
              <ChevronLeft size={18} />
              Modifica Risposte
            </button>
            <button
              onClick={() => onComplete(answers)}
              className="flex-[2] py-4 px-6 bg-brand-primary text-white rounded-xl font-bold shadow-lg shadow-brand-primary/20 hover:bg-brand-dark transition-all flex items-center justify-center gap-2"
            >
              Conferma e Scendi in Pista
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-end mb-2">
          <div className="flex flex-col">
            {user && (
              <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest flex items-center gap-1 mb-1">
                <UserIcon size={10} />
                Pilota: {user.name} ({user.age})
              </span>
            )}
            <span className="text-sm font-medium text-brand-dark">Domanda {currentStep + 1} di {questions.length}</span>
          </div>
          <span className="text-sm text-stone-500">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-brand-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-3xl border border-stone-200 shadow-xl p-8 space-y-8"
        >
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-stone-900 leading-tight">
              {currentQuestion.text}
            </h2>
          </div>

          <div className="grid gap-4">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`group relative flex items-center p-5 rounded-2xl border-2 transition-all text-left ${
                  answers[currentStep] === idx 
                    ? 'border-brand-primary bg-brand-primary/5' 
                    : 'border-stone-100 bg-stone-50 hover:border-stone-200 hover:bg-white'
                }`}
              >
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 transition-all ${
                  answers[currentStep] === idx 
                    ? 'border-brand-primary bg-brand-primary text-white' 
                    : 'border-stone-300 bg-white group-hover:border-brand-primary'
                }`}>
                  {answers[currentStep] === idx && <CheckCircle2 size={14} />}
                </div>
                <span className={`font-bold transition-all ${
                  answers[currentStep] === idx ? 'text-brand-primary' : 'text-stone-600'
                }`}>
                  {option.text}
                </span>
                
                {answers[currentStep] === idx && (
                  <motion.div 
                    layoutId="active-bg"
                    className="absolute inset-0 border-2 border-brand-primary rounded-2xl pointer-events-none"
                  />
                )}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-10 flex justify-between items-center">
        <button
          onClick={handleBack}
          disabled={currentStep === 0}
          className={`p-4 rounded-2xl border transition-all flex items-center gap-2 font-bold ${
            currentStep === 0 
              ? 'border-stone-100 text-stone-200 cursor-not-allowed' 
              : 'border-stone-200 text-stone-600 hover:bg-stone-50 hover:border-stone-300'
          }`}
        >
          <ChevronLeft size={20} />
          <span className="hidden sm:inline">Indietro</span>
        </button>

        <button
          onClick={handleNext}
          disabled={answers[currentStep] === -1}
          className={`p-4 rounded-2xl border transition-all flex items-center gap-2 font-bold ${
            answers[currentStep] === -1
              ? 'border-stone-100 text-stone-200 cursor-not-allowed' 
              : 'border-stone-200 text-stone-600 hover:bg-stone-50 hover:border-stone-300'
          }`}
        >
          <span className="hidden sm:inline">
            {currentStep === questions.length - 1 ? 'Riepilogo' : 'Avanti'}
          </span>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
