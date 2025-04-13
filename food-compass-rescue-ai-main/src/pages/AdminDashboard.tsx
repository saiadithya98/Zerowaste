
import Layout from "@/components/layout/Layout";
import DashboardStats from "@/components/admin/DashboardStats";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { sampleDonations, sampleUsers } from "@/data/sampleData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

const AdminDashboard = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-eco-green-800 mb-6">Admin Dashboard</h1>
        
        <DashboardStats />
        
        <div className="mt-8">
          <Tabs defaultValue="donations">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="donations">Recent Donations</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            
            <TabsContent value="donations" className="space-y-4">
              {sampleDonations.map(donation => (
                <Card key={donation.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div>
                        <CardTitle>{donation.title}</CardTitle>
                        <CardDescription>{donation.donorName}</CardDescription>
                      </div>
                      <Badge variant={
                        donation.status === "fresh" ? "default" :
                        donation.status === "expiring_soon" ? "outline" : "secondary"
                      }>
                        {donation.status === "fresh" && "Fresh"}
                        {donation.status === "expiring_soon" && "Expiring Soon"}
                        {donation.status === "expired" && "Expired"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-600">
                        <p>Quantity: {donation.quantity}</p>
                        <p>Type: {donation.foodType === "veg" ? "Vegetarian" : "Non-Vegetarian"}</p>
                        <p>Pickup: {donation.pickupWindow}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">View</Button>
                        <Button size="sm" variant="outline" className="text-red-500 hover:text-red-700">
                          Remove
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="users" className="space-y-4">
              {sampleUsers.map(user => (
                <Card key={user.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div>
                        <CardTitle>{user.name}</CardTitle>
                        <CardDescription>{user.email}</CardDescription>
                      </div>
                      <Badge>
                        {user.role === "donor" ? "Donor" : "Receiver"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-600">
                        <p>Organization: {user.organization || "Individual"}</p>
                        <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
                        <p className="flex items-center">
                          {user.verified ? (
                            <><CheckCircle className="h-4 w-4 mr-1 text-eco-green-500" /> Verified</>
                          ) : (
                            <><AlertCircle className="h-4 w-4 mr-1 text-amber-500" /> Pending Verification</>
                          )}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">View Profile</Button>
                        {!user.verified && (
                          <Button size="sm">Verify</Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="reports">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Impact Report</CardTitle>
                  <CardDescription>April 2025</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      <div className="bg-eco-green-50 p-4 rounded-lg">
                        <h3 className="font-medium">Total Food Saved</h3>
                        <p className="text-2xl font-bold">4,320 kg</p>
                        <p className="text-xs text-gray-500">+18% from last month</p>
                      </div>
                      
                      <div className="bg-eco-blue-50 p-4 rounded-lg">
                        <h3 className="font-medium">Total People Served</h3>
                        <p className="text-2xl font-bold">2,160</p>
                        <p className="text-xs text-gray-500">+12% from last month</p>
                      </div>
                      
                      <div className="bg-eco-green-50 p-4 rounded-lg">
                        <h3 className="font-medium">CO₂ Emissions Prevented</h3>
                        <p className="text-2xl font-bold">6,480 kg</p>
                        <p className="text-xs text-gray-500">+18% from last month</p>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="font-medium mb-3">Top Contributing Organizations</h3>
                      <ul className="space-y-2">
                        {sampleUsers
                          .filter(user => user.role === "donor")
                          .slice(0, 5)
                          .map(user => (
                            <li key={user.id} className="flex justify-between items-center border-b pb-2">
                              <span>{user.organization}</span>
                              <Badge variant="outline">120 kg</Badge>
                            </li>
                          ))}
                      </ul>
                    </div>
                    
                    <div className="mt-6 text-right">
                      <Button>Download Full Report</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
