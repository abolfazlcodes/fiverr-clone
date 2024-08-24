// import { CreateForm } from "./_components/create-form";

interface ICreateGigProps {
  params: {
    username: string;
  };
}

const CreateGig = ({ params }: ICreateGigProps) => {
  return (
    <div className="flex justify-center">
      {/* <CreateForm username={params.username} /> */}
    </div>
  );
};

export default CreateGig;
