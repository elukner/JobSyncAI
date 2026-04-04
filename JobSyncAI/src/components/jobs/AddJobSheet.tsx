import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// 1. Define the schema
const jobSchema = z.object({
  company: z.string().min(1, { message: "Company name is required." }),
  title: z.string().min(1, { message: "Job title is required." }),
  url: z.string().url().optional().or(z.literal('')),
  description: z.string().optional(),
  status: z.enum(['Applied', 'Interviewing', 'Offer', 'Rejected']).default('Applied'),
});

// 2. Extract the type from the schema
type JobFormInput = z.input<typeof jobSchema>;
type JobFormOutput = z.output<typeof jobSchema>;


export function AddJobSheet() {


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobFormInput, any, JobFormOutput>({
    resolver: zodResolver(jobSchema),
  });

  const onSubmit = (data: JobFormOutput) => {
    console.log("Form Data:", data);
  };

  return (
    <Sheet>
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

              <Button type="submit" className="w-full">Save</Button>
            </form>
          </div>
        </div>

      </SheetContent>
    </Sheet>
  )
}
