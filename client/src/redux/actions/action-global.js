export const setDevice = (device) => {
	return { 
		type: 'setDevice',
		device
	};
};

export const increaseCount = () => {
	return {
		type: 'increaseCount'
	};
};

export const decreaseCount = () => { 
	return {
		type: 'decreaseCount'
	};
};