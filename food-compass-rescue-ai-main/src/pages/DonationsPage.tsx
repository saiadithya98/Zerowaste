
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Edit, Trash2, Loader2 } from "lucide-react";
import { formatDistance } from "date-fns";

interface Donation {
  id: string;
  title: string;
  description: string | null;
  food_type: string | null;
  quantity: string;
  status: string | null;
  image_url: string | null;
  latitude: number;
  longitude: number;
  address: string | null;
  expiry_time: string;
  pickup_window: string | null;
  created_at: string | null;
}

const DonationsPage = () => {
  const { session } = useAuth();
  const { toast } = useToast();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchDonations = async () => {
    if (!session?.user) return;

    try {
      const { data, error } = await supabase
        .from('donations')
        .select('*')
        .eq('donor_id', session.user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDonations(data as Donation[]);
    } catch (error: any) {
      console.error("Error fetching donations:", error);
      toast({
        title: "Failed to load donations",
        description: error.message || "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, [session]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this donation?")) return;
    
    setDeletingId(id);
    
    try {
      const { error } = await supabase
        .from('donations')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      setDonations(prev => prev.filter(donation => donation.id !== id));
      
      toast({
        title: "Donation deleted",
        description: "Your donation has been removed successfully",
      });
    } catch (error: any) {
      console.error("Error deleting donation:", error);
      toast({
        title: "Failed to delete donation",
        description: error.message || "Please try again later",
        variant: "destructive"
      });
    } finally {
      setDeletingId(null);
    }
  };

  const getStatusBadgeColor = (status: string | null) => {
    switch (status) {
      case 'fresh':
        return "bg-green-500";
      case 'expiring_soon':
        return "bg-yellow-500";
      case 'expired':
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-eco-green-800">Your Donations</h1>
            <p className="text-gray-600 mt-1">
              Manage your food donations
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button variant="default" asChild>
              <a href="/donate">Create New Donation</a>
            </Button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center p-12">
            <Loader2 className="h-8 w-8 animate-spin text-eco-green-600" />
          </div>
        ) : donations.length === 0 ? (
          <Card className="bg-gray-50 border-dashed">
            <CardContent className="flex flex-col items-center justify-center p-12">
              <p className="text-gray-500 mb-4 text-center">You haven't posted any donations yet.</p>
              <Button asChild>
                <a href="/donate">Create Your First Donation</a>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {donations.map((donation) => (
              <Card key={donation.id} className="overflow-hidden">
                {donation.image_url ? (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={donation.image_url} 
                      alt={donation.title} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    <p className="text-gray-500 italic">No image available</p>
                  </div>
                )}
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-eco-green-800">{donation.title}</CardTitle>
                    <Badge className={getStatusBadgeColor(donation.status)}>
                      {donation.status || "Unknown"}
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    {donation.address || `${donation.latitude.toFixed(3)}, ${donation.longitude.toFixed(3)}`}
                  </CardDescription>
                  <CardDescription className="flex items-center mt-1">
                    <Clock className="h-4 w-4 mr-1" />
                    {donation.created_at ? (
                      `Added ${formatDistance(new Date(donation.created_at), new Date(), { addSuffix: true })}`
                    ) : (
                      "Recently added"
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm line-clamp-2">{donation.description || "No description provided."}</p>
                  <div className="mt-3 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Food Type:</span>
                      <span>{donation.food_type === "veg" ? "Vegetarian" : "Non-Vegetarian"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Quantity:</span>
                      <span>{donation.quantity}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Expires:</span>
                      <span>{new Date(donation.expiry_time).toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2 pt-0">
                  <Button variant="outline" size="sm" asChild>
                    <a href={`/donations/${donation.id}/edit`}>
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </a>
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDelete(donation.id)} 
                    disabled={deletingId === donation.id}
                  >
                    {deletingId === donation.id ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DonationsPage;
