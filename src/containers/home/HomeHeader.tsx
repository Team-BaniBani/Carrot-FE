import { HOME_GREETING, HOME_TITLE_LINES } from "@/constants/home/content";
import { DIAGNOSED_HOME_GREETING, DIAGNOSED_HOME_TITLE_LINES } from "@/constants/home/diagnosed";

type Props = { isDiagnosed?: boolean };

export default function HomeHeader({ isDiagnosed = false }: Props) {
  const greeting = isDiagnosed ? DIAGNOSED_HOME_GREETING : HOME_GREETING;
  const titleLines = isDiagnosed ? DIAGNOSED_HOME_TITLE_LINES : HOME_TITLE_LINES;

  return (
    <header className="space-y-[6px]">
      <p className="text-[16px] leading-[24px] text-primary-20">{greeting}</p>
      <h1 className="text-[24px] font-bold leading-[36px] tracking-[0.96px] text-primary">
        <span className="block">{titleLines[0]}</span>
        <span className="block">{titleLines[1]}</span>
      </h1>
    </header>
  );
}
