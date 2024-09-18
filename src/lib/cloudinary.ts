import { v2 as Cloudinary, ResourceOptions } from "cloudinary";

export const cloudinaryConfig = {
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
};

Cloudinary.config(cloudinaryConfig);

export default Cloudinary;
