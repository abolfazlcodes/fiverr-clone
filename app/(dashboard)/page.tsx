"use client";

import { useMutation } from "convex/react";
import { useEffect } from "react";

// import { GigList } from "./_components/gig-list";

interface IDashboardProps {
  searchParams: {
    search?: string;
    favorites?: string;
    filter?: string;
  };
}

const Dashboard = ({ searchParams }: IDashboardProps) => {
  const store = useMutation(api.users.store);

  useEffect(() => {
    const storeUser = async () => {
      await store({});
    };

    storeUser();
  }, [store]);

  return (
    // <GigList query={searchParams} />

    <div>hi</div>
  );
};

export default Dashboard;
