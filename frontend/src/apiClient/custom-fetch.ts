export const customFetch = async <TData>(
	url: string,
	options: RequestInit = {},
): Promise<TData> => {
	const baseUrl = 'http://localhost:3000'; // 環境変数などから取得するのが望ましい
	const requestUrl = new URL(url, baseUrl);

	const headers = {
		'Content-Type': 'application/json', // デフォルトのヘッダー
		...options.headers,
		// 必要に応じて認証トークンなどを追加
		// Authorization: `Bearer YOUR_TOKEN`,
	};

<<<<<<< HEAD:frontend/src/apiClient/custom-fetch.ts
  try {
    const response = await fetch(requestUrl, {
      ...options,
      headers,
    });
=======
	console.log(url);

	try {
		const response = await fetch(requestUrl, {
			...options,
			headers,
		});
>>>>>>> main:frontend/src/apiClient/customFetch.ts

		// エラー時: 今回はシンプルにステータスのみを含むエラーを throw
		if (!response.ok) {
			throw new Error(
				`API request failed with status ${response.status}: ${response.statusText}`,
			);
		}

<<<<<<< HEAD:frontend/src/apiClient/custom-fetch.ts
    // 成功時: レスポンスを JSON としてパース
    const data: TData = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
=======
		// 成功時: レスポンスを JSON としてパース
		const data: TData = await response.json();
		return data;
	} catch (error) {
		console.error('customFetch Error:', error);
		throw error;
	}
>>>>>>> main:frontend/src/apiClient/customFetch.ts
};
