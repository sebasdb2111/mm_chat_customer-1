export default function authHeader() {
	const customer = localStorage.getItem('customerToken');

	if (customer) {
		return {
			Authorization: 'Bearer ' + customer,
			// 'Content-Type': 'application/json;charset=UTF-8',
			// 'Access-Control-Allow-Origin': '*'
		};
	} else {
		return {};
	}
}
