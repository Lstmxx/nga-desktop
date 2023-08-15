import { NextRequest } from "next/server";
import { http } from "../../common";


export async function GET(req: NextRequest) {
  console.log('jin ru');
  const from = 'login';
  const checkCodeId = `${from}${(Math.random() + '').substring(2)}`;
  const url = req.nextUrl.clone();
  url.pathname = `/login_check_code.php?id=${checkCodeId}&from=${from}`;
  const request = new NextRequest(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'image/png',
    },
  });
  const response = await http(request);
  return response.blob();
}