"use client";

// import { GigList } from "./_components/gig-list";

interface IDashboardProps {
  searchParams: {
    search?: string;
    favorites?: string;
    filter?: string;
  };
}

const Dashboard = ({ searchParams }: IDashboardProps) => {
  return (
    // <GigList query={searchParams} />

    <div>hi</div>
  );
};

export default Dashboard;
