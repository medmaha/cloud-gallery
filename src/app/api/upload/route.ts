import Cloudinary, { cloudinaryConfig } from "@/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: Response) {
  try {
    const { paramsToSign } = await request.json();

    if (!paramsToSign)
      return NextResponse.json(
        { message: "Forbidden: Invalid params" },
        { status: 403 }
      );

    const signature = Cloudinary.utils.api_sign_request(
      paramsToSign,
      cloudinaryConfig.api_secret!
    );

    return Response.json({ signature });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
