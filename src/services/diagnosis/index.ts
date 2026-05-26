import axiosInstance from "@/libs/axios";

export interface ImageAnalysisResponse {
  style: string;
  sunlight: string;
  size: string;
  place: string;
}

export interface EnvironmentDiagnosisResponse {
  environment_id: string;
}

export interface PlantResponse {
  id: string;
  name_ko: string;
  name_en: string;
  management_difficulty: string;
  watering: string;
  appropriate_temperature: string;
  appropriate_humidity: string;
  sunlight_requirements: string;
  size: string;
  air_purification_effect: string;
  pet_stability: string;
  explanation?: string | null;
}

export interface EnvironmentTypeSimple {
  id: string;
  name: string;
}

export interface PlantRecommendResponse {
  env_type: EnvironmentTypeSimple;
  optimal: PlantResponse[];
  possible: PlantResponse[];
}

/**
 * 1. AI 사진 분석 API 호출
 */
export async function analyzeImage(file: File): Promise<ImageAnalysisResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axiosInstance.post<ImageAnalysisResponse>(
    "/analysis/analyze-image",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
}

/**
 * 햇빛 조건 한글/영문 값을 백엔드 입력 Enum 규격으로 변환하는 헬퍼 함수
 */
export function convertSunlightToInputEnum(sunlight: string): string {
  switch (sunlight) {
    case "매우 높음":
    case "VERY_HIGH":
      return "VERY_HIGH";
    case "보통~높음":
    case "HIGH":
      return "HIGH";
    case "중간":
    case "MEDIUM":
      return "NORMAL_TO_HIGH";
    case "보통":
    case "NORMAL":
      return "NORMAL";
    case "보통~낮음":
    case "LOW_MEDIUM":
      return "LOW_TO_NORMAL";
    case "낮음":
    case "LOW":
      return "LOW";
    case "매우 낮음":
    case "VERY_LOW":
      return "VERY_LOW";
    default:
      return "NORMAL";
  }
}

/**
 * 2. 환경 진단 API 호출
 */
export async function diagnoseEnvironment(
  sunlight: string,
  temperature: number,
  humidity: string
): Promise<EnvironmentDiagnosisResponse> {
  const mappedSunlight = convertSunlightToInputEnum(sunlight);
  
  // 습도 값 포맷 보장 (예: "60" -> "60%")
  let formattedHumidity = humidity.trim();
  if (formattedHumidity && !formattedHumidity.endsWith("%")) {
    formattedHumidity = `${formattedHumidity}%`;
  }

  const response = await axiosInstance.post<EnvironmentDiagnosisResponse>(
    "/diagnosis/diagnose",
    {
      sunlight: mappedSunlight,
      temperature,
      humidity: formattedHumidity,
    }
  );
  return response.data;
}

/**
 * 3. 식물 추천 API 호출
 */
export async function recommendPlants(envTypeId: string): Promise<PlantRecommendResponse> {
  const response = await axiosInstance.get<PlantRecommendResponse>(
    "/plants/recommend",
    {
      params: {
        env_type_id: envTypeId,
      },
    }
  );
  return response.data;
}
