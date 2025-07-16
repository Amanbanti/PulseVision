import ProtectedRoute from "@/components/ProtectedRoute";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Protection is applied only to this group of routes
  return <ProtectedRoute>{children}</ProtectedRoute>;
}