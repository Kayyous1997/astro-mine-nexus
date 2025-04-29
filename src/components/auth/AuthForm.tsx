
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';

const signUpSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the terms to continue",
  }),
});

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export default function AuthForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, signUp, resetPassword, loading } = useAuth();
  
  const isSignUp = location.pathname === '/signup';
  const [tab, setTab] = useState<string>(isSignUp ? 'signup' : 'signin');
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const signUpForm = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      termsAccepted: false,
    },
  });

  const signInForm = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const forgotPasswordForm = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSignUp = async (values: z.infer<typeof signUpSchema>) => {
    await signUp(values.email, values.password, values.username);
  };

  const handleSignIn = async (values: z.infer<typeof signInSchema>) => {
    await signIn(values.email, values.password);
  };

  const handleForgotPassword = async (values: z.infer<typeof forgotPasswordSchema>) => {
    await resetPassword(values.email);
    setShowForgotPassword(false);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="bg-dark-card border-white/10">
        {showForgotPassword ? (
          <>
            <CardHeader>
              <CardTitle>Reset Password</CardTitle>
              <CardDescription>Enter your email to receive a reset link</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...forgotPasswordForm}>
                <form onSubmit={forgotPasswordForm.handleSubmit(handleForgotPassword)} className="space-y-4">
                  <FormField
                    control={forgotPasswordForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="pt-4">
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? (
                        <span className="flex items-center">
                          <span className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          Sending...
                        </span>
                      ) : (
                        "Send Reset Link"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="justify-center">
              <Button variant="link" onClick={() => setShowForgotPassword(false)}>
                Back to login
              </Button>
            </CardFooter>
          </>
        ) : (
          <Tabs defaultValue={tab} onValueChange={setTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
              <CardHeader>
                <CardTitle>Welcome Back</CardTitle>
                <CardDescription>Enter your credentials to access your account</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...signInForm}>
                  <form onSubmit={signInForm.handleSubmit(handleSignIn)} className="space-y-4">
                    <FormField
                      control={signInForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="you@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signInForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="pt-4">
                      <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? (
                          <span className="flex items-center">
                            <span className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            Signing In...
                          </span>
                        ) : (
                          "Sign In"
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="justify-center">
                <Button variant="link" onClick={() => setShowForgotPassword(true)}>
                  Forgot password?
                </Button>
              </CardFooter>
            </TabsContent>
            
            <TabsContent value="signup">
              <CardHeader>
                <CardTitle>Create Account</CardTitle>
                <CardDescription>Enter your details to create a new account</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...signUpForm}>
                  <form onSubmit={signUpForm.handleSubmit(handleSignUp)} className="space-y-4">
                    <FormField
                      control={signUpForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="astrominer" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signUpForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="you@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signUpForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signUpForm.control}
                      name="termsAccepted"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              I agree to the <a href="#" className="text-cyber-blue hover:underline">Terms of Service</a> and <a href="#" className="text-cyber-blue hover:underline">Privacy Policy</a>
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                    <div className="pt-4">
                      <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? (
                          <span className="flex items-center">
                            <span className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            Creating Account...
                          </span>
                        ) : (
                          "Create Account"
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </TabsContent>
          </Tabs>
        )}
      </Card>
    </div>
  );
}
