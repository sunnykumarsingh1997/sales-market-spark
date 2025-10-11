import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Upload, Download, Trash2, FileSpreadsheet } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PowerBIFile {
  id: string;
  file_name: string;
  file_path: string;
  file_size: number | null;
  uploaded_at: string;
}

const PowerBIDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [files, setFiles] = useState<PowerBIFile[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchFiles();
    }
  }, [user]);

  const fetchFiles = async () => {
    const { data, error } = await supabase
      .from("powerbi_files")
      .select("*")
      .order("uploaded_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch files",
        variant: "destructive",
      });
    } else {
      setFiles(data || []);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".pbix")) {
      toast({
        title: "Invalid File",
        description: "Please upload a .pbix file",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      const filePath = `${user?.id}/${Date.now()}_${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("powerbi-files")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { error: dbError } = await supabase.from("powerbi_files").insert({
        user_id: user?.id,
        file_name: file.name,
        file_path: filePath,
        file_size: file.size,
      });

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "File uploaded successfully!",
      });

      fetchFiles();
    } catch (error: any) {
      toast({
        title: "Upload Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleDownload = async (filePath: string, fileName: string) => {
    try {
      const { data, error } = await supabase.storage
        .from("powerbi-files")
        .download(filePath);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error: any) {
      toast({
        title: "Download Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string, filePath: string) => {
    try {
      const { error: storageError } = await supabase.storage
        .from("powerbi-files")
        .remove([filePath]);

      if (storageError) throw storageError;

      const { error: dbError } = await supabase
        .from("powerbi_files")
        .delete()
        .eq("id", id);

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "File deleted successfully",
      });

      fetchFiles();
    } catch (error: any) {
      toast({
        title: "Delete Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return "Unknown";
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(2)} MB`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Power BI Marketing Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Upload and manage your Power BI (.pbix) files
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload Power BI File</CardTitle>
          <CardDescription>
            Upload your .pbix files to store and manage them securely
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="file-upload">Select .pbix File</Label>
              <Input
                id="file-upload"
                type="file"
                accept=".pbix"
                onChange={handleFileUpload}
                disabled={uploading}
              />
            </div>
            {uploading && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                Uploading...
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Your Power BI Files</h2>
        {files.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              <FileSpreadsheet className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No files uploaded yet. Upload your first .pbix file above.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {files.map((file) => (
              <Card key={file.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileSpreadsheet className="h-8 w-8 text-primary" />
                      <div>
                        <h3 className="font-medium">{file.file_name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {formatFileSize(file.file_size)} • Uploaded{" "}
                          {new Date(file.uploaded_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownload(file.file_path, file.file_name)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(file.id, file.file_path)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PowerBIDashboard;
