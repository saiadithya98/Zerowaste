
import Layout from "@/components/layout/Layout";
import MapView from "@/components/map/MapView";
import { TooltipProvider } from "@/components/ui/tooltip";

const MapPage = () => {
  return (
    <Layout>
      {/* Ensure MapView has its own TooltipProvider context */}
      <div className="h-[calc(100vh-64px)]">
        <MapView />
      </div>
    </Layout>
  );
};

export default MapPage;
