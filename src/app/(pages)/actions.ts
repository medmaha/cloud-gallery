"use server";

import Cloudinary from "@/lib/cloudinary";

export async function getAllResources(page?: number, limit = 10) {
  const results: CloudinaryAPIResourceResponse = await Cloudinary.api.resources(
    {
      type: "upload",
      max_results: limit,
      next_cursor: page,
    }
  );

  return results;
}
