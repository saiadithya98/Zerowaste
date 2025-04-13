
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute = ({ children, adminOnly = false }: ProtectedRouteProps) => {
  const { session, user, isLoading } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoading && !session) {
      toast({
        title: "Authentication required",
        description: "Please log in to access this page",
        variant: "destructive",
      });
    }
  }, [isLoading, session, toast]);

  // While checking authentication status, show nothing
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // Not authenticated, redirect to login
  if (!session || !user) {
    return <Navigate to="/login" replace />;
  }

  // If adminOnly is true, check if user is admin (This would require additional logic to check user role)
  // For now, we'll just return the children since we don't have admin check implemented yet
  return <>{children}</>;
};

export default ProtectedRoute;
