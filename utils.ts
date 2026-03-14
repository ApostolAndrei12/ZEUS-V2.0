import { useAuth } from "@/_core/hooks/useAuth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getLoginUrl } from "@/const";
import { LayoutDashboard, LogOut, Package, Wrench, ShieldCheck, Headset } from "lucide-react";
import { useLocation } from "wouter";
import { DashboardLayoutSkeleton } from './DashboardLayoutSkeleton';
import { Button } from "./ui/button";

const menuItems = [
  { icon: LayoutDashboard, label: "Acasă", path: "/" },
  { icon: Package, label: "STOC REAL", path: "/stoc-real" },
  { icon: Wrench, label: "SERVICII", path: "/servicii" },
  { icon: ShieldCheck, label: "INCHISE", path: "/inchise" },
  { icon: Headset, label: "SERVICE", path: "/service" },
];

// Pages that use the full-screen Excel layout (no padding, full height)
const EXCEL_PAGES = ["/stoc-real", "/servicii", "/inchise", "/service"];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading, user } = useAuth();

  if (loading) {
    return <DashboardLayoutSkeleton />;
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-8 p-8 max-w-md w-full">
          <div className="flex flex-col items-center gap-6">
            <h1 className="text-2xl font-semibold tracking-tight text-center">
              Sign in to continue
            </h1>
            <p className="text-sm text-muted-foreground text-center max-w-sm">
              Access to this dashboard requires authentication. Continue to launch the login flow.
            </p>
          </div>
          <Button
            onClick={() => {
              window.location.href = getLoginUrl();
            }}
            size="lg"
            className="w-full shadow-lg hover:shadow-xl transition-all"
          >
            Sign in
          </Button>
        </div>
      </div>
    );
  }

  return <DashboardLayoutContent>{children}</DashboardLayoutContent>;
}

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const [location, setLocation] = useLocation();

  const isExcelPage = EXCEL_PAGES.includes(location);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* ── Top Navigation Bar ── */}
      <header className="h-12 flex items-center justify-between bg-[#005C4B] px-4 shrink-0 z-50 shadow-md">
        {/* Left: Logo + Nav items */}
        <div className="flex items-center gap-1">
          {/* Brand */}
          <span
            className="font-bold text-white tracking-tight mr-4 text-sm"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            ZEUS v2.0
          </span>

          {/* Nav links */}
          {menuItems.map((item) => {
            const isActive = location === item.path;
            return (
              <button
                key={item.path}
                onClick={() => setLocation(item.path)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-150
                  ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                <item.icon className="w-3.5 h-3.5 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right: User avatar + logout */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50">
              <Avatar className="h-7 w-7 border border-white/30 shrink-0">
                <AvatarFallback className="text-xs font-medium bg-white/20 text-white">
                  {user?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-white/80 hidden sm:block max-w-[120px] truncate">
                {user?.name || user?.email || "-"}
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem
              onClick={logout}
              className="cursor-pointer text-destructive focus:text-destructive"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      {/* ── Page Content ── */}
      {isExcelPage ? (
        // Full-screen Excel layout: no padding, fills remaining height
        <main className="flex-1 overflow-hidden flex flex-col min-h-0">
          {children}
        </main>
      ) : (
        // Normal layout with padding for Home and other pages
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      )}
    </div>
  );
}
