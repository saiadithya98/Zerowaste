
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, Loader2, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "@/hooks/useAuth";

const DonationForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { session } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [foodType, setFoodType] = useState("veg");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [location, setLocation] = useState<{lat: number; lng: number} | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    quantity: "",
    expiry: "",
    pickup: "",
  });

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!session) {
      toast({
        title: "Authentication required",
        description: "Please login to donate food",
        variant: "destructive",
      });
      navigate("/login");
    }
  }, [session, navigate, toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGetLocation = () => {
    setIsGettingLocation(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setIsGettingLocation(false);
          toast({
            title: "Location detected",
            description: "Your current location has been added to the donation.",
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsGettingLocation(false);
          toast({
            title: "Location error",
            description: "Could not get your location. Please try again or enter manually.",
            variant: "destructive",
          });
        }
      );
    } else {
      setIsGettingLocation(false);
      toast({
        title: "Location not supported",
        description: "Geolocation is not supported by your browser.",
        variant: "destructive",
      });
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    if (!session?.user.id) return null;
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `${session.user.id}/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('donation-images')
        .upload(filePath, file);
        
      if (uploadError) {
        console.error("Error uploading image:", uploadError);
        throw uploadError;
      }
      
      const { data } = supabase.storage
        .from('donation-images')
        .getPublicUrl(filePath);
        
      return data.publicUrl;
    } catch (error) {
      console.error("Error in upload process:", error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!session?.user.id || !location) {
      toast({
        title: "Missing information",
        description: "Please ensure you're logged in and location is provided.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Upload image if present
      let imageUrl = null;
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }
      
      // Submit donation to Supabase
      const { error } = await supabase.from('donations').insert({
        title: formData.title,
        description: formData.description,
        food_type: foodType,
        quantity: formData.quantity,
        latitude: location.lat,
        longitude: location.lng,
        expiry_time: formData.expiry,
        pickup_window: formData.pickup,
        donor_id: session.user.id,
        image_url: imageUrl
      });
      
      if (error) throw error;
      
      toast({
        title: "Donation posted successfully",
        description: "Thank you for helping reduce food waste!",
      });
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        quantity: "",
        expiry: "",
        pickup: "",
      });
      setImagePreview(null);
      setImageFile(null);
      setLocation(null);
      
      // Redirect to donations list
      navigate("/donations");
      
    } catch (error: any) {
      console.error("Error submitting donation:", error);
      toast({
        title: "Error posting donation",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Food Title</Label>
            <Input 
              id="title" 
              placeholder="E.g. Homemade Pasta, Fresh Vegetables" 
              required
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              placeholder="Describe the food, quantity, etc." 
              required 
              className="min-h-[100px]"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Food Type</label>
            <RadioGroup value={foodType} onValueChange={setFoodType} className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="veg" id="veg" />
                <Label htmlFor="veg">Vegetarian</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="non_veg" id="non_veg" />
                <Label htmlFor="non_veg">Non-Vegetarian</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input 
              id="quantity" 
              placeholder="E.g. 2 servings, 500g, etc." 
              required
              value={formData.quantity}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry">Expiry Time</Label>
              <div className="relative">
                <Input 
                  id="expiry" 
                  type="datetime-local" 
                  required
                  value={formData.expiry}
                  onChange={handleInputChange}
                />
                <Clock className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="pickup">Pickup By</Label>
              <div className="relative">
                <Input 
                  id="pickup" 
                  type="datetime-local" 
                  required
                  value={formData.pickup}
                  onChange={handleInputChange}
                />
                <Clock className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div className="flex space-x-2">
              <Input 
                id="location" 
                placeholder={location ? `Lat: ${location.lat.toFixed(4)}, Lng: ${location.lng.toFixed(4)}` : "Your location"} 
                readOnly 
                required
                value={location ? `${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}` : ""} 
              />
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleGetLocation}
                disabled={isGettingLocation}
              >
                {isGettingLocation ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-1" />
                ) : (
                  <MapPin className="h-4 w-4 mr-1" />
                )}
                {isGettingLocation ? "Detecting..." : "Use My Location"}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Food Image</Label>
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6 bg-gray-50">
              {imagePreview ? (
                <div className="relative w-full">
                  <img 
                    src={imagePreview} 
                    alt="Food preview" 
                    className="mx-auto max-h-40 object-contain rounded-md"
                  />
                  <button 
                    type="button" 
                    className="mt-2 text-sm text-red-600 hover:text-red-800"
                    onClick={() => {
                      setImagePreview(null);
                      setImageFile(null);
                    }}
                  >
                    Remove image
                  </button>
                </div>
              ) : (
                <label htmlFor="image-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center">
                    <Upload className="h-10 w-10 text-gray-400" />
                    <p className="text-sm font-medium text-gray-700 mt-2">Upload an image</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                  </div>
                  <input 
                    id="image-upload" 
                    name="image" 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload}
                    className="sr-only"
                  />
                </label>
              )}
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting || !location}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Posting Donation...
              </>
            ) : (
              "Post Donation"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DonationForm;
