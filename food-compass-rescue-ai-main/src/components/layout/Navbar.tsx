
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Globe, LogIn, User, PlusCircle, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { session, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
      });
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <nav className="bg-white shadow-sm py-4 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Globe className="h-8 w-8 text-eco-green-600" />
          <span className="text-2xl font-bold text-eco-green-800">ZeroWaste</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/map" className="text-gray-700 hover:text-eco-green-600 font-medium">
            Find Food
          </Link>
          <Link to="/donate" className="text-gray-700 hover:text-eco-green-600 font-medium">
            Donate
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-eco-green-600 font-medium">
            About
          </Link>
          
          {session ? (
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" asChild>
                <Link to="/donations">
                  <PlusCircle className="h-4 w-4 mr-1" />
                  My Donations
                </Link>
              </Button>
              
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-1" />
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" asChild>
                <Link to="/login">
                  <LogIn className="h-4 w-4 mr-1" />
                  Log In
                </Link>
              </Button>
              
              <Button size="sm" asChild>
                <Link to="/register">
                  <User className="h-4 w-4 mr-1" />
                  Register
                </Link>
              </Button>
            </div>
          )}
        </div>
        
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={cn("md:hidden", isMenuOpen ? "block" : "hidden")}>
        <div className="px-4 py-4 space-y-4 flex flex-col">
          <Link to="/map" className="text-gray-700 hover:text-eco-green-600 font-medium">
            Find Food
          </Link>
          <Link to="/donate" className="text-gray-700 hover:text-eco-green-600 font-medium">
            Donate
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-eco-green-600 font-medium">
            About
          </Link>
          
          {session ? (
            <div className="flex flex-col space-y-2">
              <Button variant="outline" size="sm" asChild>
                <Link to="/donations">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  My Donations
                </Link>
              </Button>
              
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex flex-col space-y-2">
              <Button variant="outline" size="sm" asChild>
                <Link to="/login">
                  <LogIn className="h-4 w-4 mr-2" />
                  Log In
                </Link>
              </Button>
              
              <Button size="sm" asChild>
                <Link to="/register">
                  <User className="h-4 w-4 mr-2" />
                  Register
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
