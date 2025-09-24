'use client';

import { Button } from '@/components/ui/button';
import { useButtonClick } from '../hooks';

export function DemoButton() {
	const { handleClick } = useButtonClick();

	return (
		<div className="flex flex-wrap items-center gap-2 md:flex-row">
			<Button size="sm" variant="link" onClick={handleClick}>
				Click me
			</Button>
		</div>
	);
}
