"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { createCompanion } from "@/lib/actions/companion.actions";
import { redirect } from "next/navigation";
import { useState } from "react";

type FormValues = {
  name: string;
  subject: string;
  topic: string;
  voice: string;
  style: string;
  duration: number;
};

const formSchema = z.object({
  name: z.string().min(1, { message: "AI Tutor name is required" }),
  subject: z.string().min(1, { message: "Subject is required" }).max(50, { message: "Subject must be less than 50 characters" }),
  topic: z.string().min(1, { message: "Topic is required" }),
  voice: z.string().min(1, { message: "Voice is required" }),
  style: z.string().min(1, { message: "Style is required" }),
  duration: z.number().min(1, { message: "Duration is required" }).max(120, { message: "Duration must be less than 120 minutes" }),
});

const CompanionForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      subject: "",
      topic: "",
      voice: "male",
      style: "casual",
      duration: 15,
    },
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      // Convert duration to number to ensure type consistency
      const formData = {
        ...values,
        duration: Number(values.duration)
      };
      
      // console.log("Attempting to create companion with data:", formData);
      const result = await createCompanion(formData);
      // console.log("Companion creation result:", result);
      
      // Check if there was an error
      if ('error' in result) {
        if (result.error === "limit_reached") {
          // Redirect to limit reached page
          window.location.href = "/limit-reached";
          return;
        } else if (result.error === "permission_error") {
          // Redirect to limit reached page for permission errors
          window.location.href = "/limit-reached";
          return;
        } else {
          // Show error message for other errors
          console.error("Error creating companion:", result.error);
          setIsSubmitting(false);
          alert("Failed to create AI Tutor. Please try again.");
          return;
        }
      }
      
      // If successful, redirect to the new companion page
      if (result.success && result.companion) {
        window.location.href = `/companions/${result.companion.id}`;
      } else {
        console.log("Failed to create an AI Tutor - no companion returned");
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Unexpected error creating companion:", error);
      // Log more detailed error information
      if (error instanceof Error) {
        console.error("Error name:", error.name);
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
      }
      // Reset submitting state on error so user can try again
      setIsSubmitting(false);
      // Optionally show an error message to the user
      alert("Failed to create AI Tutor. Please try again.");
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full gap-4 flex flex-col"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>AI Tutor Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the AI Tutor name"
                  {...field}
                  className="input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the subject (e.g., Maths, Science, History)"
                  {...field}
                  className="input capitalize"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What should the AI Tutor help with</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Ex. Percentage, Discount"
                  {...field}
                  className="input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="voice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Voice</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="input">
                    <SelectValue placeholder="Select the voice" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="style"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Style</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="input">
                    <SelectValue placeholder="Select the style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="formal">Formal</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estimated Session duration in minutes</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="15"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className="input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Building Your AI Tutor...
            </>
          ) : (
            "Build Your AI Tutor"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default CompanionForm;