import MediaViewer from "@/components/MediaViewer";

async function Resource(props: any) {
  const asset_id = props.searchParams.asset;
  return (
    <MediaViewer
      resource={{
        id: asset_id,
        width: 1024,
        height: 1024,
      }}
    />
  );
}

export default Resource;
