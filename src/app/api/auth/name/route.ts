 
export async function GET(request: Request) {
 
  console.log('test');

  return new Response('Hello, Next.js!', {
    status: 200,
    headers: {
      // referer,
    },
  })
}