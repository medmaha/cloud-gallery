import { v2 as cloudinary, UploadResponseCallback } from "cloudinary";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    console.log(data);

    return NextResponse.json({ data }, { status: 200 });

    const uploadResponseCallback: UploadResponseCallback = (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log(result);
      }
    };

    await cloudinary.uploader.upload(
      "https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg",
      {
        public_id: "shoes",
      },
      uploadResponseCallback
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
