import { useCallback } from 'react';

export const useButtonClick = () => {
	const handleClick = useCallback(() => {
		console.log('ܿボタンがクリックされました');
		alert('ܿボタンがクリックされました');
	}, []);

	return { handleClick };
};
