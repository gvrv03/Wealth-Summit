import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

// You don't need to import types in JavaScript, so this line is omitted
// import type { OurFileRouter } from "~/app/api/uploadthing/core";

const UploadButton = generateUploadButton();
const UploadDropzone = generateUploadDropzone();

export { UploadButton, UploadDropzone };
