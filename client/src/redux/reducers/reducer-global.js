export const device = (state = '', action) => {
	switch(action.type) {
		case 'setDevice':
			return action.device;
		default:
			return state;
	};
};

export const count = (state = 0, action) => {
	switch(action.type) {
		case 'increaseCount':
			return state + 1;
		case 'decreaseCount':
			return state - 1;
		default:
			return state;
	};
};