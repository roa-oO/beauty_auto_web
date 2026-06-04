/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface BeautyProduct {
  rank: number;
  platform: '올리브영' | '컬리' | '에이블리' | '무신사 뷰티';
  brand: string;
  product_name: string;
  category: '스킨케어' | '메이크업' | '클렌징' | '헤어케어' | '바디케어' | '이너뷰티';
  description: string;
  price: string;
  current_rank: number;
  ingredients: string[];
  benefit_tags: string[];
  trend_status: '상승' | '유지' | '하강' | '신규';
  trend_score: number;
}

export interface SummaryData {
  total_products: number;
  detected_ingredients_count: number;
  top_platform: string;
  top_platform_score: number;
  representative_keyword: string;
}

export interface KeywordAnalysis {
  keyword: string;
  type: 'ingredient' | 'tag';
  frequency: number;
  platforms: string[];
  trend_score: number;
  reason: string;
}

export interface AnalysisResponse {
  week: string;
  category_filter: string;
  platform_filter: string;
  analysis_depth: string;
  summary: SummaryData;
  keywords: KeywordAnalysis[];
  products: BeautyProduct[];
  report: string; // Markdown report
  reasoning: string; // 점수 산출 근거 및 데이터 한계
  chart_platform_counts: { name: string; value: number }[];
  chart_ingredient_freqs: { name: string; count: number; score: number }[];
  chart_tag_distributions: { name: string; count: number }[];
}
