'use client';

import { useState } from 'react';

export default function MSWDemoPage() {
	const [response, setResponse] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchData = async () => {
		setLoading(true);
		setError(null);

		try {
			const result = await fetch('https://example.com/hello');
			const data = await result.json();
			setResponse(JSON.stringify(data, null, 2));
		} catch (err) {
			setError(err instanceof Error ? err.message : 'エラーが発生しました');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
			<h1>MSW デモページ</h1>
			<p>MSWハンドラーにリクエストを送信してレスポンスを表示します。</p>

			<button
				onClick={fetchData}
				disabled={loading}
				style={{
					padding: '0.5rem 1rem',
					backgroundColor: '#0070f3',
					color: 'white',
					border: 'none',
					borderRadius: '4px',
					cursor: loading ? 'not-allowed' : 'pointer',
					opacity: loading ? 0.6 : 1,
				}}
			>
				{loading ? '取得中...' : 'データを取得'}
			</button>

			{error && (
				<div
					style={{
						marginTop: '1rem',
						padding: '1rem',
						backgroundColor: '#ffebee',
						border: '1px solid #f44336',
						borderRadius: '4px',
						color: '#d32f2f',
					}}
				>
					エラー: {error}
				</div>
			)}

			{response && (
				<div style={{ marginTop: '1rem' }}>
					<h2>レスポンス:</h2>
					<pre
						style={{
							backgroundColor: '#f5f5f5',
							padding: '1rem',
							borderRadius: '4px',
							overflow: 'auto',
							border: '1px solid #ddd',
							color: '#000',
						}}
					>
						{response}
					</pre>
				</div>
			)}
		</div>
	);
}
