/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Copy, FileText, Check, Database, FileSpreadsheet, AlertCircle, Info } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { AnalysisResponse, BeautyProduct } from '../types';

interface ResultsTabsProps {
  data: AnalysisResponse;
}

export default function ResultsTabs({ data }: ResultsTabsProps) {
  const [activeTab, setActiveTab] = useState<'sheet' | 'tsv' | 'json' | 'report' | 'reason' | 'products'>('products');
  const [copied, setCopied] = useState<string | null>(null);

  const showToast = (key: string) => {
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  // 1. TSV 데이터 생성
  const generateTSV = () => {
    const headers = ['순위', '플랫폼', '브랜드명', '상품명', '카테고리', '핵심 성분 키워드', '주요 효능/태그', '트렌드 점수'];
    const rows = data.products.map((p) => [
      p.rank,
      p.platform,
      p.brand,
      p.product_name,
      p.category,
      p.ingredients.join(', '),
      p.benefit_tags.join(', '),
      p.trend_score,
    ]);
    return [headers.join('\t'), ...rows.map((row) => row.join('\t'))].join('\n');
  };

  // 2. 복사 기능
  const handleCopyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    showToast(key);
  };

  // 3. 구글 시트 복사용 복사 기능 (테이블 클립보드 복사 HTML형태로 한 번에 시트화 엑셀화 복정 가열)
  const handleCopyTableHTML = () => {
    const tableElement = document.getElementById('google-sheet-table');
    if (!tableElement) return;

    // Excel, Google Sheets 등에 즉시 깨짐 없이 완벽하게 그리드 셀별로 붙여넣어지는 텍스트 결합 복사
    const tsvData = generateTSV();
    navigator.clipboard.writeText(tsvData);
    showToast('sheet');
  };

  return (
    <div id="results-tabs-container" className="bg-white rounded-3xl border border-orange-100/30 shadow-xs overflow-hidden">
      
      {/* 탭 버튼 헤더 */}
      <div className="flex border-b border-orange-100/20 bg-[#fffcf8]/45 overflow-x-auto">
        <button
          id="tab-products"
          type="button"
          onClick={() => setActiveTab('products')}
          className={`flex items-center gap-2 px-6 py-4.5 text-sm font-sans font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'products'
              ? 'border-[#f46f30] text-[#f46f30] bg-white'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <Database className="w-4 h-4" />
          분석 대상 상품 목록 ({data.products.length})
        </button>
        <button
          id="tab-sheet"
          type="button"
          onClick={() => setActiveTab('sheet')}
          className={`flex items-center gap-2 px-6 py-4.5 text-sm font-sans font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'sheet'
              ? 'border-[#f46f30] text-[#f46f30] bg-white'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" />
          구글 시트용 표
        </button>
        <button
          id="tab-tsv"
          type="button"
          onClick={() => setActiveTab('tsv')}
          className={`flex items-center gap-2 px-6 py-4.5 text-sm font-sans font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'tsv'
              ? 'border-[#f46f30] text-[#f46f30] bg-white'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <Copy className="w-4 h-4" />
          TSV 복사
        </button>
        <button
          id="tab-json"
          type="button"
          onClick={() => setActiveTab('json')}
          className={`flex items-center gap-2 px-6 py-4.5 text-sm font-sans font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'json'
              ? 'border-[#f46f30] text-[#f46f30] bg-white'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <Info className="w-4 h-4" />
          JSON 데이터
        </button>
        <button
          id="tab-report"
          type="button"
          onClick={() => setActiveTab('report')}
          className={`flex items-center gap-2 px-6 py-4.5 text-sm font-sans font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'report'
              ? 'border-[#f46f30] text-[#f46f30] bg-white'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          주간 리포트 (MD)
        </button>
        <button
          id="tab-reason"
          type="button"
          onClick={() => setActiveTab('reason')}
          className={`flex items-center gap-2 px-6 py-4.5 text-sm font-sans font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'reason'
              ? 'border-[#f46f30] text-[#f46f30] bg-white'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <AlertCircle className="w-4 h-4" />
          분석 근거 & 한계
        </button>
      </div>

      {/* 탭 전환 본문 */}
      <div className="p-6">
        
        {/* 토스트 피드백 */}
        {copied && (
          <div className="fixed bottom-5 right-5 bg-stone-900 border border-stone-850 text-white px-4 py-2.5 rounded-2xl shadow-lg flex items-center gap-2 z-50 animate-bounce">
            <Check className="w-4 h-4 text-[#e9f33a]" />
            <span className="text-sm font-sans font-semibold">{copied === 'sheet' ? '시트 복사용 TSV 복사 완료!' : '클립보드 복사 완료!'}</span>
          </div>
        )}

        {/* 0. 상품 상세 리스트 카드 */}
        {activeTab === 'products' && (
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <h4 className="font-sans font-bold text-gray-800 text-sm">트렌드 랭킹 매칭 수집 테이블 ({data.products.length}건)</h4>
              <span className="text-xs text-gray-400 font-sans">실제 활성 데이터셋</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.products.map((p, idx) => (
                <div key={idx} className="bg-[#fffdfa]/60 hover:bg-[#fff7ed]/50 border border-orange-100/20 hover:border-[#ff9f59]/30 rounded-2xl p-4.5 transition-all duration-300">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="bg-orange-50 text-orange-700 border border-orange-100/50 font-mono text-xs font-bold px-2.5 py-0.5 rounded-full">
                      {p.platform} {p.rank}위
                    </span>
                    <span className="text-xs font-mono font-bold text-[#f46f30]">트렌드 지수: {p.trend_score}/100</span>
                  </div>
                  <h5 className="font-sans font-bold text-gray-850 text-sm truncate">{p.brand} - {p.product_name}</h5>
                  <p className="text-xs text-gray-500 font-sans mt-1 line-clamp-2 leading-relaxed">{p.description}</p>
                  
                  <div className="flex flex-wrap gap-1.5 mt-3.5">
                    {p.ingredients.slice(0, 3).map((ing, i) => (
                      <span key={i} className="text-[10px] font-sans font-bold text-[#f46f30] bg-[#fff7ed] px-2 py-0.5 rounded-md">
                        🧪 {ing}
                      </span>
                    ))}
                    {p.benefit_tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="text-[10px] font-sans font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                        # {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 1. 구글 시트용 표 */}
        {activeTab === 'sheet' && (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#fff7ed] border border-[#ffedd5] rounded-3xl p-5">
              <div className="flex items-start gap-2 max-w-2xl">
                <Info className="w-4 h-4 text-[#f46f30] mt-0.5 flex-shrink-0" />
                <p className="text-xs text-stone-800 font-sans leading-relaxed font-medium">
                  아래 테이블은 구글 스프레드시트에 직접 갖다 대고 복사-붙여넣기 할 수 있는 호환 정형 데이터를 지원합니다. 
                  우측의 <strong>스프레드시트 복사 버튼</strong>을 눌러 클립보드에 담은 후 시트 <strong>A1</strong> 셀에 <strong>Ctrl+V</strong> 하시면 셀 밀림 없이 바르게 정렬됩니다.
                </p>
              </div>
              <button
                id="btn-copy-sheet-html"
                onClick={handleCopyTableHTML}
                className="flex items-center gap-1.5 text-xs font-sans font-bold text-white bg-gradient-to-r from-[#ff9f59] to-[#f46f30] hover:scale-[1.01] rounded-2xl py-2 px-4 whitespace-nowrap transition-all shadow-xs cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                스프레드시트 복사
              </button>
            </div>

            <div className="overflow-x-auto border border-orange-100/30 rounded-2xl max-w-full shadow-2xs">
              <table id="google-sheet-table" className="w-full text-left border-collapse min-w-[900px] text-xs">
                <thead>
                  <tr className="bg-[#ffebd4]/45 text-stone-700 border-b border-orange-100/30">
                    <th className="p-3.5 font-sans font-bold">순위</th>
                    <th className="p-3.5 font-sans font-bold">플랫폼</th>
                    <th className="p-3.5 font-sans font-bold">브랜드명</th>
                    <th className="p-3.5 font-sans font-bold">상품명</th>
                    <th className="p-3.5 font-sans font-bold">카테고리</th>
                    <th className="p-3.5 font-sans font-bold">핵심 성분 키워드</th>
                    <th className="p-3.5 font-sans font-bold">주요 효능/태그</th>
                    <th className="p-3.5 font-sans font-bold">트렌드 점수</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-orange-50/50 text-gray-700">
                  {data.products.map((p, idx) => (
                    <tr key={idx} className="hover:bg-[#fff9f4]/40 bg-white transition-colors">
                      <td className="p-3.5 font-mono font-bold text-gray-500">{p.rank}</td>
                      <td className="p-3.5 font-sans font-medium">{p.platform}</td>
                      <td className="p-3.5 font-sans font-bold text-gray-900">{p.brand}</td>
                      <td className="p-3.5 font-sans max-w-xs truncate text-gray-700">{p.product_name}</td>
                      <td className="p-3.5 font-sans">{p.category}</td>
                      <td className="p-3.5 font-sans text-[#f46f30] font-bold">
                        {p.ingredients.join(', ') || '없음'}
                      </td>
                      <td className="p-3.5 font-sans text-amber-600 font-semibold">
                        {p.benefit_tags.join(', ') || '없음'}
                      </td>
                      <td className="p-3.5 font-mono font-bold text-orange-500">{p.trend_score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 2. TSV 복사 */}
        {activeTab === 'tsv' && (
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-550 font-sans">탭으로 분리된 텍스트 형식 (TSV)</span>
              <button
                id="btn-copy-tsv"
                onClick={() => handleCopyText(generateTSV(), 'tsv')}
                className="flex items-center gap-1.5 text-xs font-sans font-bold text-gray-750 bg-orange-50 hover:bg-orange-100 rounded-2xl py-1.5 px-4.5 transition-colors cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5 text-[#f46f30]" />
                TSV 본문 복사
              </button>
            </div>
            <textarea
              id="tsv-data-textarea"
              readOnly
              value={generateTSV()}
              className="w-full h-80 text-[11px] font-mono p-4 border border-orange-100/40 bg-[#fffdfa]/60 rounded-2xl outline-none focus:border-[#f46f30] leading-normal focus:ring-2 focus:ring-orange-100"
            />
          </div>
        )}

        {/* 3. JSON 데이터 */}
        {activeTab === 'json' && (
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-550 font-sans">API 전송용 표준 정형 JSON</span>
              <button
                id="btn-copy-json"
                onClick={() => handleCopyText(JSON.stringify(data, null, 2), 'json')}
                className="flex items-center gap-1.5 text-xs font-sans font-bold text-gray-750 bg-orange-50 hover:bg-orange-100 rounded-2xl py-1.5 px-4.5 transition-colors cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5 text-[#f46f30]" />
                JSON 전체 복사
              </button>
            </div>
            <pre
              id="json-data-pre"
              className="w-full h-80 text-[11px] font-mono p-4 border border-orange-100/40 bg-[#fffdfa]/60 rounded-2xl outline-none overflow-y-auto leading-relaxed text-gray-650"
            >
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}

        {/* 4. 주간 리포트 */}
        {activeTab === 'report' && (
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center border-b border-orange-100/20 pb-3">
              <span className="text-xs text-[#f46f30] font-sans font-bold">한국어 마케팅 잡지/기획 리포트 완본</span>
              <button
                id="btn-copy-report"
                onClick={() => handleCopyText(data.report, 'report')}
                className="flex items-center gap-1.5 text-xs font-sans font-bold text-[#f46f30] bg-[#fff7ed] hover:bg-orange-100/50 rounded-2xl py-1.5 px-4.5 transition-colors cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                인사이트 에디터 복사
              </button>
            </div>
            <div id="report-markdown-renderer" className="prose prose-orange max-w-none text-sm text-stone-850 font-sans leading-relaxed pt-2 pr-2 overflow-y-auto">
              <ReactMarkdown>{data.report}</ReactMarkdown>
            </div>
          </div>
        )}

        {/* 5. 분석 근거 & 한계 */}
        {activeTab === 'reason' && (
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center border-b border-orange-100/20 pb-3">
              <span className="text-xs text-amber-600 font-sans font-bold">트렌드 지표 산정 백엔드 알고리즘 검증</span>
              <button
                id="btn-copy-reason"
                onClick={() => handleCopyText(data.reasoning, 'reason')}
                className="flex items-center gap-1.5 text-xs font-sans font-bold text-amber-700 bg-amber-50 hover:bg-[#fff7ed] rounded-2xl py-1.5 px-4.5 transition-colors cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                산식 기획 복사
              </button>
            </div>
            <div id="reasoning-markdown-renderer" className="prose prose-amber max-w-none text-sm text-[#1c1917] font-sans leading-relaxed pt-2">
              <ReactMarkdown>{data.reasoning}</ReactMarkdown>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
