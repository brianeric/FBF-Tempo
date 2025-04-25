import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Car, Search, Plus } from "lucide-react";
import { useAuth } from "../../../supabase/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, Settings } from "lucide-react";

export function HomeHeader() {
  const { user, signOut } = useAuth();

  return (
    <header className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="font-bold text-xl flex items-center text-black"
          >
            <img
              src="/logo.png"
              alt="Fox Body Finder"
              className="h-8 w-auto mr-2"
            />
          </Link>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search Fox Body Mustangs..."
              className="w-full pl-10 pr-4 focus-visible:ring-black"
            />
          </div>
        </div>

        <nav className="flex items-center space-x-4">
          {/* Create Listing CTA */}
          <Link to="/create-listing">
            <Button className="bg-black text-white hover:bg-gray-800 hidden sm:flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              Create Listing
            </Button>
          </Link>

          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-black"
                >
                  Dashboard
                </Button>
              </Link>
              <Link to="/community">
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-black"
                >
                  Community Forum
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="gap-2 text-gray-700 hover:text-black"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                        alt={user.email || ""}
                      />
                      <AvatarFallback>
                        {user.email?.[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline-block">{user.email}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-white border-gray-200"
                >
                  <DropdownMenuLabel className="text-black">
                    My Account
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-200" />
                  <DropdownMenuItem className="text-gray-700 hover:text-black focus:text-black">
                    <Link
                      to="/manage-profile"
                      className="flex items-center w-full"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-gray-700 hover:text-black focus:text-black">
                    <Link to="/settings" className="flex items-center w-full">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-200" />
                  <DropdownMenuItem
                    onSelect={() => signOut()}
                    className="text-gray-700 hover:text-black focus:text-black"
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <>
              <Link to="/community">
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-black"
                >
                  Community Forum
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-black"
                >
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-black text-white hover:bg-gray-800">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
