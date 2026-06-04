/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, RotateCcw, Sparkles } from 'lucide-react';

interface AnalysisFormProps {
  onAnalyze: (params: {
    week: string;
    platform: string;
    category: string;
    depth: string;
  }) => void;
  isLoading: boolean;
}

const PLATFORMS = ['전체', '올리브영', '컬리', '에이블리', '무신사 뷰티'];

const CATEGORIES = [
  '전체',
  '스킨케어',
  '메이크업',
  '클렌징',
  '헤어케어',
  '바디케어',
  '이너뷰티',
];

const DEPTHS = ['간단 요약', '표준 분석', '상세 리포트'];

function getCurrentWeekLabel() {
  const kst = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
  const year = kst.getFullYear();
  const month = kst.getMonth() + 1;
  const weekOfMonth = Math.ceil(kst.getDate() / 7);

  return `${year}년 ${month}월 ${weekOfMonth}주차`;
}

export default function AnalysisForm({ onAnalyze, isLoading }: AnalysisFormProps) {
  const [platform, setPlatform] = useState('전체');
  const [category, setCategory] = useState('전체');
  const [depth, setDepth] = useState('표준 분석');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze({ week: getCurrentWeekLabel(), platform, category, depth });
  };

  const handleReset = () => {
    setPlatform('전체');
    setCategory('전체');
    setDepth('표준 분석');
  };

  return (
    <form
      id="analysis-form-container"
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl border border-orange-100/40 p-6 md:p-8 shadow-xs transition-all duration-300 relative overflow-hidden"
    >
      <div className="flex items-center gap-2.5 mb-6">
        <div className="bg-orange-50 p-2 rounded-2xl">
          <Sparkles className="w-5 h-5 text-[#f46f30] animate-pulse" />
        </div>
        <h3 className="font-sans font-bold text-gray-800 text-base">분석 조건 및 타겟 조건 설정</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 분석 플랫폼 */}
        <div className="flex flex-col gap-1.5">
          <label className="font-sans font-bold text-xs text-gray-500">분석 플랫폼 *</label>
          <select
            id="select-platform"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full text-sm font-sans font-semibold text-gray-750 bg-orange-50/20 border border-orange-100/50 rounded-2xl p-3 outline-none focus:bg-white focus:border-[#f46f30] focus:ring-2 focus:ring-orange-100 transition-all cursor-pointer"
          >
            {PLATFORMS.map((p) => (
              <option key={p} value={p}>
                {p === '전체' ? '전체 플랫폼 종합' : p}
              </option>
            ))}
          </select>
        </div>

        {/* 집중 모니터링 카테고리 */}
        <div className="flex flex-col gap-1.5">
          <label className="font-sans font-bold text-xs text-gray-500">집중 모니터링 카테고리</label>
          <select
            id="select-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full text-sm font-sans font-semibold text-gray-750 bg-orange-50/20 border border-orange-100/50 rounded-2xl p-3 outline-none focus:bg-white focus:border-[#f46f30] focus:ring-2 focus:ring-orange-100 transition-all cursor-pointer"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c === '전체' ? '전체 카테고리' : c}
              </option>
            ))}
          </select>
        </div>

        {/* 분석 깊이 */}
        <div className="flex flex-col gap-1.5">
          <label className="font-sans font-bold text-xs text-gray-500">분석 깊이</label>
          <select
            id="select-depth"
            value={depth}
            onChange={(e) => setDepth(e.target.value)}
            className="w-full text-sm font-sans font-semibold text-gray-750 bg-orange-50/20 border border-orange-100/50 rounded-2xl p-3 outline-none focus:bg-white focus:border-[#f46f30] focus:ring-2 focus:ring-orange-100 transition-all cursor-pointer"
          >
            {DEPTHS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6 border-t border-orange-50 pt-4">
        <button
          id="btn-reset"
          type="button"
          onClick={handleReset}
          disabled={isLoading}
          className="flex items-center justify-center gap-1.5 text-sm font-sans font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200/80 rounded-2xl py-2.5 px-5 transition-colors disabled:opacity-50 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          초기화
        </button>
        <button
          id="btn-run-analysis"
          type="submit"
          disabled={isLoading}
          className="flex items-center justify-center gap-2 text-sm font-sans font-bold text-white bg-gradient-to-r from-[#ff9f59] to-[#f46f30] hover:scale-[1.01] active:scale-95 shadow-sm rounded-2xl py-2.5 px-7 transition-all disabled:from-orange-300 disabled:to-orange-400 cursor-pointer"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              AI 분석 가동 중...
            </div>
          ) : (
            <>
              <Search className="w-4 h-4" />
              트렌드 분석 실행
            </>
          )}
        </button>
      </div>
    </form>
  );
}
