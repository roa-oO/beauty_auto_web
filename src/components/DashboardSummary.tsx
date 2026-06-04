/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SummaryData } from '../types';
import { ShoppingBag, TestTube, TrendingUp, Award, ArrowUpRight } from 'lucide-react';

interface DashboardSummaryProps {
  summary: SummaryData;
}

export default function DashboardSummary({ summary }: DashboardSummaryProps) {
  return (
    <div id="dashboard-summary-cards" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      
      {/* 1. 총 분석 상품 수 (Orange/Coral block matching 'Total revenue' in screenshot) */}
      <div className="bg-gradient-to-br from-[#ff9f59] to-[#f46f30] text-white rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:scale-[1.02] active:scale-95 transition-all duration-300 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full filter blur-md -mr-4 -mt-4 transition-transform group-hover:scale-125" />
        <div className="flex flex-col gap-1.5 z-10">
          <span className="font-sans font-medium text-xs text-orange-100 uppercase tracking-wider">총 분석 상품 수</span>
          <span className="font-sans text-3xl font-bold tracking-tight">{summary.total_products}개</span>
        </div>
        
        <div className="flex items-center justify-between mt-6 z-10">
          <span className="text-[11px] text-white/90 font-sans font-medium bg-white/15 px-2.5 py-1 rounded-full flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5 text-orange-200" />
            실시간 필터 가동
          </span>
          <div className="bg-white/20 p-2.5 rounded-2xl text-white">
            <ShoppingBag className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 2. 감지된 핵심 성분 수 (White card matching 'Total Active Seller') */}
      <div className="bg-white rounded-3xl border border-orange-100/30 p-6 shadow-xs flex flex-col justify-between hover:scale-[1.02] active:scale-95 transition-all duration-300 relative overflow-hidden group">
        <div className="flex flex-col gap-1.5">
          <span className="font-sans font-medium text-xs text-gray-400 uppercase tracking-wider">감지된 핵심 성분 수</span>
          <span className="font-sans text-3xl font-bold text-gray-900 tracking-tight">{summary.detected_ingredients_count}종</span>
        </div>

        <div className="flex items-center justify-between mt-6">
          <span className="text-[11px] text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full font-sans font-semibold flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
            유효 성분 추출
          </span>
          <div className="bg-[#fff7ed] p-2.5 rounded-2xl text-[#f46f30]">
            <TestTube className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 3. 가장 강한 플랫폼 트렌드 (Luminous yellow/lemon card matching 'Total Orders') */}
      <div className="bg-[#e9f33a] rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:scale-[1.02] active:scale-95 transition-all duration-300 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-20 h-20 bg-white/20 rounded-full filter blur-sm -mr-3 -mt-3" />
        <div className="flex flex-col gap-1.5 z-10">
          <span className="font-sans font-medium text-xs text-lime-900/60 uppercase tracking-wider">가장 강한 플랫폼 트렌드</span>
          <div className="flex items-baseline gap-2">
            <span className="font-sans text-3xl font-bold text-lime-950 tracking-tight truncate max-w-[150px]">{summary.top_platform}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6 z-10">
          <span className="font-mono text-[10px] font-bold text-lime-950 bg-white/40 px-2.5 py-1 rounded-full">
            트렌드 지수: {summary.top_platform_score}
          </span>
          <div className="bg-lime-950/10 p-2.5 rounded-2xl text-lime-950">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 4. 이번 주 대표 키워드 (White card) */}
      <div className="bg-white rounded-3xl border border-orange-100/30 p-6 shadow-xs flex flex-col justify-between hover:scale-[1.02] active:scale-95 transition-all duration-300 relative overflow-hidden group">
        <div className="flex flex-col gap-1.5">
          <span className="font-sans font-medium text-xs text-gray-400 uppercase tracking-wider">이번 주 대표 키워드</span>
          <span className="font-sans text-2xl font-bold text-gray-900 tracking-tight truncate max-w-[180px]">
            #{summary.representative_keyword}
          </span>
        </div>

        <div className="flex items-center justify-between mt-6">
          <span className="text-[11px] text-amber-600 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-full font-sans font-semibold flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5 text-amber-500" />
            언급 빈도 1위
          </span>
          <div className="bg-[#fff7ed] p-2.5 rounded-2xl text-amber-600">
            <Award className="w-5 h-5" />
          </div>
        </div>
      </div>

    </div>
  );
}
