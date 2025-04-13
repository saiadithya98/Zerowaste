
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import DonationForm from "@/components/donations/DonationForm";

const DonatePage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-eco-green-800">Donate Food</h1>
            <p className="text-gray-600 mt-1">
              Share your surplus food with those who need it most.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link to="/donations" className="text-eco-green-600 hover:text-eco-green-700 font-medium">
              View Your Donations
            </Link>
          </div>
        </div>
        
        <DonationForm />
      </div>
    </Layout>
  );
};

export default DonatePage;
