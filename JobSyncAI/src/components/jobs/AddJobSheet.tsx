import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { UserAuth } from "@/contexts/AuthContext";

const jobSchema = z.object({
  company: z.string().min(1, { message: "Company name is required." }),
  title: z.string().min(1, { message: "Job title is required." }),
  url: z.string().url().optional().or(z.literal('')),
  description: z.string().optional(),
  status: z.enum(['Applied', 'Interviewing', 'Offer', 'Rejected']).default('Applied'),
});

type JobFormInput = z.input<typeof jobSchema>;
type JobFormOutput = z.output<typeof jobSchema>;


/**
 * AddJobSheet component for adding new jobs to the system.
 * 
 * This component renders a sheet modal that allows authenticated users to submit
 * a new job application with details such as company name, job title, application
 * status, job URL, and job description.
 * 
 * The form is validated using Zod schema and React Hook Form. On successful
 * submission, the job data is inserted into the Supabase 'jobs' table associated
 * with the current user.
 * 
 * @component
 * @returns {JSX.Element} A sheet component with a form for adding a new job.
 * 
 * @requires UserAuth - Hook to get the current authenticated user
 * @requires supabase - Supabase client instance for database operations
 * @requires useForm - React Hook Form hook for form management
 * @requires zodResolver - Zod schema resolver for form validation
 * @requires jobSchema - Zod schema for job form validation
 * 
 * @throws {Error} Throws an error if the Supabase insert operation fails
 */
export function AddJobSheet() {
  const { user } = UserAuth();
  const [open, setOpen] = useState(false);


  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<JobFormInput, any, JobFormOutput>({
    resolver: zodResolver(jobSchema),
  });


  const onSubmit = async (values: JobFormOutput) => {
    if (!user) {
      console.error("You must be logged in to save a job!");
      return;
    }

    try {
      const { data, error } = await supabase
        .from('jobs')
        .insert([
          {
            ...values,
            user_id: user.id
          }
        ])
        .select();

      if (error) throw error;

      console.log("Job saved successfully!", data);
      setOpen(false);
      reset();

    } catch (error) {
      console.error("Error saving job:", error);
    }
  };




  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="default">+ Add Job</Button>
      </SheetTrigger>

      <SheetContent className="sm:max-w-[500px]">
        <SheetHeader>
          <SheetTitle>Add a New Job</SheetTitle>
          <SheetDescription>
            Enter the details of the job you are applying for. Click save when you're done.
          </SheetDescription>
        </SheetHeader>

        <div className="py-6">
          <div className="text-sm text-muted-foreground border border-dashed p-4 rounded-md text-center">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">

              <div className="flex flex-col space-y-1">
                <label className="font-medium">Company</label>
                <input type="text" {...register("company")} className="border p-2 rounded-md" />
                {errors.company && <span className="text-red-500 text-xs">{errors.company.message}</span>}
              </div>

              <div className="flex flex-col space-y-1">
                <label className="font-medium">Job Title</label>
                <input type="text" {...register("title")} className="border p-2 rounded-md" />
                {errors.title && <span className="text-red-500 text-xs">{errors.title.message}</span>}
              </div>


              <div className="flex flex-col space-y-1">
                <label className="font-medium">Status</label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Applied">Applied</SelectItem>
                        <SelectItem value="Interviewing">Interviewing</SelectItem>
                        <SelectItem value="Offer">Offer</SelectItem>
                        <SelectItem value="Rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.status && (
                  <span className="text-red-500 text-xs">{errors.status.message}</span>
                )}
              </div>

              <div className="flex flex-col space-y-1">
                <label className="font-medium">URL</label>
                <input type="text" {...register("url")} className="border p-2 rounded-md" />
                {errors.url && <span className="text-red-500 text-xs">{errors.url.message}</span>}
              </div>

              <div className="flex flex-col space-y-1">
                <label className="font-medium">Description</label>
                <textarea
                  {...register("description")}
                  className="border p-2 rounded-md min-h-[200px] w-full resize-y"
                />
                {errors.description && <span className="text-red-500 text-xs">{errors.description.message}</span>}
              </div>

              <Button type="submit" className="w-full">Save</Button>
            </form>
          </div>
        </div>

      </SheetContent>
    </Sheet>
  )
}
