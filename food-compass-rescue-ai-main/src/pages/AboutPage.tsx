
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BarChart, Recycle, Users, Timer, MapPin, ShieldCheck } from "lucide-react";

const AboutPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-eco-green-800 mb-4">
            About ZeroWaste
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're on a mission to reduce food waste and fight hunger through technology and community action.
          </p>
        </section>
        
        {/* Our Mission */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-eco-green-700 mb-4">Our Mission</h2>
              <p className="text-gray-700 mb-4">
                ZeroWaste aims to create a world where no edible food goes to waste while people go hungry. 
                We use technology to connect those with surplus food to those who need it most, creating a 
                more sustainable and equitable food system.
              </p>
              <p className="text-gray-700 mb-4">
                Every year, billions of tons of food are wasted globally while millions suffer from hunger. 
                We believe this paradox can be solved through better coordination, real-time information, 
                and community action.
              </p>
              <div className="flex items-center mt-6">
                <Recycle className="h-12 w-12 text-eco-green-500 mr-4" />
                <div>
                  <h3 className="font-semibold text-eco-green-800">Environmental Impact</h3>
                  <p className="text-sm text-gray-600">
                    Every kg of food rescued prevents 1.5 kg of CO₂ emissions
                  </p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt="Community food sharing" 
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="mb-16 bg-eco-green-50 py-12 px-6 md:px-12 rounded-2xl">
          <h2 className="text-3xl font-bold text-eco-green-700 mb-8 text-center">
            How ZeroWaste Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 rounded-full bg-eco-green-100 flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-eco-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Intelligent Mapping</h3>
              <p className="text-gray-600">
                Our geo-intelligent platform shows available food donations in real-time, allowing 
                recipients to find the closest available food.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 rounded-full bg-eco-green-100 flex items-center justify-center mb-4">
                <Timer className="h-6 w-6 text-eco-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Time-Sensitive Donations</h3>
              <p className="text-gray-600">
                Our system prioritizes food that's nearing expiration, ensuring nothing goes to 
                waste by connecting it with recipients who can use it immediately.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 rounded-full bg-eco-green-100 flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6 text-eco-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Recipients</h3>
              <p className="text-gray-600">
                We verify all receiving organizations and individuals to ensure food donations 
                reach legitimate recipients who will distribute them properly.
              </p>
            </div>
          </div>
        </section>
        
        {/* Impact */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-eco-green-700 mb-8 text-center">
            Our Impact
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12">
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
          
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1531070498922-0508db325531?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt="Data analytics" 
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
            </div>
            <div className="md:w-1/2">
              <div className="flex items-center mb-6">
                <BarChart className="h-10 w-10 text-eco-green-600 mr-4" />
                <h3 className="text-2xl font-semibold text-eco-green-800">Measuring Our Impact</h3>
              </div>
              <p className="text-gray-700 mb-4">
                We track and measure the impact of every donation to understand how much food 
                we're saving, how many people we're feeding, and how much CO₂ emissions we're preventing.
              </p>
              <p className="text-gray-700 mb-4">
                This data helps us improve our platform, identify areas where more support is needed, 
                and show our donors and partners the real difference they're making.
              </p>
            </div>
          </div>
        </section>
        
        {/* Join Us */}
        <section className="bg-eco-green-600 text-white py-12 px-6 md:px-12 rounded-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-eco-green-50 max-w-2xl mx-auto mb-8">
            Whether you have food to donate, are in need of food, or want to volunteer your time, 
            there's a place for you in the ZeroWaste community.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/register">Sign Up Now</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white hover:bg-white/10" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AboutPage;
