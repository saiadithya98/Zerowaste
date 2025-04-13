
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Mail } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const LoginPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [needsConfirmation, setNeedsConfirmation] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signIn(formData.email, formData.password);
      toast({
        title: "Login successful",
        description: "Welcome back!"
      });
      navigate("/");
    } catch (error: any) {
      const errorMessage = error.message || "Please check your credentials and try again.";
      
      // Check if this is an email confirmation error
      if (error.code === "email_not_confirmed") {
        setNeedsConfirmation(true);
        toast({
          title: "Email not confirmed",
          description: "Please check your inbox and confirm your email address before logging in.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Login failed",
          description: errorMessage,
          variant: "destructive"
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendConfirmation = async () => {
    setResendLoading(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: formData.email,
      });
      
      if (error) throw error;
      
      toast({
        title: "Confirmation email sent",
        description: "Please check your inbox for the confirmation link."
      });
    } catch (error: any) {
      toast({
        title: "Failed to send confirmation email",
        description: error.message || "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Sign in</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email"
                name="email"
                type="email" 
                placeholder="name@example.com" 
                required 
                value={formData.email} 
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-sm text-eco-green-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input 
                id="password"
                name="password" 
                type="password" 
                required 
                value={formData.password} 
                onChange={handleChange}
              />
            </div>
            
            {needsConfirmation && (
              <div className="bg-amber-50 border border-amber-200 rounded p-3 text-amber-800">
                <p className="text-sm font-medium mb-2">Email not confirmed</p>
                <p className="text-xs mb-3">Please check your inbox for a confirmation link or click below to get a new one.</p>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  className="w-full border-amber-300 bg-amber-100 hover:bg-amber-200"
                  onClick={handleResendConfirmation}
                  disabled={resendLoading}
                >
                  {resendLoading ? (
                    <>
                      <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-3 w-3" />
                      Resend confirmation email
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="text-eco-green-600 hover:underline font-medium">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
