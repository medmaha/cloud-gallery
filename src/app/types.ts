//
interface CloudinaryAssetResource {
  asset_id: string;
  public_id: string;
  format: "jpg" | "png" | "gif" | "webp";
  version: number;
  resource_type: "image" | "raw" | "video" | "auto";
  type: "upload" | "private" | "protected" | "root";
  created_at: string;
  bytes: number;
  width: number;
  height: number;
  asset_folder: string;
  display_name: string;
  url: string;
  secure_url: string;
}

interface CloudinaryAPIResourceResponse {
  resources: CloudinaryAssetResource[];
  next_cursor: string;
  rate_limit_allowed: number;
  rate_limit_reset_at: string;
  rate_limit_remaining: number;
}
