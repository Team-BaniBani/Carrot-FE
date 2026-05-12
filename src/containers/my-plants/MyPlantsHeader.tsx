import { MY_PLANTS_HEADER } from "@/constants/my-plants/content";

export default function MyPlantsHeader() {
  return (
    <header className="space-y-1.5">
      <h1 className="text-heading-s text-primary">{MY_PLANTS_HEADER.title}</h1>
      <p className="text-body-m text-primary-20">{MY_PLANTS_HEADER.description}</p>
    </header>
  );
}
