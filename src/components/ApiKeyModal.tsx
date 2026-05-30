import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, HelpCircle, ChevronDown, ChevronUp, CheckCircle2, Loader2, Sparkles } from 'lucide-react';

interface ApiKeyModalProps {
  onSuccess: (validatedKey: string) => void;
}

export default function ApiKeyModal({ onSuccess }: ApiKeyModalProps) {
  const [apiKey, setApiKey] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const trimmedKey = apiKey.trim();

  if (!trimmedKey) {
    setError('Gemini API 키를 입력해주세요.');
    return;
  }

  setIsValidating(true);
  setError(null);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(trimmedKey)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const responseText = await response.text();

    let data: any = null;
    try {
      data = responseText ? JSON.parse(responseText) : null;
    } catch {
      data = null;
    }

    if (response.ok && Array.isArray(data?.models)) {
      onSuccess(trimmedKey);
      return;
    }

    const apiError =
      data?.error?.message ||
      'API 키 검증에 실패했습니다. 키값, Gemini API 사용 권한, HTTP referrer 제한 설정을 확인해주세요.';

    setError(apiError);
  } catch (err: any) {
    console.error(err);
    setError(
      '브라우저에서 Gemini API 검증 요청에 실패했습니다. 인터넷 연결 또는 API Key의 웹사이트 제한 설정을 확인해주세요.'
    );
  } finally {
    setIsValidating(false);
  }
};

  return (
    <div id="api-key-modal-overlay" className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-900/60 backdrop-blur-md p-4 overflow-y-auto">
      <motion.div
        id="api-key-modal-card"
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="bg-white rounded-[2.5rem] p-8 md:p-10 w-full max-w-xl shadow-2xl border border-orange-100/30 flex flex-col gap-6 font-sans text-left"
      >
        {/* 상단 체크 배너: "무료로 시작하세요. Gemini API 키만 있으면 됩니다." */}
        <div id="api-key-header-banner" className="flex items-center gap-2 px-5 py-3.5 bg-[#eafbf0]/90 border border-[#bbf7d0]/30 rounded-2xl">
          <CheckCircle2 className="w-5 h-5 text-[#10b981] flex-shrink-0" />
          <span className="text-xs sm:text-sm font-sans font-bold text-emerald-950 tracking-tight leading-normal text-left">
            무료로 시작하세요. Gemini API 키만 있으면 됩니다.
          </span>
        </div>

        {/* 설명 문구 */}
        <div className="flex flex-col gap-1.5 text-left">
          <h3 className="font-sans font-black text-gray-900 text-base flex items-center gap-1.5 justify-start">
            <Sparkles className="w-4.5 h-4.5 text-[#f46f30] animate-pulse animate-duration-1000" />
            초기 가동 및 AI 엔진 정품 활성화
          </h3>
          <p className="text-xs text-stone-500 font-sans leading-relaxed text-left">
            본 대시보드는 실무 데이터 매핑 알고리즘과 초정밀 LLM 기획 엔진을 실시간 연계합니다.
            안정적인 고수준 AI 연산과 데이터 유효성을 위해 실존하는 Gemini API Key 인증 절차가 필요합니다.
          </p>
        </div>

        {/* 입력 및 시작하기 폼 */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row gap-2.5 items-stretch relative">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">
                <Lock className="w-4 h-4" />
              </span>
              <input
                id="input-gemini-key"
                type="password"
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="Gemini API Key 입력"
                disabled={isValidating}
                className="w-full pl-10 pr-4 py-3.5 bg-stone-50/80 hover:bg-stone-50 border border-stone-200 focus:border-blue-500 focus:bg-white rounded-2xl text-stone-900 text-sm font-sans placeholder-stone-400 outline-none transition-all duration-300 shadow-2xs"
              />
            </div>
            
            <button
              id="btn-gemini-start"
              type="submit"
              disabled={isValidating}
              className="px-6 py-3.5 bg-[#1348a1] hover:bg-[#0f3d8a] disabled:bg-blue-300 text-white font-bold text-sm rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap min-w-[100px]"
            >
              {isValidating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>검증 중...</span>
                </>
              ) : (
                <span>시작하기</span>
              )}
            </button>
          </div>

          {/* 에러 피드백 */}
          <AnimatePresence>
            {error && (
              <motion.div
                id="api-key-error-notice"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-xs font-sans font-medium text-red-600 bg-red-50/50 border border-red-100 px-4 py-2.5 rounded-xl flex items-start gap-2 text-left"
              >
                <span>⚠️ {error}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        {/* 아코디언 가이드: "Gemini API Key 발급 가이드" */}
        <div id="api-key-accordion-container" className="border border-stone-100 rounded-2xl bg-stone-50/30 overflow-hidden">
          <button
            id="btn-accordion-toggle"
            type="button"
            onClick={() => setIsGuideOpen(!isGuideOpen)}
            className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-stone-50 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-blue-600" />
              <span className="text-xs sm:text-sm font-sans font-bold text-stone-700">
                Gemini API Key 발급 가이드
              </span>
            </div>
            {isGuideOpen ? (
              <ChevronUp className="w-4 h-4 text-stone-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-stone-500" />
            )}
          </button>

          <AnimatePresence>
            {isGuideOpen && (
              <motion.div
                id="guide-accordion-content"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="px-5 pb-5 pt-1 border-t border-stone-100 bg-white"
              >
                <ol className="list-decimal pl-4 text-xs font-sans text-stone-600 leading-relaxed flex flex-col gap-2 mt-2 text-left">
                  <li>
                    <strong className="text-stone-800">Google AI Studio</strong> 웹사이트(
                    <a
                      href="https://aistudio.google.com/"
                      target="_blank"
                      referrerPolicy="no-referrer"
                      className="text-blue-600 hover:underline font-bold inline-flex items-center gap-0.5"
                    >
                      https://aistudio.google.com/
                    </a>
                    )에 접속합니다.
                  </li>
                  <li>
                    화면 좌측 상단 또는 본문의 <strong className="text-stone-850">‘Get API Key’</strong> 버튼을 클릭합니다.
                  </li>
                  <li>
                    필요 정보 및 이용 약관 동의를 완료한 뒤, <strong className="text-stone-850">‘Create API Key’</strong> 단추를 눌러 전용 키를 신규 생성합니다.
                  </li>
                  <li>
                    발급 완료된 <code className="bg-stone-100 text-[#f46f30] px-1 py-0.5 rounded text-[11px] font-mono">AIzaSy...</code> 형태의 고유 키를 통째로 복사합니다.
                  </li>
                  <li>
                    복사한 실존 키를 위의 입력창에 정확하게 붙여넣고 <strong className="text-stone-850">시작하기</strong>를 눌러주세요.
                  </li>
                </ol>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 하단 동의 문구 */}
        <p className="text-center text-[10px] text-stone-400 font-sans tracking-tight">
          가입 시 이용약관 및 개인정보처리방침에 동의하게 됩니다
        </p>
      </motion.div>
    </div>
  );
}
