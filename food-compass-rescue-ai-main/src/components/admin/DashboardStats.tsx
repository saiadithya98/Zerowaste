
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Apple, Users, Truck, Leaf } from "lucide-react";

const data = [
  {
    day: "Monday",
    foodSaved: 120,
    peopleServed: 60,
  },
  {
    day: "Tuesday",
    foodSaved: 170,
    peopleServed: 85,
  },
  {
    day: "Wednesday",
    foodSaved: 145,
    peopleServed: 72,
  },
  {
    day: "Thursday",
    foodSaved: 190,
    peopleServed: 95,
  },
  {
    day: "Friday",
    foodSaved: 210,
    peopleServed: 105,
  },
  {
    day: "Saturday",
    foodSaved: 250,
    peopleServed: 125,
  },
  {
    day: "Sunday",
    foodSaved: 220,
    peopleServed: 110,
  },
];

const DashboardStats = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Food Saved</CardTitle>
          <Apple className="h-4 w-4 text-eco-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,305 kg</div>
          <p className="text-xs text-muted-foreground">+12% from last week</p>
          <div className="h-[60px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <Line
                  type="monotone"
                  dataKey="foodSaved"
                  stroke="#48972f"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">People Served</CardTitle>
          <Users className="h-4 w-4 text-eco-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">652</div>
          <p className="text-xs text-muted-foreground">+8% from last week</p>
          <div className="h-[60px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <Line
                  type="monotone"
                  dataKey="peopleServed"
                  stroke="#1e9ac8"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Donors</CardTitle>
          <Truck className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">87</div>
          <p className="text-xs text-muted-foreground">+4% from last month</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">CO₂ Saved</CardTitle>
          <Leaf className="h-4 w-4 text-eco-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,962 kg</div>
          <p className="text-xs text-muted-foreground">+15% from last month</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
