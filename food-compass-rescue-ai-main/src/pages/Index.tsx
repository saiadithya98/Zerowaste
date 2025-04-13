
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search, Heart, MapPin, Clock, BadgeCheck } from "lucide-react";
import MapView from "@/components/map/MapView";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-eco-green-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-eco-green-800 mb-4">
              Reduce Food Waste, Feed Communities
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              ZeroWaste connects food donors with people in need through an intelligent mapping platform. Donate surplus food, reduce waste, and make a difference in your community.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Button size="lg" asChild>
                <Link to="/donate">
                  <Heart className="mr-2 h-5 w-5" />
                  Donate Food
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/map">
                  <Search className="mr-2 h-5 w-5" />
                  Find Available Food
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
            <div className="aspect-video rounded-xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1593113630400-ea4288922497?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt="Food donation" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* How it works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center text-eco-green-800 mb-12">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-eco-green-100 flex items-center justify-center mb-4">
                <MapPin className="h-8 w-8 text-eco-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Post Available Food</h3>
              <p className="text-gray-600">
                Easily post your surplus food with details on quantity, type, and pickup information.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-eco-blue-100 flex items-center justify-center mb-4">
                <Clock className="h-8 w-8 text-eco-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Schedule Pickup</h3>
              <p className="text-gray-600">
                Verified recipients can request pickups based on their location and your availability.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-eco-green-100 flex items-center justify-center mb-4">
                <BadgeCheck className="h-8 w-8 text-eco-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Complete Donation</h3>
              <p className="text-gray-600">
                Track the donation process from acceptance to confirmation, with ratings and feedback.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Preview */}
      <section className="py-16 bg-eco-green-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-eco-green-800 mb-4">
              Available Food Near You
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our interactive map shows food donations available in your area. Filter by food type, distance, and freshness to find what you need.
            </p>
          </div>
          
          <div className="h-[400px] rounded-xl overflow-hidden shadow-lg border border-eco-green-200">
            <MapView showFilters={false} />
          </div>
          
          <div className="mt-6 text-center">
            <Button asChild>
              <Link to="/map">View Full Map</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Impact Stats */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center text-eco-green-800 mb-12">
            Our Impact
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="bg-eco-green-50 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-eco-green-600 mb-2">1,305</div>
              <p className="text-gray-600">Kg of Food Saved</p>
            </div>
            
            <div className="bg-eco-blue-50 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-eco-blue-600 mb-2">652</div>
              <p className="text-gray-600">People Served</p>
            </div>
            
            <div className="bg-eco-green-50 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-eco-green-600 mb-2">87</div>
              <p className="text-gray-600">Active Donors</p>
            </div>
            
            <div className="bg-eco-blue-50 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-eco-blue-600 mb-2">1,962</div>
              <p className="text-gray-600">Kg CO₂ Prevented</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-eco-green-600 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Join the Movement Today</h2>
          <p className="text-eco-green-50 max-w-2xl mx-auto mb-8">
            Whether you're a restaurant with surplus food, an NGO helping the hungry, or an individual wanting to make a difference, ZeroWaste gives you the tools to reduce waste and feed communities.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/register">Sign Up Now</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white hover:bg-white/10" asChild>
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
