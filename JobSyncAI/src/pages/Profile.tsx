import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { UserAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Profile() {
  const { user } = UserAuth();
  
  //Track the resume string, and a loading state for the button
  const [resumeText, setResumeText] = useState(""); 
  const [isSaving, setIsSaving] = useState(false);

  //Fetch EXACTLY one profile on load
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return; // Safety check

      const { data, error } = await supabase
        .from('profiles')
        .select('master_resume')
        .eq('user_id', user.id) 
        .single();              

      if (data?.master_resume) {
        setResumeText(data.master_resume);
      }
      if (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile(); 
  }, [user]); // Re-run if the user object changes

  // 3. YOUR MISSION: Write the update logic
  const handleSave = async () => {
    setIsSaving(true);
    
    // TODO: Write a supabase .update() call here to save the 'resumeText' state 
    // to the 'profiles' table where the user_id matches user.id
    
    setIsSaving(false);
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and AI context.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Base Resume Context</CardTitle>
          <CardDescription>
            Paste your master resume here. Our AI will use this context to automatically tailor job descriptions and generate cover letters for you.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Textarea 
            value={resumeText} 
            onChange={(e) => setResumeText(e.target.value)} 
            placeholder="Paste your resume text here..." 
            className="min-h-[400px] font-mono text-sm"
          />
        </CardContent>
        
        <CardFooter className="flex justify-end border-t pt-6 mt-2">
          {/* Use onClick, and disable it if it's currently saving */}
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Resume"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}