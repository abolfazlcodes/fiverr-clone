// "use client";

// import { useMutation } from "convex/react";
import CreateForm from "./_components/create-form";
// import { useEffect } from "react";
// import { api } from "@/convex/_generated/api";
interface ICreateGigProps {
  params: {
    username: string;
  };
}

const CreateGig = ({ params }: ICreateGigProps) => {
  // we do not need these as we did once programmatically
  // const insertSubcategories = useMutation(api.seedSubcategories.create); //initialized only

  // useEffect(() => {
  //   insertSubcategories({});
  // });

  return (
    <div className="flex justify-center">
      <CreateForm username={params.username} />
    </div>
  );
};

export default CreateGig;
