import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Info } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Validation schema
const passwordSchema = z
    .object({
        currentPassword: z.string().min(6, "Current password is required"),
        newPassword: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string().min(6, "Please confirm your new password"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

type PasswordFormValues = z.infer<typeof passwordSchema>;

const SecuritySettings = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    // Initialize form with default values
    const form = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    // Handle form submission
    const onSubmit = async (data: PasswordFormValues) => {
        setIsLoading(true);
        try {
            // In a real app, you would send this data to the server
            console.log("Password data to update:", data);

            // For demo purposes, just show a success message
            // In a real app, this would be an API call
            setTimeout(() => {
                toast({
                    title: "Password updated",
                    description: "Your password has been updated successfully.",
                });

                // Reset the form
                form.reset({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                });
            }, 1000);
        } catch (error) {
            console.error("Error updating password:", error);
            toast({
                title: "Update failed",
                description: "There was an error updating your password. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Password Security</AlertTitle>
                <AlertDescription>
                    Use a strong password that you don't use on other websites.
                    A strong password is at least 8 characters, includes numbers and special characters.
                </AlertDescription>
            </Alert>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="currentPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Current Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="••••••••" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="••••••••" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm New Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="••••••••" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isLoading} className="mt-4">
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Change Password
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default SecuritySettings; 