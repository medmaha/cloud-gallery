import MediaGallery from "@/components/MediaGallery";
import Cloudinary from "@/lib/cloudinary";

export default async function Home() {
  const { resources }: CloudinaryAPIResourceResponse =
    await Cloudinary.api.resources();

  return (
    <div className="h-full mt-6">
      <MediaGallery
        resources={resources}
        totalPages={3}
        totalResources={29}
        page={1}
      />
    </div>
  );
}
