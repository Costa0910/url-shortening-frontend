import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { UrlTable } from "./UrlTable";

export default function Links() {
  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle>URL Management Dashboard</CardTitle>
          <CardDescription>
            Effortlessly manage your URLs. Edit, copy, or delete links
            associated with your account to keep everything organized and
            accessible
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UrlTable />
        </CardContent>
      </Card>
    </div>
  );
}
