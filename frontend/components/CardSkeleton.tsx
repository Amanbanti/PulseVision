import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CardSkeleton() {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Skeleton className="h-4 w-24" /> {/* Simulating title */}
        <Skeleton className="h-4 w-4 rounded-full" /> {/* Icon */}
      </CardHeader>
      <CardContent>
        <Skeleton className="h-7 w-28 mb-2" /> {/* Main number */}
        <Skeleton className="h-3 w-32" /> {/* Subtext */}
      </CardContent>
    </Card>
  );
}


export function RecentScansSkeleton() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-5 w-32" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-64" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <Skeleton className="w-12 h-12 rounded-lg" />
                  <div>
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-3 w-40" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-4 w-8" />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </CardContent>
      </Card>
    );
  }



  export function ScanReportSkeleton() {
    return (
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4 font-medium">Patient</th>
                <th className="text-left p-4 font-medium">Scan Type</th>
                <th className="text-left p-4 font-medium">Date</th>
                <th className="text-left p-4 font-medium">Diagnosis</th>
                <th className="text-left p-4 font-medium">Confidence</th>
                <th className="text-left p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, index) => (
                <tr key={index} className="border-b hover:bg-muted/50">
                  <td className="p-4">
                    <div>
                      <Skeleton className="h-4 w-32 mb-2" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </td>
                  <td className="p-4">
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </td>
                  <td className="p-4">
                    <Skeleton className="h-4 w-24" />
                  </td>
                  <td className="p-4">
                    <Skeleton className="h-5 w-20 rounded-full" />
                  </td>
                  <td className="p-4">
                    <Skeleton className="h-4 w-12" />
                  </td>
                  <td className="p-4">
                    <Skeleton className="h-8 w-24 rounded-md" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    );
  }



  
  export function UserTableSkeleton() {
    return (
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4 font-medium">Name</th>
                <th className="text-left p-4 font-medium">Email</th>
                <th className="text-left p-4 font-medium">Role</th>
                <th className="text-left p-4 font-medium">Date Joined</th>
                <th className="text-left p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(8)].map((_, index) => (
                <tr key={index} className="border-b hover:bg-muted/50">
                  <td className="p-4">
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-3 w-20" />
                  </td>
                  <td className="p-4">
                    <Skeleton className="h-4 w-40" />
                  </td>
                  <td className="p-4">
                    <Skeleton className="h-4 w-24 rounded-full" />
                  </td>
                  <td className="p-4">
                    <Skeleton className="h-4 w-28" />
                  </td>
                  <td className="p-4">
                    <Skeleton className="h-8 w-24 rounded-md" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    );
  }



  