import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { UserAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';

/**
 * Profile component for managing user account settings and AI context.
 * 
 * This component allows users to view and edit their master resume, which serves as
 * context for AI-powered features such as job description tailoring and cover letter generation.
 * 
 * @component
 * @returns {JSX.Element} A profile settings page with a resume editor and save functionality.
 * 
 * @example
 * return <Profile />
 * 
 * @remarks
 * - Fetches the user's master resume from the Supabase 'profiles' table on mount
 * - Requires user authentication via the UserAuth hook
 * - Displays success/error toast notifications on save operations
 * - Disables the save button while the resume is being saved
 */
export default function Profile() {
  const navigate = useNavigate();
  const { user } = UserAuth();



  const [resumeText, setResumeText] = useState("");
  const [isSaving, setIsSaving] = useState(false);


  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

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
  }, [user]);

const handleSave = async () => {
    if (!user) return;
    setIsSaving(true);

    const { error } = await supabase
      .from('profiles')
      .update({ master_resume: resumeText })
      .eq('user_id', user.id);

    if (error) {
      console.error("Error saving resume:", error);
      toast.error("Failed to save resume");
    } else {
      toast.success("Resume saved!");
      // Navigate home after a short delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    }

    setIsSaving(false);
  };

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

        <CardFooter className="flex justify-end gap-2 border-t pt-6 mt-2">
          <Button variant="outline" onClick={() => navigate(-1)} disabled={isSaving}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Resume"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}