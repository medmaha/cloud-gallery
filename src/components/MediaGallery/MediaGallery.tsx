"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  X,
  Save,
  List,
  LayoutGrid,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

import { CldImage } from "next-cloudinary";

import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

interface MediaGalleryProps {
  page?: number;
  totalPages?: number;
  totalResources?: number;
  resources: CloudinaryAssetResource[];
}

const MediaGallery = ({ resources, page = 1, ...props }: MediaGalleryProps) => {
  const [selected, setSelected] = useState<Array<string>>([]);
  const [creation, setCreation] = useState();
  const router = useRouter();

  /**
   * handleOnClearSelection
   */

  function handleOnClearSelection() {
    setSelected([]);
  }

  /**
   * handleOnCreationOpenChange
   */

  function handleOnCreationOpenChange(isOpen: boolean) {
    if (!isOpen) {
      setCreation(undefined);
    }
  }

  const [gridView, setGridView] = useState(true);

  return (
    <>
      {/** Popup modal used to preview and confirm new creations */}

      <Dialog open={!!creation} onOpenChange={handleOnCreationOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save your creation?</DialogTitle>
          </DialogHeader>
          <DialogFooter className="justify-end sm:justify-end">
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save to Library
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/** Management navbar presented when assets are selected */}

      {selected.length > 0 && (
        <Container className="fixed z-50 top-0 left-0 w-full h-16 flex items-center justify-between gap-4 bg-white shadow-lg">
          <div className="flex items-center gap-4">
            <ul>
              <li>
                <Button variant="ghost" onClick={handleOnClearSelection}>
                  <X className="h-6 w-6" />
                  <span className="sr-only">Clear Selected</span>
                </Button>
              </li>
            </ul>
            <p>
              <span>{selected?.length} Selected</span>
            </p>
          </div>
          <ul className="flex items-center gap-4">
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost">
                    <Plus className="h-6 w-6" />
                    <span className="sr-only">Create New</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <span>Option</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          </ul>
        </Container>
      )}

      {/** Gallery */}

      <Container>
        <div className="pb-4 flex items-center justify-between">
          <p className="text-2xl font-bold">My Gallery</p>
          <div className="inline-flex gap-2 items-center justify-center">
            <Button
              onClick={() => setGridView(true)}
              variant={gridView ? "secondary" : "ghost"}
              size={"icon"}
            >
              <LayoutGrid className="h-6 w-6" />
            </Button>
            <Button
              onClick={() => setGridView(false)}
              variant={!gridView ? "secondary" : "ghost"}
              size={"icon"}
            >
              <List className="h-6 w-6" />
            </Button>
          </div>
        </div>
        <div>
          {Array.isArray(resources) && (
            <ul
              className={`mb-12  ${
                gridView
                  ? "grid grid-cols-2 md:grid-cols-2 gap-4"
                  : "grid gap-2"
              }`}
            >
              {resources.map((resource) => {
                const isChecked = selected.includes(resource.asset_id);

                function handleOnSelectResource(checked: boolean) {
                  setSelected((prev) => {
                    if (checked) {
                      return Array.from(
                        new Set([...(prev || []), resource.asset_id])
                      );
                    } else {
                      return prev.filter((id) => id !== resource.asset_id);
                    }
                  });
                }

                function getResourceSize() {
                  if (resource.bytes / 1_000_000 < 0.1) {
                    const kb = resource.bytes / 1_000;
                    return `${kb.toFixed(1)} KB`;
                  }

                  const mb = resource.bytes / 1_000_000;
                  return `${mb.toFixed(1)} MB`;
                }

                return (
                  <li
                    key={resource.asset_id}
                    className={` ${
                      !gridView
                        ? "p-1 w-full flex gap-2 bg-secondary/10 hover:bg-secondary/50 transition"
                        : "bg-white dark:bg-zinc-700"
                    }`}
                  >
                    {!gridView && (
                      <Checkbox
                        className={`w-6 h-6 self-center rounded-full bg-white shadow ${
                          isChecked ? "border-blue-500" : "border-zinc-200"
                        }`}
                        id={resource.asset_id}
                        onCheckedChange={handleOnSelectResource}
                        checked={isChecked}
                      />
                    )}
                    <div className="relative group">
                      <label
                        className={`absolute ${
                          isChecked ? "opacity-100" : "opacity-0"
                        } group-hover:opacity-100 transition-opacity top-3 left-3 p-1`}
                        htmlFor={resource.asset_id}
                      >
                        <span className="sr-only">
                          Select Image &quot;{resource.asset_id}&quot;
                        </span>
                        <Checkbox
                          className={`w-6 h-6 rounded-full bg-white shadow ${
                            isChecked ? "border-blue-500" : "border-zinc-200"
                          }`}
                          id={resource.asset_id}
                          onCheckedChange={handleOnSelectResource}
                          checked={isChecked}
                        />
                      </label>
                      <Link
                        className={`block cursor-pointer outline-2 transition-[border] ${
                          isChecked ? "outline outline-blue-500" : ""
                        }`}
                        href={`resources?asset=${resource.secure_url}`}
                      >
                        <CldImage
                          quality={"auto"}
                          crop="fill"
                          gravity="auto"
                          width={gridView ? 600 : 250}
                          height={gridView ? 500 : 220}
                          className="border rounded"
                          src={resource.public_id}
                          alt=""
                        />
                      </Link>
                    </div>
                    {!gridView && (
                      <div className="flex flex-col">
                        <Link
                          href={`resources?asset=${resource.secure_url}`}
                          className="block"
                        >
                          <p className="text-lg font-bold">
                            {resource.display_name}
                          </p>
                          <p className="text-muted-foreground text-sm">
                            {resource.asset_id}
                          </p>
                        </Link>
                        <br />

                        <span className="text-sm">
                          <small>Bytes: {getResourceSize()}</small>
                        </span>
                        <span className="text-sm">
                          <small>
                            Type: {resource.resource_type}/{resource.format}
                          </small>
                        </span>
                        <span className="text-sm">
                          <small>
                            Size: {resource.width}x{resource.height}
                          </small>
                        </span>
                        <span className="text-sm">
                          <small>
                            Uploaded At:{" "}
                            {new Date(resource.created_at).toLocaleDateString()}{" "}
                          </small>
                        </span>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <div className="bg-secondary/50 p-4 flex items-center justify-between">
          <div className="flex flex-col gap-2 items-start justify-center">
            <p className="text-sm">
              Images:{" "}
              <strong>
                {" "}
                {resources.length}/{props.totalResources}
              </strong>
            </p>
            <div className="flex gap-2 items-center">
              <Button variant={"outline"} size={"sm"}>
                <ArrowLeft className="w-4 h-4" />
                Prev
              </Button>
              <div className="">
                <span className="p-2 px-4 rounded border">{page}</span>
              </div>
              <Button variant={"outline"} size={"sm"}>
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <p className="text-sm">
            <strong>
              Total Size: ({getTotalBytes(resources).toFixed(1)} MB)
            </strong>
            <br />
            <span className="text-xs">
              Base on {resources.length} resources
            </span>
          </p>
        </div>
      </Container>
    </>
  );
};

const getTotalBytes = (resources: CloudinaryAssetResource[]) => {
  const bytes = resources.reduce((acc, resource) => {
    return acc + resource.bytes;
  }, 0);

  return bytes / 1_000_000;
};

export default MediaGallery;
