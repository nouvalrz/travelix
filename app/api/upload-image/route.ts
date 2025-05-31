import { NextRequest, NextResponse } from "next/server";
import FormData from "form-data";

import { fetchApiFormDataFromServer } from "@/lib/fetchApi";

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const formData = await req.formData();
  const imageFile = formData.get("image") as File;

  const arrayBuffer = await imageFile.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const form = new FormData();

  form.append("image", buffer, {
    filename: imageFile.name,
    contentType: imageFile.type,
    knownLength: buffer.length,
  });

  const bufferData = form.getBuffer();

  const headers = {
    ...form.getHeaders(),
    "Content-Length": bufferData.length.toString(),
  };

  const response = await fetchApiFormDataFromServer("/upload-image", {
    method: "POST",
    headers,
    body: bufferData,
  });

  const responseData = await response.json();

  return NextResponse.json({ ...responseData }, { status: response.status });
};
