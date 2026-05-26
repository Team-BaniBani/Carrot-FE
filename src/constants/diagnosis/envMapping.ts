export interface EnvDetail {
  sunlight: { text: string; percentage: number };
  ventilation: { text: string; percentage: number };
  temperature: { text: string; percentage: number };
  humidity: { text: string; percentage: number };
}

export const ENV_TYPE_MAPPING: Record<string, EnvDetail> = {
  "ENV-01": {
    sunlight: { text: "매우 높음", percentage: 90 },
    ventilation: { text: "보통", percentage: 50 },
    temperature: { text: "보통 ~ 높음", percentage: 70 },
    humidity: { text: "보통", percentage: 50 },
  },
  "ENV-02": {
    sunlight: { text: "매우 낮음", percentage: 15 },
    ventilation: { text: "보통", percentage: 50 },
    temperature: { text: "보통", percentage: 50 },
    humidity: { text: "보통", percentage: 50 },
  },
  "ENV-03": {
    sunlight: { text: "중간", percentage: 50 },
    ventilation: { text: "보통", percentage: 50 },
    temperature: { text: "보통", percentage: 50 },
    humidity: { text: "보통", percentage: 50 },
  },
  "ENV-04": {
    sunlight: { text: "보통 ~ 높음", percentage: 70 },
    ventilation: { text: "보통 ~ 낮음", percentage: 40 },
    temperature: { text: "높음", percentage: 90 },
    humidity: { text: "보통 ~ 낮음", percentage: 40 },
  },
  "ENV-05": {
    sunlight: { text: "보통", percentage: 50 },
    ventilation: { text: "보통", percentage: 50 },
    temperature: { text: "낮음", percentage: 30 },
    humidity: { text: "보통", percentage: 50 },
  },
  "ENV-06": {
    sunlight: { text: "보통", percentage: 50 },
    ventilation: { text: "높음", percentage: 80 },
    temperature: { text: "보통", percentage: 50 },
    humidity: { text: "낮음", percentage: 30 },
  },
  "ENV-07": {
    sunlight: { text: "보통 ~ 낮음", percentage: 40 },
    ventilation: { text: "낮음", percentage: 30 },
    temperature: { text: "보통", percentage: 50 },
    humidity: { text: "높음", percentage: 80 },
  },
  "ENV-08": {
    sunlight: { text: "보통 ~ 높음", percentage: 70 },
    ventilation: { text: "매우 높음", percentage: 90 },
    temperature: { text: "보통", percentage: 50 },
    humidity: { text: "보통", percentage: 50 },
  },
  "ENV-09": {
    sunlight: { text: "낮음", percentage: 30 },
    ventilation: { text: "매우 낮음", percentage: 15 },
    temperature: { text: "보통 ~ 높음", percentage: 70 },
    humidity: { text: "보통 ~ 높음", percentage: 70 },
  },
};
