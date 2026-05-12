import Button from "@/components/ui/button/button";
import { MY_PLANTS_ACTIONS } from "@/constants/my-plants/content";

export default function MyPlantsActions() {
  return (
    <section className="flex w-full gap-1.5">
      <Button
        text={MY_PLANTS_ACTIONS.share}
        variant="variant4"
        className="flex-1 border-[#ad9a85]"
      />
      <Button
        text={MY_PLANTS_ACTIONS.save}
        variant="default"
        className="flex-1"
      />
    </section>
  );
}
