import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function Profile() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and AI context.</p>
      </div>

      {/* Resume Settings Card */}
      <Card>
        <CardHeader>
          <CardTitle>Base Resume Context</CardTitle>
          <CardDescription>
            Paste your master resume here. Our AI will use this context to automatically tailor job descriptions and generate cover letters for you.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Textarea 
            placeholder="Paste your resume text here..." 
            className="min-h-[400px] font-mono text-sm"
          />
        </CardContent>
        
        <CardFooter className="flex justify-end border-t pt-6 mt-2">
          <Button>Save Resume</Button>
        </CardFooter>
      </Card>
    </div>
  )
}