import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Trash2 } from "lucide-react";

interface UserGuide {
  id: string;
  title: string;
  content: string;
  category: string | null;
  created_at: string;
}

const UserGuides = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [guides, setGuides] = useState<UserGuide[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
  });

  useEffect(() => {
    if (user) {
      fetchGuides();
    }
  }, [user]);

  const fetchGuides = async () => {
    const { data, error } = await supabase
      .from("user_guides")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch guides",
        variant: "destructive",
      });
    } else {
      setGuides(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("user_guides").insert({
      user_id: user?.id,
      title: formData.title,
      content: formData.content,
      category: formData.category || null,
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Guide added successfully!",
      });
      setFormData({ title: "", content: "", category: "" });
      fetchGuides();
    }

    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("user_guides").delete().eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete guide",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Guide deleted successfully",
      });
      fetchGuides();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">User Guides</h1>
        <p className="text-muted-foreground mt-2">
          Create and manage your user guides and documentation
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add New Guide</CardTitle>
          <CardDescription>Create a new user guide or documentation entry</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter guide title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category (Optional)</Label>
              <Input
                id="category"
                placeholder="e.g., Getting Started, Advanced"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Enter guide content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={8}
                required
              />
            </div>

            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Guide"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Your Guides</h2>
        {guides.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No guides yet. Create your first guide above.
            </CardContent>
          </Card>
        ) : (
          guides.map((guide) => (
            <Card key={guide.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{guide.title}</CardTitle>
                    {guide.category && (
                      <CardDescription className="mt-1">
                        Category: {guide.category}
                      </CardDescription>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(guide.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{guide.content}</p>
                <p className="text-sm text-muted-foreground mt-4">
                  Created: {new Date(guide.created_at).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default UserGuides;
