import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { UploadCloud } from "lucide-react";

export function UploadForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>App Details</CardTitle>
        <CardDescription>Fill out the form below to submit your application.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">App Title</Label>
            <Input id="title" placeholder="e.g. My Awesome App" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="version">Version</Label>
            <Input id="version" placeholder="e.g. 1.0.0" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="A brief and engaging description of your app." rows={5} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="apk">APK File</Label>
            <Input id="apk" type="file" accept=".apk" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="icon">App Icon</Label>
            <Input id="icon" type="file" accept="image/*" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="screenshots">Screenshots</Label>
            <Input id="screenshots" type="file" accept="image/*" multiple />
          </div>
          <div className="flex justify-end">
            <Button type="submit">
              <UploadCloud className="mr-2 h-4 w-4" />
              Submit App
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
