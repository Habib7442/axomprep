"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createClient } from "@/lib/supabase/browser-client";
import { Sparkles, GraduationCap, ScrollText } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

// Define the form schema with Zod
const formSchema = z.object({
  first_name: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  last_name: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  class: z.string({
    required_error: "Please select a class.",
  }),
  address: z.string().min(10, {
    message: "Address must be at least 10 characters.",
  }),
  parent_name: z.string().min(2, {
    message: "Parent name must be at least 2 characters.",
  }),
  additional_info: z.string().optional(),
});

export default function EnrollmentPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize the form with react-hook-form and zod validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      class: "",
      address: "",
      parent_name: "",
      additional_info: "",
    },
  });

  // Handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    try {
      const supabase = createClient();

      // Insert the enrollment data into Supabase
      const { error } = await supabase.from("axomprep_enrollments").insert([
        {
          first_name: values.first_name,
          last_name: values.last_name,
          email: values.email,
          phone: values.phone,
          class: values.class,
          address: values.address,
          parent_name: values.parent_name,
          additional_info: values.additional_info || "",
          status: "pending", // Default status for new enrollments
        },
      ]);

      if (error) {
        throw error;
      }

      // Show success message
      toast("Your enrollment has been received. We'll contact you shortly.");

      // Reset the form
      form.reset();
    } catch (error) {
      console.error("Error submitting enrollment:", error);

      const errorMessage =
        error instanceof Error
          ? error.message
          : "There was an error submitting your enrollment. Please try again.";

      toast("Enrollment Failed");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#1a2639] bg-[url('/images/parchment-texture.jpg')] bg-blend-overlay bg-opacity-10 py-12">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto bg-[#1a2639]/80 border-2 border-amber-600 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/parchment-texture.jpg')] opacity-10 pointer-events-none"></div>

          <CardHeader className="relative z-10 border-b border-amber-600/30">
            <div className="flex items-center mb-2">
              <ScrollText className="h-6 w-6 text-amber-400 mr-3" />
              <CardTitle className="text-3xl font-serif text-amber-400">
                AxomPrep Enrollment Form
              </CardTitle>
            </div>
            <CardDescription className="text-amber-200 font-serif">
              Begin your educational journey with AxomPrep Coaching Center. Fill
              out the form below to secure your place.
            </CardDescription>
          </CardHeader>

          <CardContent className="relative z-10 pt-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-amber-300 font-serif">
                          First Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your first name"
                            {...field}
                            className="bg-amber-900/20 border-amber-600 text-amber-100 placeholder:text-amber-400/50"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="last_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-amber-300 font-serif">
                          Last Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your last name"
                            {...field}
                            className="bg-amber-900/20 border-amber-600 text-amber-100 placeholder:text-amber-400/50"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-amber-300 font-serif">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your.email@example.com"
                            {...field}
                            className="bg-amber-900/20 border-amber-600 text-amber-100 placeholder:text-amber-400/50"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-amber-300 font-serif">
                          Phone Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your phone number"
                            {...field}
                            className="bg-amber-900/20 border-amber-600 text-amber-100 placeholder:text-amber-400/50"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="class"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-amber-300 font-serif">
                        Class
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-amber-900/20 border-amber-600 text-amber-100">
                            <SelectValue placeholder="Select your class" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-[#1a2639] border-amber-600">
                          <SelectItem
                            value="8"
                            className="text-amber-200 focus:bg-amber-900/40 focus:text-amber-100"
                          >
                            Class 8
                          </SelectItem>
                          <SelectItem
                            value="9"
                            className="text-amber-200 focus:bg-amber-900/40 focus:text-amber-100"
                          >
                            Class 9
                          </SelectItem>
                          <SelectItem
                            value="10"
                            className="text-amber-200 focus:bg-amber-900/40 focus:text-amber-100"
                          >
                            Class 10
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="parent_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-amber-300 font-serif">
                        Parent/Guardian Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter parent or guardian name"
                          {...field}
                          className="bg-amber-900/20 border-amber-600 text-amber-100 placeholder:text-amber-400/50"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-amber-300 font-serif">
                        Address
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter your full address"
                          {...field}
                          className="bg-amber-900/20 border-amber-600 text-amber-100 placeholder:text-amber-400/50 min-h-[80px]"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="additional_info"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-amber-300 font-serif">
                        Additional Information (Optional)
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Any additional information you'd like to share"
                          {...field}
                          className="bg-amber-900/20 border-amber-600 text-amber-100 placeholder:text-amber-400/50 min-h-[100px]"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white border-2 border-amber-800 font-serif text-lg py-6"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <Sparkles className="animate-pulse mr-2 h-5 w-5" />
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <GraduationCap className="mr-2 h-5 w-5" />
                      <span>Submit Enrollment</span>
                    </div>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>

          <CardFooter className="relative z-10 border-t border-amber-600/30 pt-4 text-amber-200 text-sm italic font-serif">
            &ldquo;Education is the passport to the future, for tomorrow belongs
            to those who prepare for it today.&rdquo;
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
