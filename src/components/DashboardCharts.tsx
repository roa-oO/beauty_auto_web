/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from 'recharts';

interface DashboardChartsProps {
  platformCounts: { name: string; value: number }[];
  ingredientFreqs: { name: string; count: number; score: number }[];
  tagDistributions: { name: string; count: number }[];
}

// Warm, aesthetic palette matching screenshot: Peach/Coral, Luminous Yellow, Orange, Amber, Rose, Sky, Soft Indigo
const COLORS = ['#ff9f59', '#e9f33a', '#f46f30', '#fbbf24', '#f43f5e', '#60a5fa', '#818cf8'];

export default function DashboardCharts({
  platformCounts,
  ingredientFreqs,
  tagDistributions,
}: DashboardChartsProps) {
  // 예비 데이터 처리 (비어있는 경우 보완)
  const safePlatformCounts = platformCounts.length > 0 ? platformCounts : [
    { name: '올리브영', value: 20 },
    { name: '컬리', value: 20 },
    { name: '에이블리', value: 20 },
    { name: '무신사 뷰티', value: 20 },
  ];

  const safeIngredientFreqs = ingredientFreqs.length > 0 ? ingredientFreqs : [
    { name: '병풀추출물', count: 8, score: 92 },
    { name: '세라마이드', count: 6, score: 85 },
    { name: '판테놀', count: 5, score: 80 },
    { name: '히알루론산', count: 4, score: 78 },
    { name: '살리실릭애씨드', count: 3, score: 72 },
  ];

  const safeTagDistributions = tagDistributions.length > 0 ? tagDistributions : [
    { name: '진정', count: 12 },
    { name: '수분보습', count: 10 },
    { name: '피부장벽강화', count: 8 },
    { name: '트러블', count: 6 },
    { name: '모공', count: 5 },
  ];

  return (
    <div id="dashboard-charts-layout" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* 1. 플랫폼별 상품 비중 */}
      <div className="bg-white rounded-3xl border border-orange-100/30 p-6 shadow-xs flex flex-col hover:scale-[1.01] transition-transform duration-300">
        <h4 className="font-sans font-bold text-gray-800 text-sm mb-4">플랫폼별 분석 상품 분포</h4>
        <div className="h-[250px] w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={safePlatformCounts}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
                label={({ name, value }) => `${name} (${value})`}
              >
                {safePlatformCounts.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}개`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <p className="text-center font-sans text-xs text-gray-400 mt-2">
          수집 대상 플랫폼별 분석 표본 분포
        </p>
      </div>

      {/* 2. 핵심 성분 언급량 및 트렌드지수 */}
      <div className="bg-white rounded-3xl border border-orange-100/30 p-6 shadow-xs flex flex-col lg:col-span-1 hover:scale-[1.01] transition-transform duration-300">
        <h4 className="font-sans font-bold text-gray-800 text-sm mb-4">성분 키워드 언급량 & 트렌드 점수</h4>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={safeIngredientFreqs}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#fff7ed" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#78716c', fontWeight: 500 }} />
              <YAxis yAxisId="left" orientation="left" stroke="#f46f30" style={{ fontSize: 11, fontWeight: 600 }} />
              <YAxis yAxisId="right" orientation="right" stroke="#e9f33a" style={{ fontSize: 11, fontWeight: 600 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10, fontWeight: 500 }} />
              <Bar yAxisId="left" dataKey="count" name="언급 빈도" fill="#f46f30" radius={[6, 6, 0, 0]} />
              <Bar yAxisId="right" dataKey="score" name="트렌드 점수" fill="#e9f33a" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-center font-sans text-xs text-gray-400 mt-2">
          성분별 화장품 스펙 기재 언급 횟수 및 랭킹 가중치 합산 점수
        </p>
      </div>

      {/* 3. 주요 효능 및 피부 고민 태그 분포 */}
      <div className="bg-white rounded-3xl border border-orange-100/30 p-6 shadow-xs flex flex-col hover:scale-[1.01] transition-transform duration-300">
        <h4 className="font-sans font-bold text-gray-800 text-sm mb-4">플랫폼별 주요 피부 고민 태그 분포</h4>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={safeTagDistributions}
              margin={{ top: 10, right: 10, left: -5, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#fff7ed" />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#78716c' }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#78716c', fontWeight: 500 }} width={80} />
              <Tooltip />
              <Bar dataKey="count" name="태그 횟수" fill="#ff9f59" radius={[0, 6, 6, 0]}>
                {safeTagDistributions.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[(index + 2) % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-center font-sans text-xs text-gray-400 mt-2">
          커머스 랭킹 상품에 기재된 피부 고민/마케팅 태그 분포 비중
        </p>
      </div>

    </div>
  );
}
