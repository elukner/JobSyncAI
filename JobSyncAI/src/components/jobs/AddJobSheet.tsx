import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function AddJobSheet() {
  return (
    <Sheet>
      {/* The Button that opens the panel */}
      <SheetTrigger asChild>
        <Button variant="default">+ Add Job</Button>
      </SheetTrigger>

      {/* The Panel itself */}
      <SheetContent className="sm:max-w-[500px]">
        <SheetHeader>
          <SheetTitle>Add a New Job</SheetTitle>
          <SheetDescription>
            Enter the details of the job you are applying for. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        
        {/* We will build the React Hook Form inside this div next! */}
        <div className="py-6">
          <p className="text-sm text-muted-foreground border border-dashed p-4 rounded-md text-center">
            [ Form Inputs Will Go Here ]
          </p>
        </div>

      </SheetContent>
    </Sheet>
  )
}