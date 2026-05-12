import { BulbGreen } from "@/../public/icons/index";
import { HOME_TIP_SECTION_TITLE, HOME_TIP_TEXT } from "@/constants/home/content";

export default function HomePlantTip() {
  return (
    <section className="mt-6">
      <h2 className="text-[16px] font-bold leading-[24px] tracking-[0.64px] text-neutral-dark-0">
        {HOME_TIP_SECTION_TITLE}
      </h2>

      <div className="mt-[6px] flex items-center gap-3 rounded-[12px] bg-card-bg p-4 shadow-[0_0_20px_rgba(42,31,19,0.1)]">
        <BulbGreen className="h-6 w-6 shrink-0" />
        <p className="text-[12px] leading-[18px] text-primary">{HOME_TIP_TEXT}</p>
      </div>
    </section>
  );
}
