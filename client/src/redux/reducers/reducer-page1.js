export const page1Word = (state = 'awesome', action) => {
	switch(action.type) {
		case 'togglePage1Word':
			return (state == 'awesome') ? 'cool' : 'awesome';
		default:
			return state;
	};
};