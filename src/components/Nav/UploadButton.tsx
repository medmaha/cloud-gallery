"use client";

import { Upload } from "lucide-react";
import { CldUploadButton } from "next-cloudinary";
import React from "react";

export default function UploadButton() {
  return (
    <CldUploadButton
      uploadPreset="my-app-demo"
      signatureEndpoint={"/api/upload"}
      className="bg-primary inline-flex items-center gap-2 p-2 rounded-md text-white"
    >
      <Upload />
      Upload
    </CldUploadButton>
  );
}
