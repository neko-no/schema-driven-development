import { Button } from '@/components/ui/button';

export default function Home() {
	return (
		<div className="flex flex-wrap items-center gap-2 md:flex-row">
			<Button size="sm" variant="link">
				Click me
			</Button>
			<h1 className="text-3xl font-bold underline">Hello world!</h1>
		</div>
	);
}
