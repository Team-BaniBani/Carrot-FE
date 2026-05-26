import { Suspense } from "react";
import HandbookContainer from "@/containers/handbook/HandbookContainer";

export default function HandbookPage() {
  return (
    <Suspense fallback={<div className="flex flex-1 items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-primary-0 border-t-transparent animate-spin" /></div>}>
      <HandbookContainer />
    </Suspense>
  );
}