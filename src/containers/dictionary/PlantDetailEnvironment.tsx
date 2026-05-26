import type {
  PlantEnvironmentId,
  PlantEnvironmentItem,
} from "@/services/plants/plants";
import {
  HumidityIcon,
  SunlightIcon,
  TemperatureIcon,
  WateringIcon,
} from "@/../public/icons/index";

const ICON_MAP: Record<PlantEnvironmentId, typeof WateringIcon> = {
  water: WateringIcon,
  temperature: TemperatureIcon,
  humidity: HumidityIcon,
  sunlight: SunlightIcon,
};

function EnvironmentCard({ item }: { item: PlantEnvironmentItem }) {
  const Icon = ICON_MAP[item.id];

  return (
    <div className="flex flex-col gap-1.5 rounded-card bg-neutral-light-n10 p-3">
      <div className="flex items-center gap-1">
        <Icon className="h-[18px] w-[18px]" />
        <span className="text-body-s text-[#ad9a85]">{item.label}</span>
      </div>
      <p className="text-heading-s text-primary">{item.value}</p>
    </div>
  );
}

type PlantDetailEnvironmentProps = {
  environment: PlantEnvironmentItem[];
};

export default function PlantDetailEnvironment({ environment }: PlantDetailEnvironmentProps) {
  return (
    <section className="space-y-1.5">
      <h2 className="text-heading-xxs text-neutral-dark-0">환경 상세</h2>
      <div className="grid grid-cols-2 gap-1.5">
        {environment.map((item) => (
          <EnvironmentCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
