import HandbookContainer from "@/containers/handbook/HandbookContainer";
import { getPlantList } from "@/services/plants/plants";

export default async function HandbookPage() {
  const plants = await getPlantList();
  return <HandbookContainer plants={plants} />;
}