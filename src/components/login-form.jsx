import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import apiService from "../../utils/services";
import sessions from "../../utils/sessions";

export function LoginForm({ className, ...props }) {
  const navigate = useNavigate();
  const [formDatas, setFormDatas] = useState({ username: "", password: "" });
  const { toast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDatas({ ...formDatas, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formDatas.username === "" || formDatas.password === "") {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });

    } else {

      try {

        const response = await apiService.post("/api/auth/login", formDatas);
        
        const result = response;
        console.log(result);
        

        if (result.status !== 200) {
          toast({
            variant: "destructive",
            title: result.message,
          });
        } else {
          const expirationTime = new Date();
          expirationTime.setTime(expirationTime.getTime() + 3 * 60 * 60 * 1000);
          console.log("sinis");
          
          sessions.saveSession("token", result.data.token, expirationTime);

          navigate("/dashboard"); 
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Internal Server Error",
        });
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your PSSI account
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  formData={formDatas}
                  onChange={(e) => handleChange(e)}
                  type="text"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  name="password"
                  formData={formDatas}
                  onChange={(e) => handleChange(e)}
                  type="password"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-primary-pssi text-white"
              >
                Login
              </Button>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
