/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Trophy, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Brain, 
  Timer, 
  Star,
  ChevronRight,
  Volume2,
  VolumeX,
  Info
} from 'lucide-react';
import { questions, Question } from './questions';

// Sound utility using Web Audio API
const playSound = (type: 'correct' | 'wrong' | 'click') => {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    if (type === 'correct') {
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
      oscillator.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.1); // A5
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.3);
    } else if (type === 'wrong') {
      oscillator.type = 'sawtooth';
      oscillator.frequency.setValueAtTime(220, audioCtx.currentTime); // A3
      oscillator.frequency.linearRampToValueAtTime(110, audioCtx.currentTime + 0.2); // A2
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.3);
    } else {
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
      gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.1);
    }
  } catch (e) {
    console.warn('Audio not supported or blocked', e);
  }
};

export default function App() {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'finished'>('start');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQuestion = questions[currentIdx];

  const handleStart = () => {
    if (!isMuted) playSound('click');
    setGameState('playing');
    setCurrentIdx(0);
    setScore(0);
    setFeedback(null);
    setUserAnswer('');
    setShowExplanation(false);
  };

  const handleAnswer = (answer: string) => {
    if (feedback) return; // Prevent multiple answers

    const isCorrect = Array.isArray(currentQuestion.answer) 
      ? currentQuestion.answer.some(a => a.toLowerCase().trim() === answer.toLowerCase().trim())
      : currentQuestion.answer.toLowerCase().trim() === answer.toLowerCase().trim();

    if (isCorrect) {
      setScore(prev => prev + 10);
      if (!isMuted) playSound('correct');
      setFeedback({ isCorrect: true, message: 'Chính xác! Tuyệt vời quá!' });
    } else {
      if (!isMuted) playSound('wrong');
      setFeedback({ isCorrect: false, message: `Chưa đúng rồi. Đáp án là: ${Array.isArray(currentQuestion.answer) ? currentQuestion.answer[0] : currentQuestion.answer}` });
    }
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (!isMuted) playSound('click');
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setFeedback(null);
      setUserAnswer('');
      setShowExplanation(false);
    } else {
      setGameState('finished');
    }
  };

  const progress = ((currentIdx + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-[#F0F9FF] font-sans text-slate-800 selection:bg-blue-100">
      {/* Background patterns */}
      <div className="fixed inset-0 pointer-events-none opacity-5 overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 border-8 border-blue-500 rounded-full" />
        <div className="absolute bottom-20 right-20 w-96 h-96 border-8 border-yellow-500 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border-2 border-slate-300 rounded-full" />
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-200">
            <Brain className="text-white w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 hidden sm:block">
            Chinh Phục Toán 5
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1.5 rounded-full border border-yellow-200">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="font-bold text-yellow-700">{score} điểm</span>
          </div>
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        </div>
      </header>

      <main className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        <div>
          {gameState === 'start' && (
            <div
              key="start"
              className="text-center py-12"
            >
              <div className="mb-8 relative inline-block">
                <div 
                  className="bg-white p-6 rounded-3xl shadow-2xl border border-slate-100"
                >
                  <Trophy className="w-24 h-24 text-yellow-500 mx-auto" />
                </div>
                <div className="absolute -top-4 -right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  LỚP 5
                </div>
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                ÔN TẬP CUỐI NĂM
              </h2>
              <p className="text-lg text-slate-600 mb-10 max-w-lg mx-auto leading-relaxed">
                Sẵn sàng chinh phục 30 thử thách Toán học để nhận những phần quà hấp dẫn nào!
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 max-w-2xl mx-auto">
                {[
                  { label: 'Số học', color: 'bg-blue-100 text-blue-700' },
                  { label: 'Hình học', color: 'bg-green-100 text-green-700' },
                  { label: 'Đại lượng', color: 'bg-purple-100 text-purple-700' }
                ].map((item, i) => (
                  <div key={i} className={`${item.color} px-4 py-3 rounded-2xl font-bold text-sm shadow-sm`}>
                    {item.label}
                  </div>
                ))}
              </div>

              <button
                onClick={handleStart}
                className="group relative bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-black text-xl shadow-xl shadow-blue-200 transition-all hover:-translate-y-1 active:translate-y-0 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  BẮT ĐẦU NGAY <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </button>
            </div>
          )}

          {gameState === 'playing' && (
            <div
              key="playing"
              className="space-y-6"
            >
              {/* Progress */}
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Câu hỏi {currentIdx + 1} / {questions.length}
                  </span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    currentQuestion.level === 'easy' ? 'bg-green-100 text-green-700' :
                    currentQuestion.level === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {currentQuestion.level === 'easy' ? 'Dễ' : currentQuestion.level === 'medium' ? 'Trung bình' : 'Khó'}
                  </span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    style={{ width: `${progress}%` }}
                    className="h-full bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                  />
                </div>
              </div>

              {/* Question Card */}
              <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
                <div className="bg-slate-50 px-8 py-4 border-b border-slate-200 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">{currentQuestion.topic}</span>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-8 leading-snug">
                    {currentQuestion.question}
                  </h3>

                  {/* Options / Input */}
                  <div className="space-y-4">
                    {currentQuestion.type === 'mcq' && currentQuestion.options && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {currentQuestion.options.map((opt, i) => (
                          <button
                            key={i}
                            disabled={!!feedback}
                            onClick={() => handleAnswer(opt)}
                            className={`p-5 text-left rounded-2xl border-2 transition-all font-bold text-lg ${
                              feedback 
                                ? opt === currentQuestion.answer 
                                  ? 'bg-green-50 border-green-500 text-green-700'
                                  : userAnswer === opt 
                                    ? 'bg-red-50 border-red-500 text-red-700'
                                    : 'bg-slate-50 border-slate-100 text-slate-400'
                                : 'bg-white border-slate-100 hover:border-blue-500 hover:bg-blue-50 text-slate-700 hover:text-blue-700 shadow-sm'
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 text-sm">
                                {String.fromCharCode(65 + i)}
                              </span>
                              {opt}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}

                    {currentQuestion.type === 'true-false' && (
                      <div className="grid grid-cols-2 gap-4">
                        {['Đúng', 'Sai'].map((opt) => (
                          <button
                            key={opt}
                            disabled={!!feedback}
                            onClick={() => handleAnswer(opt)}
                            className={`p-6 rounded-2xl border-2 transition-all font-black text-xl ${
                              feedback 
                                ? opt === currentQuestion.answer 
                                  ? 'bg-green-50 border-green-500 text-green-700'
                                  : userAnswer === opt 
                                    ? 'bg-red-50 border-red-500 text-red-700'
                                    : 'bg-slate-50 border-slate-100 text-slate-400'
                                : 'bg-white border-slate-100 hover:border-blue-500 hover:bg-blue-50 text-slate-700 hover:text-blue-700 shadow-sm'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}

                    {(currentQuestion.type === 'short-answer' || currentQuestion.type === 'fill-blank') && (
                      <div className="space-y-4">
                        <input
                          type="text"
                          value={userAnswer}
                          disabled={!!feedback}
                          onChange={(e) => setUserAnswer(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && userAnswer.trim() && handleAnswer(userAnswer)}
                          placeholder="Nhập câu trả lời của bạn..."
                          className="w-full p-5 rounded-2xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all text-xl font-bold"
                        />
                        {!feedback && (
                          <button
                            disabled={!userAnswer.trim()}
                            onClick={() => handleAnswer(userAnswer)}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white p-5 rounded-2xl font-bold text-lg transition-all shadow-lg shadow-blue-100"
                          >
                            GỬI CÂU TRẢ LỜI
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Feedback Area */}
                <div>
                  {feedback && (
                    <div
                      className={`px-8 py-6 border-t ${feedback.isCorrect ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}
                    >
                      <div className="flex items-start gap-4">
                        {feedback.isCorrect ? (
                          <CheckCircle2 className="w-8 h-8 text-green-600 shrink-0" />
                        ) : (
                          <XCircle className="w-8 h-8 text-red-600 shrink-0" />
                        )}
                        <div className="flex-1">
                          <p className={`text-lg font-bold mb-2 ${feedback.isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                            {feedback.message}
                          </p>
                          {showExplanation && (
                            <div className="bg-white/50 p-4 rounded-xl border border-white/50 text-sm text-slate-600 leading-relaxed">
                              <div className="flex items-center gap-2 mb-1 font-bold text-slate-700">
                                <Info className="w-4 h-4" /> Giải thích:
                              </div>
                              {currentQuestion.explanation}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={nextQuestion}
                          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-md ${
                            feedback.isCorrect 
                              ? 'bg-green-600 hover:bg-green-700 text-white' 
                              : 'bg-red-600 hover:bg-red-700 text-white'
                          }`}
                        >
                          {currentIdx === questions.length - 1 ? 'KẾT THÚC' : 'TIẾP THEO'} <ArrowRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {gameState === 'finished' && (
            <div
              key="finished"
              className="text-center py-12 bg-white rounded-[40px] shadow-2xl border border-slate-100 p-12"
            >
              <div className="mb-8">
                <div className="w-32 h-32 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Trophy className="w-16 h-16 text-yellow-500" />
                </div>
                <h2 className="text-4xl font-black text-slate-900 mb-2">HOÀN THÀNH!</h2>
                <p className="text-slate-500 font-bold uppercase tracking-widest">Kết quả của bạn</p>
              </div>

              <div className="flex justify-center gap-8 mb-12">
                <div className="text-center">
                  <p className="text-5xl font-black text-blue-600">{score}</p>
                  <p className="text-sm font-bold text-slate-400">ĐIỂM SỐ</p>
                </div>
                <div className="w-px bg-slate-100" />
                <div className="text-center">
                  <p className="text-5xl font-black text-green-600">{Math.round((score / (questions.length * 10)) * 100)}%</p>
                  <p className="text-sm font-bold text-slate-400">CHÍNH XÁC</p>
                </div>
              </div>

              <div className="max-w-md mx-auto mb-12 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <p className="text-slate-700 leading-relaxed italic">
                  "{score >= 250 ? 'Bạn thật xuất sắc! Hãy tiếp tục phát huy tinh thần học tập này nhé!' : 
                    score >= 150 ? 'Khá lắm! Bạn đã nắm vững kiến thức cơ bản rồi đấy.' : 
                    'Cố gắng lên nhé! Hãy ôn tập kỹ hơn để đạt kết quả cao hơn lần sau.'}"
                </p>
              </div>

              <button
                onClick={handleStart}
                className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all mx-auto shadow-xl"
              >
                <RotateCcw className="w-5 h-5" /> CHƠI LẠI
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 text-slate-400 text-sm font-medium">
        <p>© 2026 Chinh Phục Toán 5 • Ôn Tập Cuối Năm</p>
      </footer>
    </div>
  );
}
