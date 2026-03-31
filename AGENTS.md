<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project Implementation Guide

### 1) Styling and Design Tokens
- Always reference and reuse the design system from `/src/styles`.
- Prefer token-based Tailwind utilities (colors, spacing, radius, typography) defined in `tailwind.config.ts`.

### 2) App Router and Domain Structure
- When creating a route in `/src/app`, also create the same domain folder in `/src/containers` and split UI/logic there.
- Keep `/src/app/**/page.tsx` minimal and focused on route composition.
- Recommended pattern:
	- Route entry in `/src/app/<domain>/page.tsx`
	- Domain container in `/src/containers/<domain>/`
	- Container subparts (header/body/section, etc.) inside that domain folder

### 3) Server Component Rule for Page
- `/src/app/**/page.tsx` must be a Server Component by default.
- Do not add `"use client"` to `page.tsx` unless absolutely required.
- Put client-only state/event logic in container or UI child components marked with `"use client"`.

### 4) Example Composition
- Follow this style for client logic split under container components:

```tsx
import Calendar from '@/components/ui/calendar';
import ExchangeDetailModal from '@/components/ui/exchange-detail-modal';
import SupervisionHeader from '@/containers/supervision/header';
import { useSupervision } from '@/hooks/useSupervision';
import { LEGENDS } from '@/constants/supervision';

export default function SupervisionPage() {
	return (
		<div className="space-y-section">
			<SupervisionHeader
				exchangeMode={exchangeMode}
				onExchangeClick={handleExchangeClick}
				showMyOnly={showMyOnly}
				onToggleMyOnly={() => setShowMyOnly((prev) => !prev)}
			/>
			<div className="rounded-card bg-card-bg p-card">
				<Calendar
					year={year}
					month={month}
					onMonthChange={handleMonthChange}
					events={events}
					legends={LEGENDS}
					showYear={true}
					showLegend={true}
					exchangeMode={exchangeMode}
					currentTeacherId={currentTeacherId || ''}
					selectedMyEvent={selectedMyEvent}
					onMyEventSelect={handleMyEventSelect}
					onTargetEventSelect={handleTargetEventSelect}
				/>
			</div>

			<ExchangeDetailModal
				isOpen={isModalOpen}
				exchange={exchangeRequest}
				currentTeacherId={currentTeacherId || ''}
				onClose={handleCloseModal}
				onAccept={() => {}}
				onReject={() => {}}
				onSubmit={handleSubmit}
			/>
		</div>
	);
}
```
