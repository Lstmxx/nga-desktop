export async function GET(request: Request) {
	console.log('test');

	return new Response("{ name: 'hlllo' }", {
		status: 200,
		headers: {
			// referer,
		},
	});
}
