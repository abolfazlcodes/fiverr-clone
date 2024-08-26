"use client";

import { Doc, Id } from "@/convex/_generated/dataModel";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { useAuth } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import { toast } from "sonner";

interface IEditPageProps {
  params: {
    gigId: string;
  };
}

const Edit = ({ params }: IEditPageProps) => {
  const gig = useQuery(api.gig.get, { id: params.gigId as Id<"gigs"> });
  const published = useQuery(api.gig.isPublished, {
    id: params.gigId as Id<"gigs">,
  });

  const { pending: removePending, mutate: remove } = useApiMutation(
    api.gig.remove
  );

  const { pending: publishPending, mutate: publish } = useApiMutation(
    api.gig.publish
  );
  const { pending: unPublishPending, mutate: unPublish } = useApiMutation(
    api.gig.unpublish
  );

  const router = useRouter();

  const identity = useAuth();

  const generateUploaderUrl = useMutation(api.gigMedia.generateUploaderUrl);

  const imageInput = useRef<HTMLInputElement>(null);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const sendImage = useMutation(api.gigMedia.sendImage);

  // here because hook cannot be conditional
  if (!identity) {
    throw new Error("unauthorized");
  }

  // undefined means it's still retrieving
  if (gig === undefined || published === undefined) {
    return null;
  }

  if (gig === null) {
    return <div>Not Found</div>;
  }

  async function handleSendImage(event: FormEvent) {
    event.preventDefault();

    if (gig === undefined) return;

    const nonNullableGig = gig as Doc<"gigs">;

    // step 1: Get a short-lived upload URL
    const postUrl = await generateUploaderUrl();

    await Promise.all(
      selectedImages.map(async (image) => {
        const result = await fetch(postUrl, {
          method: "POST",
          headers: {
            "Content-Type": image.type,
          },
          body: image,
        });

        const json = await result.json();

        if (!result.ok) {
          throw new Error(`Upload failed: ${JSON.stringify(json)}`);
        }

        const { storageId } = json;
        // step 3: save the newly allocated storage id to the database
        await sendImage({
          storageId,
          format: "image",
          gigId: nonNullableGig._id,
        }).catch((error) => {
          console.log(error);
          toast.error("Maximum 5 files reached");
        });
      })
    );

    setSelectedImages([]);
    imageInput.current!.value = "";
  }

  const onPublish = async () => {
    console.log(published);
    if (!published) {
    }
  };
};

export default Edit;
