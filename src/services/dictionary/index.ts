import axiosInstance from "@/libs/axios";
import { PlantResponse } from "../diagnosis";

/**
 * 식물 상세 정보 API 호출
 */
export async function getPlantDetail(id: string): Promise<PlantResponse> {
  const response = await axiosInstance.get<PlantResponse>(`/plants/${id}`);
  return response.data;
}

/**
 * 전체 식물 목록 API 호출
 */
export async function listPlants(): Promise<PlantResponse[]> {
  const response = await axiosInstance.get<PlantResponse[]>("/plants");
  return response.data;
}
