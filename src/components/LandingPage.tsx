/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  ArrowRight, 
  Zap, 
  CheckCircle2, 
  Database, 
  Award, 
  TrendingUp, 
  Copy, 
  FileSpreadsheet, 
  Cpu, 
  LineChart, 
  Flame, 
  Clock, 
  ExternalLink 
} from 'lucide-react';

interface LandingPageProps {
  onEnterDashboard: () => void;
}

export default function LandingPage({ onEnterDashboard }: LandingPageProps) {
  return (
    <div id="landing-page-container" className="font-sans text-gray-800 bg-gradient-to-tr from-[#ffe6d4] via-[#fffbf7] to-[#fffde8] min-h-screen relative overflow-hidden py-4">
      
      {/* Dynamic Grid Background Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#fdba74_1px,transparent_1px)] [background-size:20px_20px] opacity-15 pointer-events-none" />

      {/* 1. HERO SECTION (지극히 임팩트 있고 에스테틱한 뷰티 테크 비주얼) */}
      <section id="hero-section" className="relative pt-16 pb-24 px-6 max-w-7xl mx-auto overflow-hidden">
        
        {/* Decorative ambient blobs matching screenshot */}
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-[#ffeedd]/60 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-10 -right-10 w-90 h-90 bg-[#fff5cc]/60 rounded-full filter blur-3xl" />

        <div className="relative text-center max-w-4xl mx-auto flex flex-col items-center">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#fff7ed] border border-[#ffedd5] text-[#f46f30] rounded-full text-xs font-semibold mb-6 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#f46f30]" />
            <span>한눈에 파악하는 뷰티 데이터 인텔리전스</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ fontSize: '46px' }}
            className="font-extrabold text-[#1c1917] tracking-tight leading-tight sm:leading-none mb-6"
          >
            매주 반복되는 <span className="text-[#f46f30] bg-clip-text">뷰티 트렌드 리서치</span>,<br />
            <span className="relative">
              딱 3초 만에
              <span className="absolute bottom-1 left-0 w-full h-2.5 bg-[#e9f33a]/60 -z-10" />
            </span>{' '}
            구글 시트화까지 완벽 종결.
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base text-gray-500 max-w-2xl leading-relaxed mb-10 font-medium"
          >
            국내 4대 뷰티 커머스 플랫폼 — 올리브영, 컬리, 에이블리, 무신사 뷰티 — 의 주간 BEST 상품 데이터를 자동으로 수집하고, 성분·효능·트렌드 점수 분석까지 한 번에
          </motion.p>

          {/* Call To Actions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-sm"
          >
            <button
              id="btn-hero-start"
              onClick={onEnterDashboard}
              className="group flex items-center justify-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-[#ff9f59] to-[#f46f30] hover:from-[#f46f30] hover:to-[#ff9f59] shadow-md hover:shadow-lg rounded-2xl py-3.5 px-7 transition-all duration-300 transform active:scale-95 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-[#e9f33a] animate-bounce" />
              실시간 트렌드 분석 가동하기
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* Interactive Metric Preview Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mt-16 p-6 bg-white/70 backdrop-blur-md rounded-3xl border border-orange-150/40 shadow-xs text-left"
          >
            <div className="flex flex-col gap-1 h-full border-r border-[#ffe3cc] pr-4 last:border-0">
              <span className="font-sans text-base font-bold text-stone-800">4대 뷰티 채널 통합 분석</span>
              <span className="text-[10px] text-[#f46f30] font-sans">올리브영 · 컬리 · 에이블리 · 무신사뷰티</span>
            </div>
            <div className="flex flex-col gap-1 h-full md:border-r border-[#ffe3cc] pr-4 last:border-0 pl-2 md:pl-4">
              <span className="font-sans text-base font-bold text-stone-800">실시간 트렌드 추출</span>
              <span className="text-[10px] text-[#f46f30] font-sans">주간 뷰티 Best 키워드 원클릭 수집</span>
            </div>
            <div className="flex flex-col gap-1 h-full border-r border-[#ffe3cc] pr-4 last:border-0 pl-0 md:pl-4">
              <span className="font-sans text-base font-bold text-stone-800">인사이트 리포트 작성</span>
              <span className="text-[10px] text-[#f46f30] font-sans">분석과 동시에 리포트까지 자동으로</span>
            </div>
            <div className="flex flex-col gap-1 h-full pl-2 md:pl-4">
              <span className="font-sans text-base font-bold text-stone-800">버튼 하나로 즉시 활용</span>
              <span className="text-[10px] text-[#f46f30] font-sans">Google sheet, TSV, JSON으로 바로 복사</span>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 2. PAIN POINTS SECTION (실무자들의 리얼한 고충 조명) */}
      <section id="problem-section" className="py-16 px-6 max-w-7xl mx-auto border-t border-orange-100/50 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 style={{ fontSize: '28px', color: '#f46f30' }} className="font-sans font-bold tracking-tight">
            일 잘하는 MD, 마케터, 성분 연구원, 커머스 기획자의 필수 프로그램
          </h2>
          <p className="text-sm text-gray-550 mt-3 font-sans leading-relaxed">
            일잘러들은 이미 다 사용하고 있어요. 매 주 반복하는 단순 노동. 클릭 한 번으로 끝
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-orange-100/40 p-6 rounded-3xl shadow-xs">
            <div className="w-10 h-10 bg-orange-50 rounded-2xl flex items-center justify-center text-[#f46f30] mb-4">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="font-sans font-semibold text-gray-900 text-base mb-2">끝이 없는 트렌드 분석</h4>
          </div>
          <div className="bg-white border border-orange-100/40 p-6 rounded-3xl shadow-xs">
            <div className="w-10 h-10 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mb-4">
              <Flame className="w-5 h-5" />
            </div>
            <h4 className="font-sans font-semibold text-gray-900 text-base mb-2">골치아픈 레포트, 시각화</h4>
          </div>
          <div className="bg-white border border-orange-100/40 p-6 rounded-3xl shadow-xs">
            <div className="w-10 h-10 bg-amber-100/30 rounded-2xl flex items-center justify-center text-orange-500 mb-4">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <h4 className="font-sans font-semibold text-gray-900 text-base mb-2">복사 붙여넣기 무한 반복</h4>
          </div>
        </div>
      </section>

      {/* 3. CORE FEATURES & STRENGTHS SECTION (SaaS만의 비교불가 특장점) */}
      <section id="features-section" className="py-20 bg-gradient-to-b from-white/20 to-white/80 px-6">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            
            <div className="w-full lg:w-1/2 flex flex-col gap-6">
              <div className="inline-flex bg-[#fff7ed] text-[#f46f30] font-sans text-xs font-semibold py-1 px-3 rounded-md w-max border border-orange-100">
                주간 트렌드 자동화 솔루션
              </div>
              <h2 style={{ fontSize: '28px' }} className="font-sans font-bold text-gray-900 tracking-tight leading-snug">
                단순 수집을 넘어,<br />
                데이터의 '진짜 가치'를 정량화합니다.
              </h2>
              <p className="text-sm text-gray-500 font-sans leading-relaxed">
                단순히 텍스트를 긁어오는 스크래퍼가 아닙니다. 4대 핵심 플랫폼에 특화된 뷰티 전용 AI 인공지능이 매주 수집된 데이터셋을 엄격하게 구조화합니다.
              </p>

              {/* Strength Points Grid */}
              <div className="flex flex-col gap-4 mt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#f46f30] flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-sans font-semibold text-gray-800 text-sm">임의로 생성하지 않은 진짜 데이터 추출</h5>
                    <p className="text-xs text-gray-500 leading-normal mt-0.5 font-sans">데이터에 없는 내용을 만들어내지 않습니다. 실시간으로 분석한 정확한 데이터만을 표기합니다.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#f46f30] flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-sans font-semibold text-gray-800 text-sm">트렌드 스코어(Trend Score) 정량 지수화</h5>
                    <p className="text-xs text-gray-500 leading-normal mt-0.5 font-sans">플랫폼 순위 가중치, 카테고리 기여 빈도, 키워드 등장 랭크를 종합하여 합리적인 원마켓 가중 계산 방식을 탑재했습니다.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#f46f30] flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-sans font-semibold text-gray-800 text-sm">스프레드시트 친화적 복제 정형 격자(Grid) 지원</h5>
                    <p className="text-xs text-gray-500 leading-normal mt-0.5 font-sans">구글 시트에 A1 셀 대고 Ctrl+V만 하면 각 열(브랜드, 상품명, 구체 원입성분, 효능 태그)이 완벽 분할 매칭됩니다.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Dashboard Mockup Display (임팩트 넘치는 가상 대시보드 그래픽 조각) */}
            <div className="w-full lg:w-1/2">
              <div style={{ backgroundColor: '#f9c3a3' }} className="bg-gray-900 rounded-3xl p-6 shadow-xl border border-gray-800 hover:scale-[1.01] transition-transform duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full filter blur-xl" />
                
                {/* Mock header */}
                <div className="flex items-center justify-between border-b border-gray-800 pb-3 mb-4 animate-pulse">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-red-400 rounded-full" />
                    <span className="w-3 h-3 bg-orange-400 rounded-full" />
                    <span className="w-3 h-3 bg-[#e9f33a] rounded-full" />
                    <span className="text-xs font-mono text-gray-500 ml-2">beauty_ai_analyzer_engine_v1.2</span>
                  </div>
                  <span className="text-[10px] font-sans font-bold text-[#ff9f59] bg-orange-950/40 px-2.5 py-0.5 rounded-md border border-orange-900/50">
                    상태: 연산 분석 중
                  </span>
                </div>

                {/* Mock metrics grid */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div style={{ backgroundColor: '#fffbeb' }} className="bg-gray-950 p-3 rounded-xl border border-gray-800/80">
                    <span className="text-[9px] font-sans text-gray-500 block">수집 데이터 스트림</span>
                    <span className="text-sm font-sans font-bold text-orange-400">80+ 개 / 주</span>
                  </div>
                  <div style={{ backgroundColor: '#fffbeb' }} className="bg-gray-950 p-3 rounded-xl border border-gray-800/80">
                    <span className="text-[9px] font-sans text-gray-500 block">노이즈 정제율</span>
                    <span style={{ color: '#c7cd57' }} className="text-sm font-sans font-bold text-[#e9f33a]">98.4% 정제 완료</span>
                  </div>
                  <div style={{ backgroundColor: '#fffbeb' }} className="bg-gray-950 p-3 rounded-xl border border-gray-800/80">
                    <span className="text-[9px] font-sans text-gray-500 block">시트 인덱싱</span>
                    <span className="text-sm font-sans font-bold text-amber-400">구글 시트 칼정렬</span>
                  </div>
                </div>

                {/* Mock process tree */}
                <div className="flex flex-col gap-2.5">
                  <div style={{ backgroundColor: '#fffbeb' }} className="bg-gray-950 p-3 rounded-xl border border-gray-800/50 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-orange-400" />
                      <span style={{ color: '#6a7282' }} className="font-sans text-gray-300">올리브영 BEST 수집</span>
                    </div>
                    <span className="font-sans text-[10px] text-green-400">연결 완료</span>
                  </div>
                  <div style={{ backgroundColor: '#fffbeb' }} className="bg-gray-950 p-3 rounded-xl border border-gray-800/50 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Database className="w-4 h-4 text-orange-400" />
                      <span style={{ color: '#6a7282' }} className="font-sans text-gray-300">화학 성분 마이닝 딥러닝 필터 가동</span>
                    </div>
                    <span className="font-sans text-[10px] text-orange-300">정제 중..</span>
                  </div>
                  <div style={{ backgroundColor: '#fffbeb' }} className="bg-gray-950 p-3 rounded-xl border border-gray-800/50 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet className="w-4 h-4 text-orange-400" />
                      <span style={{ color: '#6a7282' }} className="font-sans text-gray-300">구글 시트용 탭으로 자동 매핑 구조 설계</span>
                    </div>
                    <span style={{ color: '#c7cd57' }} className="font-sans text-[10px] text-[#e9f33a]">A1 수식 최적화</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-800 flex justify-end">
                  <button 
                    onClick={onEnterDashboard}
                    className="flex items-center gap-1.5 text-[11px] font-sans font-semibold text-white bg-[#f46f30] hover:bg-[#ff9f59] py-1.5 px-3.5 rounded-xl transition-colors cursor-pointer"
                  >
                    <span>인터랙티브 대시보드 열기</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. REAL-TIME PLATFORMS (연동 플랫폼 일람 & 타겟 시각) */}
      <section id="partner-section" className="py-16 px-6 max-w-7xl mx-auto border-t border-orange-100/50">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h3 style={{ fontSize: '28px', color: '#f46f30' }} className="font-sans font-bold tracking-tight">수집 및 실무 최적화 타겟 채널</h3>
          <p className="text-xs text-gray-400 mt-2 font-sans">SaaS 가동 시 즉시 데이터를 융합 분석하는 핵심 뷰티 플랫폼 리스트</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-orange-100/40 rounded-3xl p-5 text-center flex flex-col items-center gap-2 shadow-2xs hover:border-orange-300 transition-colors">
            <span className="text-xs font-bold text-orange-700 bg-orange-50 px-2 py-0.5 rounded-full">올리브영</span>
            <span className="font-sans font-bold text-gray-800 text-sm">올리브영</span>
            <p className="text-[10px] text-gray-400 leading-normal font-sans">스킨케어 • 메이크업 • 헤어 트렌드 부동의 1위 성지 데이터 분석</p>
          </div>
          <div className="bg-white border border-orange-100/40 rounded-3xl p-5 text-center flex flex-col items-center gap-2 shadow-2xs hover:border-orange-300 transition-colors">
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">뷰티컬리</span>
            <span className="font-sans font-bold text-gray-800 text-sm">컬리 (뷰티컬리)</span>
            <p className="text-[10px] text-gray-400 leading-normal font-sans">고기능성 스킨케어, 백화점 럭셔리 라인 및 이너뷰티 집중 분석</p>
          </div>
          <div className="bg-white border border-orange-100/40 rounded-3xl p-5 text-center flex flex-col items-center gap-2 shadow-2xs hover:border-orange-300 transition-colors">
            <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full">에이블리</span>
            <span className="font-sans font-bold text-gray-800 text-sm">에이블리 뷰티</span>
            <p className="text-[10px] text-gray-400 leading-normal font-sans">Z세대 트렌디 가성비 색조 메이크업, 잡화, 클렌징 발굴</p>
          </div>
          <div className="bg-white border border-orange-100/40 rounded-3xl p-5 text-center flex flex-col items-center gap-2 shadow-2xs hover:border-orange-300 transition-colors">
            <span className="text-xs font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full whitespace-nowrap">무신사 뷰티</span>
            <span className="font-sans font-bold text-gray-800 text-sm">무신사 뷰티</span>
            <p className="text-[10px] text-gray-400 leading-normal font-sans">젠더리스 뷰티, 트렌디 신생 브랜드, 디자인 소품 융합 트렌드</p>
          </div>
        </div>
      </section>

      {/* 5. CTR FOOTER CALL (강력한 가치 소구 및 대시보드 즉시 전환) */}
      <section id="cta-section" className="py-20 bg-gradient-to-br from-[#db5c1c] via-[#f46f30] to-[#2e1d11] rounded-3xl mx-6 mb-16 text-white text-center p-8 relative overflow-hidden shadow-lg border border-orange-400/20">
        <div style={{ backgroundColor: '#f9d0a3' }} className="absolute inset-0 bg-[linear-gradient(to_right,#ea580c_1px,transparent_1px),linear-gradient(to_bottom,#ea580c_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
        
        <div className="relative max-w-2xl mx-auto flex flex-col items-center gap-4">
          <Award className="w-12 h-12 text-[#e9f33a] animate-pulse" />
          <h2 className="font-sans font-bold text-3xl tracking-tight leading-tight">
            지금, 뷰티 트렌드 리서칭 전반을 무료로 테스트하세요
          </h2>
          <p className="text-xs text-orange-100/80 leading-relaxed font-sans max-w-lg mb-6">
            회원가입이 필요 없습니다. Gemini API만으로 올리브영·컬리·에이블리·무신사 뷰티의 베스트 트랜드를 확인하고 주간 뷰티 인사이트를 도출할 수 있습니다.
          </p>
          <button
            id="btn-cta-launch"
            onClick={onEnterDashboard}
            className="flex items-center justify-center gap-2 text-sm font-bold text-orange-950 bg-white hover:bg-orange-50 shadow-md hover:shadow-xl rounded-2xl py-4 px-8 transition-all duration-300 transform active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#f46f30]" />
            인터랙티브 분석 SaaS 콘솔 진입하기
            <ArrowRight className="w-4 h-4 text-[#f46f30]" />
          </button>
        </div>
      </section>

      {/* Footer copyright */}
      <footer id="landing-footer" className="text-center text-xs text-stone-400 pb-12">
        <p>© 2026 주간 뷰티 트렌드 분석 자동화 대시보드 (AI SaaS). All Rights Reserved.</p>
        <p className="mt-1">화학 성분 마이닝 딥러닝 융합 필터 v1.2</p>
      </footer>

    </div>
  );
}
