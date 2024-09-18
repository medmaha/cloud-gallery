import MediaGallery from "@/components/MediaGallery";
import { getAllResources } from "./actions";

export default async function Home() {
  const { resources } = await getAllResources();

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
