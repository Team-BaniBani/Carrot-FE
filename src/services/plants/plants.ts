export type PlantEnvironmentId = "water" | "temperature" | "humidity" | "sunlight";

export type PlantEnvironmentItem = {
  id: PlantEnvironmentId;
  label: string;
  value: string;
};

export type PlantDetailItem = {
  id: string;
  name: string;
  englishName: string;
  description: string;
  imageUrl: string;
  tags: string[];
  environment: PlantEnvironmentItem[];
};

export type PlantListItem = {
  id: string;
  name: string;
  englishName: string;
  description: string;
  badges: string[];
  imageUrl?: string;
};

type PlantResponse = {
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
  image_path?: string | null;
  view_count?: number | null;
};

const DEFAULT_API_BASE_URL = "https://carrot-back.vercel.app";
const DEFAULT_IMAGE_BASE_URL = "https://carrot-back.vercel.app";

const API_BASE_URL = (
  process.env.PLANT_API_BASE_URL ??
  process.env.NEXT_PUBLIC_PLANT_API_BASE_URL ??
  DEFAULT_API_BASE_URL
).replace(/\/$/, "");

const IMAGE_BASE_URL = (
  process.env.NEXT_PUBLIC_IMAGE_BASE_URL ??
  DEFAULT_IMAGE_BASE_URL
).replace(/\/$/, "");

const API_PREFIX = `${API_BASE_URL}/api/v1`;

const resolveImageUrl = (imagePath: string | null | undefined) => {
  if (!imagePath) return "/icons/plant.svg";
  if (imagePath.startsWith("http")) return imagePath;
  const normalized = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  return `${IMAGE_BASE_URL}${normalized}`;
};

const formatAirPurification = (value: string | null | undefined) =>
  value ? `공기정화 ${value}` : null;

const buildBadges = (plant: PlantResponse) =>
  [
    plant.management_difficulty,
    formatAirPurification(plant.air_purification_effect),
    plant.size,
  ].filter((value): value is string => Boolean(value));

const fetchPlantApi = async <T>(path: string): Promise<T> => {
  const response = await fetch(`${API_PREFIX}${path}`, { next: { revalidate: 300 } });
  if (!response.ok) {
    throw new Error(`Plant API request failed: ${response.status}`);
  }
  return response.json() as Promise<T>;
};

const toPlantListItem = (plant: PlantResponse): PlantListItem => ({
  id: plant.id,
  name: plant.name_ko,
  englishName: plant.name_en,
  description: plant.explanation ?? "",
  badges: buildBadges(plant),
  imageUrl: resolveImageUrl(plant.image_path),
});

const toPlantDetailItem = (plant: PlantResponse): PlantDetailItem => ({
  id: plant.id,
  name: plant.name_ko,
  englishName: plant.name_en,
  description: plant.explanation ?? "",
  imageUrl: resolveImageUrl(plant.image_path),
  tags: buildBadges(plant),
  environment: [
    { id: "water", label: "물주기", value: plant.watering },
    { id: "temperature", label: "적정 온도", value: plant.appropriate_temperature },
    { id: "humidity", label: "적정 습도", value: plant.appropriate_humidity },
    { id: "sunlight", label: "햇빛", value: plant.sunlight_requirements },
  ],
});

export async function getPlantList(): Promise<PlantListItem[]> {
  try {
    const plants = await fetchPlantApi<PlantResponse[]>("/plants");
    return plants.map(toPlantListItem);
  } catch (error) {
    console.error("[Plant API] Failed to fetch plant list", error);
    return [];
  }
}

export async function getPopularPlants(limit = 5): Promise<PlantListItem[]> {
  try {
    const plants = await fetchPlantApi<PlantResponse[]>("/plants");
    return plants
      .sort((a, b) => (b.view_count ?? 0) - (a.view_count ?? 0))
      .slice(0, limit)
      .map(toPlantListItem);
  } catch (error) {
    console.error("[Plant API] Failed to fetch popular plants", error);
    return [];
  }
}

export async function getPlantDetail(plantId: string): Promise<PlantDetailItem | null> {
  const response = await fetch(`${API_PREFIX}/plants/${encodeURIComponent(plantId)}`, {
    next: { revalidate: 300 },
  });
  if (response.status === 404) return null;
  if (!response.ok) {
    console.error("[Plant API] Failed to fetch plant detail", {
      plantId,
      status: response.status,
    });
    return null;
  }
  const plant = (await response.json()) as PlantResponse;
  return toPlantDetailItem(plant);
}
