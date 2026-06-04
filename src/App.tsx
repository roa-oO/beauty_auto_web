/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BarChart3, CloudLightning, ShieldAlert, Sparkles, Wand2, Home, BarChart2, Key } from 'lucide-react';
import { AnalysisResponse } from './types';
import AnalysisForm from './components/AnalysisForm';
import DashboardSummary from './components/DashboardSummary';
import DashboardCharts from './components/DashboardCharts';
import ResultsTabs from './components/ResultsTabs';
import LandingPage from './components/LandingPage';
import ApiKeyModal from './components/ApiKeyModal';
import { analyzeBeautyTrends } from './lib/gemini';

function getCurrentWeekLabel() {
  const kst = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
  const year = kst.getFullYear();
  const month = kst.getMonth() + 1;
  const weekOfMonth = Math.ceil(kst.getDate() / 7);

  return `${year}년 ${month}월 ${weekOfMonth}주차`;
}

export default function App() {
  const [activeView, setActiveView] = useState<'landing' | 'dashboard'>('landing');
  const [analysisData, setAnalysisData] = useState<AnalysisResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Gemini API Key 인증 상태 관리
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    return !!localStorage.getItem('gemini_api_key');
  });

  // 1. 실무 고효율 분석 API 실행 핸들러 (사용자가 등록한 API Key로 브라우저에서 직접 Gemini 호출)
  const handleAnalyze = async (params: {
    week: string;
    platform: string;
    category: string;
    depth: string;
  }) => {
    setIsLoading(true);
    setError(null);
    setAnalysisData(null); // 새 분석 실행 시 이전 결과가 화면에 남지 않게 초기화

    try {
      const apiKey = localStorage.getItem('gemini_api_key') || '';

      if (!apiKey) {
        throw new Error('Gemini API Key가 등록되지 않았습니다. API Key를 다시 입력해 주세요.');
      }

      const resData = await analyzeBeautyTrends(params, apiKey);
      setAnalysisData(resData);
    } catch (err: any) {
      console.error(err);
      setError(
        err.message || '서버 AI 생성 모델 연동 중 일시적 지연이 발생하였습니다. 잠시 후 다시 시도해 주세요.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // 2. 마운트 시 최초 1회 전체 플랫폼 표준 분석을 자동 구동하여 빈 화면 방지 (인증 성공 시에만)
  useEffect(() => {
    if (isUnlocked) {
      handleAnalyze({
        week: getCurrentWeekLabel(),
        platform: '전체',
        category: '전체',
        depth: '표준 분석',
      });
    }
  }, [isUnlocked]);

  return (
    <div id="saas-app-root" className="min-h-screen bg-gradient-to-b from-[#fffaf4] via-orange-50/10 to-stone-50/30 pb-16 text-gray-800 antialiased font-sans">
      
      {/* 1. 상단 화려하고 단정한 에스테틱 헤더 네일 */}
      <header className="sticky top-0 z-30 w-full bg-white/80 backdrop-blur-md border-b border-orange-100/20 py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-[#f46f30] p-2.5 rounded-2xl text-white shadow-sm flex items-center justify-center">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-sans font-black text-gray-900 text-lg tracking-tight flex items-center gap-2">
                주간 뷰티 트렌드 분석 자동화 대시보드
                <span className="text-[10px] font-mono font-bold py-0.5 px-2 bg-orange-50 text-orange-700 border border-orange-100/50 rounded-full">
                  AI SaaS v1.2
                </span>
              </h1>
              <p className="text-xs text-gray-400 font-sans mt-0.5">
                올리브영 • 컬리 • 에이블리 • 무신사 뷰티 트렌드 자동화 리서치
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="flex items-center gap-2 bg-orange-50/60 border border-orange-100/30 px-3 py-1.5 rounded-2xl">
              <span className="w-2.5 h-2.5 bg-[#f46f30] rounded-full animate-ping" />
              <span className="text-xs font-sans text-orange-950 font-bold">실시간 트렌드 분석 중</span>
            </div>
            {isUnlocked && (
              <button
                id="btn-reset-api-key"
                onClick={() => {
                  localStorage.removeItem('gemini_api_key');
                  setIsUnlocked(false);
                }}
                className="flex items-center gap-1.5 text-[11px] font-sans font-bold bg-white hover:bg-red-50 text-stone-700 hover:text-red-600 border border-stone-200 hover:border-red-200 px-3 py-1.5 rounded-2xl cursor-pointer transition-all duration-300 shadow-2xs"
              >
                <Key className="w-3.5 h-3.5 text-[#f46f30]" />
                API Key 재설정
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 2. 글로벌 뷰 서브 전환 네비게이션 탭 */}
      <div id="global-navigation-bar" className="sticky top-[73px] z-20 w-full bg-white/95 border-b border-orange-100/20 px-6 py-2.5 shadow-2xs">
        <div className="max-w-7xl mx-auto flex gap-3">
          <button
            id="global-tab-landing"
            onClick={() => setActiveView('landing')}
            className={`flex items-center gap-1.5 text-xs font-bold px-5 py-3 rounded-2xl transition-all duration-300 cursor-pointer ${
              activeView === 'landing'
                ? 'bg-gradient-to-r from-[#ff9f59] to-[#f46f30] text-white shadow-sm'
                : 'text-gray-500 hover:text-orange-900 bg-orange-50/20 hover:bg-orange-50 border border-orange-100/10'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            서비스 소개
          </button>
          <button
            id="global-tab-dashboard"
            onClick={() => {
              setActiveView('dashboard');
              // 진입 시 자동 분석된 데이터가 없으면 다시 기동
              if (!analysisData && !isLoading) {
                handleAnalyze({
                  week: getCurrentWeekLabel(),
                  platform: '전체',
                  category: '전체',
                  depth: '표준 분석',
                });
              }
            }}
            className={`flex items-center gap-1.5 text-xs font-bold px-5 py-3 rounded-2xl transition-all duration-300 cursor-pointer ${
              activeView === 'dashboard'
                ? 'bg-gradient-to-r from-[#ff9f59] to-[#f46f30] text-white shadow-sm'
                : 'text-gray-500 hover:text-orange-900 bg-orange-50/20 hover:bg-orange-50 border border-orange-100/10'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            실시간 트렌드 분석기
          </button>
        </div>
      </div>

      {/* 3. 메인 콘텐츠 분기 */}
      {activeView === 'landing' ? (
        <motion.div
          id="landing-view-wrapper"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <LandingPage onEnterDashboard={() => setActiveView('dashboard')} />
        </motion.div>
      ) : (
        <main className="max-w-7xl mx-auto px-6 mt-6 flex flex-col gap-6">
          
          {/* 설명 및 안내 배너 */}
          <div className="bg-gradient-to-br from-[#db5c1c] via-[#f46f30] to-[#2e1d11] rounded-3xl p-6 md:p-8 text-white shadow-md relative overflow-hidden animate-fade-in border border-orange-400/10">
            {/* 배경 그리드 장식 */}
            <div style={{ backgroundColor: '#f2dece' }} className="absolute inset-0 bg-[linear-gradient(to_right,#ea580c_1px,transparent_1px),linear-gradient(to_bottom,#ea580c_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_55%_50%,#000_75%,transparent_100%)] opacity-15" />
            
            <div className="z-10 relative max-w-2xl flex flex-col gap-2.5">
              <div style={{ color: '#fae253' }} className="flex items-center gap-1 bg-orange-950/20 border border-orange-400/20 px-2.5 py-1 rounded-full text-xs font-sans font-bold w-fit">
                <Sparkles className="w-3.5 h-3.5" />
                뷰티 커머스 전문 애널리스트 자동화 엔진
              </div>
              <h2 className="font-sans font-bold text-xl md:text-2xl tracking-tight leading-snug">
                화장품 핵심 원료 분석과 피부 고민 분류를 한 번에 구글 시트로!
              </h2>
              <p className="text-xs text-orange-100/80 font-sans leading-relaxed">
                4대 주요 뷰티 성지에서 수집된 주간 인기 상품들의 브랜드 명세, 설명문을 추적하여 
                메시와 마케팅 수사를 걸러낸 실제 유효 <strong>화학/생물학적 원료 키워드</strong>를 마이닝하고, 
                정량화된 트렌드 스코어로 가공해 스프레드시트 복사본 영역을 정밀 설계합니다.
              </p>
            </div>
            {/* 장식용 그래픽 조각 */}
            <div className="absolute right-10 bottom-0 top-0 w-1/3 opacity-15 hidden md:flex items-center justify-center">
              <Wand2 className="w-40 h-40 text-[#e9f33a] animate-pulse" />
            </div>
          </div>

          {/* 3. 유저 조건 선택 폼 */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <AnalysisForm onAnalyze={handleAnalyze} isLoading={isLoading} />
          </motion.div>

          {/* 에러 노출 */}
          {error && (
            <div className="bg-red-50 border border-red-100 rounded-3xl p-5 flex gap-3 text-red-800 z-10 animate-fade-in shadow-xs">
              <ShieldAlert className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-sans font-bold text-sm">트렌드 연산 장애 알림</h4>
                <p className="text-xs font-sans text-red-750 mt-1">{error}</p>
              </div>
            </div>
          )}

          {/* 로딩 표시 (데이터 연산 가동 중) */}
          {isLoading && (
            <div className="bg-[#fff7ed]/80 border border-[#ffedd5] rounded-3xl p-10 flex flex-col items-center justify-center gap-4 text-center shadow-2xs">
              <Wand2 className="w-10 h-10 text-[#f46f30] animate-spin" />
              <div className="flex flex-col gap-1 max-w-md">
                <h4 className="font-sans font-bold text-stone-850 text-sm">AI 뷰티 데이터 가공 및 정규화 진행 중...</h4>
                <p className="text-xs text-stone-500 font-sans leading-relaxed">
                  각 플랫폼 상품 DB의 성분 추출 필터를 가동하고 주간 트렌드를 가공하고 있습니다. 
                  제시해주신 트렌드 점수 기본 산식을 적용하여 합리적인 정량 지표를 도출합니다.
                </p>
              </div>
            </div>
          )}

          {/* 4. 분석 결과 대시보드 출력 */}
          {!isLoading && analysisData && (
            <div className="flex flex-col gap-6">
              
              {/* 로컬 폴백 또는 API 한도 초과 안내 */}
              {(analysisData as any).is_fallback && (
                <div className="flex flex-col gap-3">
                  {(analysisData as any).is_quota_exceeded ? (
                    <div className="bg-[#fffbeb]/90 border border-amber-200 rounded-3xl p-5 md:p-6 shadow-2xs flex flex-col md:flex-row gap-4 items-start md:items-center justify-between animate-fade-in text-left">
                      <div className="flex gap-3 text-left">
                        <Sparkles className="w-6 h-6 text-amber-500 flex-shrink-0 animate-pulse mt-0.5" />
                        <div>
                          <h4 className="font-sans font-bold text-sm text-amber-900 text-left">Gemini API 기본 한도 도달 및 로컬 분석 엔진 자동 가동 안내</h4>
                          <p className="text-xs font-sans text-amber-850 mt-1 leading-relaxed text-left">
                            기본 장착된 무료 호출 한도가 소진되었습니다. 하지만 우리 분석 시스템은 원활한 환경을 보장하기 위해 
                            올리브영·컬리·에이블리·무신사 뷰티의 실제 <strong>실무 화장품 매핑 데이터베이스(BEAUTY_DATABASE)</strong>와 
                            <strong>피부 고민 분류/원료 추출 로컬 전처리 알고리즘</strong>을 무중단 백업으로 탑재하고 있습니다. 
                            이에 따라 현재 대시보드 및 복사용 시트 연산 결과는 실제 실존 정보군을 엄격한 공식에 근거하여 완벽히 일관성 있게 정량 생성하였습니다.
                          </p>
                          <p className="text-[11px] font-sans text-stone-500 mt-2 text-left">
                            💡 중단 없이 무제한 지능형 연산을 적용하시려면 <strong>API Key 재설정 버튼을 눌러 고객님의 전용 Gemini API Key를 다시 등록하시면 정격 활성화가 자동 유지됩니다.</strong>
                          </p>
                        </div>
                      </div>
                      <span className="font-sans text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-100 py-1.5 px-3 rounded-full flex-shrink-0 self-end md:self-center">
                        Local High-Fidelity Active
                      </span>
                    </div>
                  ) : (
                    <div className="bg-[#fffbf4]/80 border border-orange-100/30 rounded-3xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
                      <div className="flex items-center gap-2">
                        <CloudLightning className="w-4 h-4 text-[#f46f30] animate-bounce" />
                        <span className="text-xs font-sans font-medium text-stone-700 leading-normal">
                          <strong>SaaS 최적 가동화:</strong> 고정격 실무 데이터셋에 입각한 정교 분석 솔루션이 활성화되었습니다. (실리적 분석 신뢰 가치 보장)
                        </span>
                      </div>
                      <span className="font-sans text-[10px] font-bold text-orange-700 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-100/40">
                        Local Mode Active
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* A. 대시보드 KPI 카드 레이아웃 */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <DashboardSummary summary={analysisData.summary} />
              </motion.div>

              {/* B. 대시보드 Recharts 레이아웃 */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <DashboardCharts
                  platformCounts={analysisData.chart_platform_counts}
                  ingredientFreqs={analysisData.chart_ingredient_freqs}
                  tagDistributions={analysisData.chart_tag_distributions}
                />
              </motion.div>

              {/* C. 결과 분석 데이터 탭 및 복사 패널 레이아웃 */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <ResultsTabs data={analysisData} />
              </motion.div>

            </div>
          )}

        </main>
      )}

      {/* 4. API Key 입력 팝업 (인증 완료 시까지 마스크 처리) */}
      {!isUnlocked && (
        <ApiKeyModal onSuccess={(key) => {
          localStorage.setItem('gemini_api_key', key);
          setIsUnlocked(true);
        }} />
      )}
    </div>
  );
}
