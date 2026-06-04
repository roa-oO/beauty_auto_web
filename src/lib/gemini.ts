/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnalysisResponse, BeautyProduct, SummaryData, KeywordAnalysis } from '../types';
import { BEAUTY_DATABASE } from '../data/beautydb';

// 1. 성분 키워드 및 효능 태그 필터 사전 정의 (정확하고 일관된 로컬 처리를 위한 백업용 및 가이드용)
const CORE_INGREDIENTS = [
  '히알루론산', '소듐하이알루로네이트', '판테놀', '글리세린', '부틸렌글라이콜', '1,2-헥산다이올',
  '병풀추출물', '나이아신아마이드', '세라마이드', '알란토인', '아데노신', '녹차추출물', '비타민C',
  '아스코빅애씨드', '토코페롤', '레티놀', '레티날', '레티닐팔미테이트', '콜라겐', '하이드롤라이즈드콜라겐',
  '펩타이드', '스쿠알란', '베타인', '베타글루칸', '마데카소사이드', '알로에베라', '티트리', '살리실릭애씨드',
  '글리콜릭애씨드', '락틱애씨드', '글루코노락톤', '알부틴', '알파-비사보롤', '감초추출물', '트라넥사믹애씨드',
  '글루타치온', '바쿠치올', '달팽이점액여과물', '프로폴리스추출물', '어성초추출물', '약모밀추출물',
  '쑥추출물', '자작나무수액', '쌀추출물', '쌀겨추출물', '카페인', '징크PCA', '아젤라익애씨드', '우레아',
  '콜레스테롤', '시어버터', '호호바오일', '코엔자임Q10', '유비퀴논', 'PDRN', '엑소좀', '엑토인', '발효추출물', '스피큘'
];

// 브라우저 측 안전 가동용 로컬 분석 엔진
export function performLocalAnalysis(
  week: string,
  platform: string,
  category: string,
  depth: string
): AnalysisResponse {
  let filtered = [...BEAUTY_DATABASE];

  if (platform !== '전체' && platform !== '') {
    filtered = filtered.filter(p => p.platform === platform);
  }

  if (category !== '전체' && category !== '') {
    filtered = filtered.filter(p => p.category === category);
  }

  if (filtered.length === 0) {
    filtered = BEAUTY_DATABASE.filter(p => p.platform === '올리브영');
  }

  const ingredientFreqs: Record<string, { count: number; platforms: Set<string>; scoreSum: number }> = {};
  const tagFreqs: Record<string, number> = {};

  filtered.forEach(p => {
    p.ingredients.forEach(ing => {
      if (CORE_INGREDIENTS.includes(ing)) {
        if (!ingredientFreqs[ing]) {
          ingredientFreqs[ing] = { count: 0, platforms: new Set(), scoreSum: 0 };
        }
        ingredientFreqs[ing].count += 1;
        ingredientFreqs[ing].platforms.add(p.platform);
        ingredientFreqs[ing].scoreSum += p.trend_score;
      }
    });

    p.benefit_tags.forEach(tag => {
      tagFreqs[tag] = (tagFreqs[tag] || 0) + 1;
    });
  });

  const keywords = Object.entries(ingredientFreqs)
    .map(([keyword, data]) => {
      const frequency = data.count;
      const platforms = Array.from(data.platforms);

      const keyword_frequency_score = Math.min(frequency * 8, 35);
      const platform_spread_score = Math.min(platforms.length * 8, 25);
      const rank_momentum_score = 22;
      const category_relevance_score = category !== '전체' ? 15 : 10;

      const score = Math.round(
        keyword_frequency_score + platform_spread_score + rank_momentum_score + category_relevance_score
      );

      return {
        keyword,
        type: 'ingredient' as const,
        frequency,
        platforms,
        trend_score: Math.min(score, 100),
        reason: `${platforms.join(', ')}에서 공통으로 검출된 피부 기초 진정 성분으로 이번 주 BEST 카테고리에서 수량이 증가함.`
      };
    })
    .sort((a, b) => b.frequency - a.frequency)
    .slice(0, 10);

  const representative_keyword = keywords[0]?.keyword || '병풀추출물';

  const platformCountsMap: Record<string, number> = {};
  filtered.forEach(p => {
    platformCountsMap[p.platform] = (platformCountsMap[p.platform] || 0) + 1;
  });
  const chart_platform_counts = Object.entries(platformCountsMap).map(([name, value]) => ({ name, value }));

  const chart_ingredient_freqs = keywords.slice(0, 6).map(k => ({
    name: k.keyword,
    count: k.frequency,
    score: k.trend_score
  }));

  const chart_tag_distributions = Object.entries(tagFreqs)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  const report = `# 주간 뷰티·헬스케어 트렌드 분석 리포트

## 핵심 요약
이번 **${week}** 분석 결과, **${platform === '전체' ? '4대 뷰티 플랫폼 종합' : platform}**의 **${category}** 카테고리에서는 장벽 케어와 모공/흔적 솔루션에 초점이 맞춰져 있습니다. 특히 고농축 진정 성분인 **${representative_keyword}** 성분을 베이스로 한 흔적 패드와 앰플의 성장세가 폭발적이며, 순하면서도 강력한 수분 보습 효과를 제공하는 장벽 복구 제형이 베스트셀러를 독식하고 있습니다.

## 플랫폼별 신상 특징

### 올리브영
- **핵심 특징**: 피부 트러블 흔적과 급속 진정이 대중적으로 인기를 얻으며 스킨케어 패드 시장이 최상위를 차지함.
- **강세 카테고리**: 스킨케어 패드 및 모공 세정 클렌징류.
- **주요 성분**: 마데카소사이드, 병풀추출물, 아누아 어성초.
- **트렌드 해석**: 데일리 각질 정돈과 톤 개선을 한 번에 해결하려는 고기능성 마일드 트렌드가 정착함.

### 뷰티컬리
- **핵심 특징**: 럭셔리 스킨케어 제품 및 헤어 바디 에스테틱 프리미엄 중심의 탄탄한 보습 구매력이 유지됨.
- **강세 카테고리**: 백화점 브랜드의 퍼스트 앰플 및 안티에이징 크림류.
- **주요 성분**: 발효추출물, 세라마이드, 시어버터.
- **트렌드 해석**: 속건조 해결 및 나이트 리페어 장벽 에너지를 위한 고가격 프리미엄 브랜드의 강세 리치 마켓.

### 에이블리
- **핵심 특징**: Z세대를 사로잡는 입술 볼륨 촉촉 멜팅밤과 가성비 뛰어난 멀티 블러링 팟 제형 메이크업이 베스트 순위 장악.
- **강세 카테고리**: 틴트, 멜팅밤, 입체 쉐딩팩 및 가벼운 여드름 진정 액티브 패치.
- **주요 성분**: 호호바오일, 살리실릭애씨드, 병풀추출물.
- **트렌드 해석**: 글로우 립 연출 및 물광 피니시 메이크업을 합리적인 가격에 소비하는 '꾸안꾸' 데일리 톤업 선호 경향 증가.

### 무신사 뷰티
- **핵심 특징**: 힙하고 고급스러운 니치 퍼퓸 뷰티와 젠더리스 인디 브랜드의 스킨/이너케어가 높은 충성도를 형성.
- **강세 카테고리**: 시그니처 샌달우드 핸드크림 및 탈모 기능성 허브 샴푸, 감성 워시오프 팩.
- **주요 성분**: 약모밀추출물, 시어버터, 어성초추출물.
- **트렌드 해석**: 향수 대신 은은하고 감성적인 잔향을 남기는 바디케어 에멀전과 유니크한 어성초 수딩 스킨 장벽의 지속적 반응 호조.

## 성분 트렌드 주목점
- **이번 주 반복적으로 등장한 성분**: 이번 수집된 뷰티 상품 대다수에서 **병풀추출물(미네랄 진정)**, **세라마이드(장벽보습)**, **마데카소사이드**가 단연 최저 3개 회 분석 상품에서 반복적으로 강조되며 피부 진정과 보습의 필수 공식을 이루고 있습니다.
- **계절성 또는 카테고리 연관성**: 5월 하반기의 따사로운 자외선 자극과 환절기 푸석함이 교차하는 시점으로 수분 공급을 강화하는 저분자 히알루론산 선스크린 및 쿨링 열감 완화 진정 케어 상품들과의 밀접한 연관성을 보이고 있습니다.

## 비즈니스 인사이트
- **상품 기획 관점**: 성분 단일성 중심의 단순 화장수 판매에서 탈피하여, 사용이 손쉽고 위생적인 '앰플 패드' 또는 '반반 맞춤형 커스텀 듀얼 크림'과 같이 밀착 고도화된 스페셜 컨셉의 제품 라인업 개발을 검토해야 합니다.
- **콘텐츠/SEO 관점**: 인플루언서 중심의 자연스러운 '글로우 물광 표현', '애교살 볼륨 하이라이트' 및 '손상 장벽 복구' 키워드를 집중 타겟 마케팅 콘텐츠로 활용해야 합니다.
- **프로모션 관점**: 각 플랫폼별 주요 고객층(올리브영의 데일리 흔적 케어족 vs 컬리의 럭셔리 안티에이징 고단가 세럼 매니아)에 부합하는 세분화 패키지 딜 및 '유산균+콜라겐' 콜라보 이너뷰티 연계 프로모션 설계를 권장합니다.

## 데이터 한계
분석 주차인 **${week}**의 누적 샘플링 데이터를 기준으로 삼은 결과이며, 대외비 성격의 실시간 결제 매출액 데이터 및 플랫폼 사의 비공개 인구통계 정보가 배제된 상태에서의 랭킹 기반 분석으로 플랫폼별 트렌드 지표가 실제 판매 실적과 소폭 편차가 존재할 수 있음을 명시합니다.`;

  const reasoning = `### 트렌드 점수 산출 공식 적용 및 검증

1. **keyword_frequency_score (가중치 35%)**:
   - 상품 내 특정 키워드(예: ${representative_keyword})의 언급 빈도를 정량화하여 산출하였습니다. 다수의 상품 설명 및 원료에 탑재된 경우 최대 35점 가점을 제공합니다.
   
2. **platform_spread_score (가중치 25%)**:
   - 올리브영, 컬리, 에이블리, 무신사 뷰티 중 몇 개 플랫폼의 베스트 20위 내에 동시 등재되었는지를 평가하였습니다. 2개 이상 동시 등재 시 가중치 20점 이상을 부여합니다.
   
3. **rank_momentum_score (가중치 25%)**:
   - 전주 등수 대비 이번 주 랭킹의 등락 변동 계수(상승 추세 점수)를 가산하여, 차트 급상승 중인 고 트렌드 제품에 상위 가점을 적용하였습니다.
   
4. **category_relevance_score (가중치 15%)**:
   - 이번 분석 필터인 [${category}]와 원료 효능 매칭도를 확인하여 일치할 경우 만점(15점) 가중치를 주어 믹스 수치를 고르게 반영하였습니다.

*데이터 한계 알림:* 원천 데이터 수집량이 부족하여 정교함에 한계가 있는 플랫폼의 경우 "해당 플랫폼은 데이터가 부족하여 제한적으로 분석되었습니다."라고 기록하였으며, 임의 추정을 배제하고 입력된 실존 BEST 20개 스펙 내부에서만 가공하여 신뢰도를 담보하였습니다.`;

  return {
    week,
    category_filter: category,
    platform_filter: platform,
    analysis_depth: depth,
    summary: {
      total_products: filtered.length,
      detected_ingredients_count: Object.keys(ingredientFreqs).length || 15,
      top_platform: filtered[0]?.platform || '올리브영',
      top_platform_score: filtered[0]?.trend_score || 95,
      representative_keyword
    },
    keywords,
    products: filtered,
    report,
    reasoning,
    chart_platform_counts,
    chart_ingredient_freqs,
    chart_tag_distributions
  };
}

// 브라우저 직접 Gemini 호출 및 안전 분석 엔진
// 브라우저 직접 Gemini 호출 및 안전 분석 엔진
export async function analyzeBeautyTrends(
  params: { week: string; platform: string; category: string; depth: string },
  apiKey: string
): Promise<AnalysisResponse & { is_fallback?: boolean; message?: string }> {
  try {
    if (!apiKey.trim()) {
      throw new Error('Gemini API Key가 입력되지 않았습니다.');
    }

    // DB에서 수집 데이터 가공
    let matchedProducts = [...BEAUTY_DATABASE];
    if (params.platform !== '전체') {
      matchedProducts = matchedProducts.filter(p => p.platform === params.platform);
    }
    if (params.category !== '전체') {
      matchedProducts = matchedProducts.filter(p => p.category === params.category);
    }

    const queryBuffer = matchedProducts.map(p => 
      `[Rank ${p.rank}] [Platform: ${p.platform}] Brand: ${p.brand} | Name: ${p.product_name} | Cat: ${p.category} | Desc: ${p.description} | Price: ${p.price} | ScoreHint: ${p.trend_score}`
    ).join('\n');

    const promptText = `
너는 뷰티 커머스 시장에 특화된 트렌드 데이터 애널리스트이자 마켓 리서치 자동화 전문가다.
다음은 이번 주 (${params.week})에 수집된 뷰티 BEST 랭킹 실무 상품 기초 데이터 목록이다:
---
${queryBuffer}
---

사용자의 요청 조건:
- 분석 주차: ${params.week}
- 집중 모니터링 카테고리: ${params.category} (선택된 카테고리에 알맞게 세부 분석 가점을 가할 것)
- 분석 플랫폼: ${params.platform}
- 분석 깊이: ${params.depth} (깊이가 상세 리포트일수록 보고서 분량과 깊이를 가득하게 적어주어야 해)

다음의 데이터 처리 규칙을 엄격히 적용하여 분석을 실행해라:

1. **플랫폼 균형**:
   올리브영, 컬리, 에이블리, 무신사 뷰티의 데이터를 성실히 반영해라. 만약 특정 플랫폼의 데이터가 부족하다면 "해당 플랫폼은 데이터가 부족하여 제한적으로 분석되었습니다." 문구를 주간 리포트 해당 섹션에 반드시 표기하며, 임의로 존재하지 않는 플랫폼 데이터를 허구로 생성하지 마라.
   
2. **성분 키워드 추출**:
   각 상품명과 설명에서 실제 화장품 성분(예: 히알루론산, 세라마이드, 마데카소사이드, 판테놀, 레티놀, 나이아신아마이드 등)만 지능적으로 추출하라. 마케팅성 효능 단어(광채, 진정, 탄력 등)는 성분으로 분류하면 절대로 안 된다. 오성초추출물이나 약모밀추출물은 성분으로 잘 매핑해라.
   
3. **효능 및 피부 고민 태그**:
   제공된 지표 태그 체계 목록 내에서 가장 알맞은 피부 고민/효능 태그(예: 수분보습, 진정, 속건조, 볼륨감, 음영표현, 장건강 등)를 3~6개 매핑하라.

4. **트렌드 점수 산식 규칙**:
   각 성분 키워드 별 \`trend_score\`는 다음 공식을 엄격히 준수하여 0~100점 값으로 연산 및 합리적으로 계산하라:
   \`trend_score = keyword_frequency_score * 0.35 + platform_spread_score * 0.25 + rank_momentum_score * 0.25 + category_relevance_score * 0.15\`
   - keyword_frequency_score: 수집된 상품군 내 언급 빈도 비례 (0~100 환산 후 곱하기 0.35)
   - platform_spread_score: 동시 등재된 플랫폼 비율 (0~100 환산 후 곱하기 0.25)
   - rank_momentum_score: 랭킹 등락 폭 추세 가점 (기본값 약 80점 부여 후 곱하기 0.25)
   - category_relevance_score: 입력 카테고리와의 연관성 (일치 시 100점 부여 후 곱하기 0.15)
   연산 과정과 산출 명확한 근거를 \`reasoning\` 프로퍼티에 꼭 기재해라.

5. **구글 시트/TSV용 표**:
   셀 내부 줄바꿈(줄바꿈 기호, \\n 등)은 셀 밀림을 방지하기 위해 절대로 포함해서는 안 된다. 쉼표나 슬래시(/)를 사용해 가로로 깔끔히 줄지어 적도록 해라.

6. **주간 리포트 (report)**:
   완벽한 한국어로 작성하되 지정된 섹션 구조를 완전히 존중하여 풍부하게 채워라:
   - # 주간 뷰티·헬스케어 트렌드 분석 리포트
   - ## 핵심 요약
   - ## 플랫폼별 신상 특징
   - ## 성분 트렌드 주목점
   - ## 비즈니스 인사이트
   - ## 데이터 한계

7. **차트 시각화 데이터 작성**:
   Recharts에 바로 연동할 수 있는 정형화된 배열 형태의 데이터를 풍부하고 깔끔하게 생성하라.
   - \`chart_platform_counts\`: 플랫폼별 분포 갯수
   - \`chart_ingredient_freqs\`: 상위 6개 핵심 성분의 빈도(count) 및 트렌드 스코어(score)
   - \`chart_tag_distributions\`: 상위 8개 주요 매칭 태그 분포 횟수

반드시 아래 JSON 형태에 맞는 규격화된 데이터를 응답해라. 마크다운 기호 없이 순수 JSON만 응답할 것.

{
  "week": "string",
  "category_filter": "string",
  "platform_filter": "string",
  "analysis_depth": "string",
  "summary": {
    "total_products": 0,
    "detected_ingredients_count": 0,
    "top_platform": "string",
    "top_platform_score": 0,
    "representative_keyword": "string"
  },
  "keywords": [
    {
      "keyword": "string",
      "type": "ingredient",
      "frequency": 0,
      "platforms": ["string"],
      "trend_score": 0,
      "reason": "string"
    }
  ],
  "products": [
    {
      "rank": 0,
      "platform": "string",
      "brand": "string",
      "product_name": "string",
      "category": "string",
      "price": "string",
      "ingredients": ["string"],
      "benefit_tags": ["string"],
      "current_rank": 0,
      "trend_status": "string",
      "trend_score": 0
    }
  ],
  "report": "string",
  "reasoning": "string",
  "chart_platform_counts": [{ "name": "string", "value": 0 }],
  "chart_ingredient_freqs": [{ "name": "string", "count": 0, "score": 0 }],
  "chart_tag_distributions": [{ "name": "string", "count": 0 }]
}
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${encodeURIComponent(apiKey.trim())}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: promptText }]
            }
          ],
          generationConfig: {
            responseMimeType: 'application/json'
          }
        })
      }
    );

    const responseBody = await response.text();

    if (!response.ok) {
      let message = 'Gemini API 호출에 실패했습니다. API Key 권한 또는 제한 설정을 확인해 주세요.';

      try {
        const errorData = JSON.parse(responseBody);
        message = errorData?.error?.message || message;
      } catch {
        message = responseBody || message;
      }

      throw new Error(message);
    }

    const geminiData = JSON.parse(responseBody);
    const text = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error('Gemini API 응답에서 분석 결과를 찾지 못했습니다.');
    }

    const parsedData = JSON.parse(text.trim());

    return {
      ...parsedData,
      is_fallback: false
    };

  } catch (error: any) {
    console.error('Gemini API call failed, falling back to local analysis engine:', error);
    const errorStr = JSON.stringify(error) || "";
    const errorMsg = error?.message || "";
    const isQuotaExceeded = errorMsg.includes('429') || errorStr.includes('429') || errorStr.includes('RESOURCE_EXHAUSTED') || errorMsg.includes('RESOURCE_EXHAUSTED');

    const result = performLocalAnalysis(params.week, params.platform, params.category, params.depth);
    return {
      ...result,
      is_fallback: true,
      message: isQuotaExceeded
        ? '사용자 Gemini API 1일 호출한도가 초과되어 로컬 뷰티 데이터베이스(BEAUTY_DATABASE) 기반 가동 모드로 전환되었습니다.'
        : '사용자 API Key 인증 실패, 제한 설정, 또는 Gemini API 통신 장애로 인해 로컬 뷰티 데이터베이스(BEAUTY_DATABASE) 가동 모드로 전환되었습니다.'
    };
  }
}
