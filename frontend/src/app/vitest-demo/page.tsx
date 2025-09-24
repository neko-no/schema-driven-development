import { DemoButton } from './components/button';

export default function Home() {
	return (
		<div className="flex flex-wrap items-center gap-2 md:flex-row">
			<DemoButton />
			<h1 className="font-bold text-3xl underline">Hello world!</h1>
		</div>
	);
}
