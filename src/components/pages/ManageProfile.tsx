import { useState } from "react";
import { useAuth } from "../../../supabase/auth";
import { HomeHeader } from "../home/HomeHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function ManageProfile() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");

  // Mock user data - in a real app, this would come from your database
  const mockUserData = {
    name: "John Mustang",
    email: user?.email || "user@example.com",
    phone: "(555) 123-4567",
    location: "Austin, TX",
    memberSince: "March 2023",
    listingsCount: 5,
    reviewsCount: 12,
    rating: 4.8,
  };

  // Mock listings data
  const mockListings = [
    {
      id: 1,
      title: "1989 Ford Mustang GT 5.0",
      price: "$12,500",
      status: "active",
      views: 245,
      messages: 8,
      date: "May 10, 2023",
    },
    {
      id: 2,
      title: "1993 Ford Mustang LX Convertible",
      price: "$9,800",
      status: "active",
      views: 187,
      messages: 5,
      date: "May 5, 2023",
    },
    {
      id: 3,
      title: "1987 Ford Mustang GT - Project Car",
      price: "$4,500",
      status: "sold",
      views: 312,
      messages: 15,
      date: "April 22, 2023",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <HomeHeader />
      <main className="container pt-24 pb-16">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile Sidebar */}
          <div className="md:w-1/3">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${mockUserData.email}`}
                      alt={mockUserData.name}
                    />
                    <AvatarFallback>{mockUserData.name[0]}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold">{mockUserData.name}</h2>
                  <p className="text-gray-500">{mockUserData.location}</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Member since {mockUserData.memberSince}
                  </p>

                  <div className="flex gap-3 mt-4">
                    <div className="text-center">
                      <p className="font-bold">{mockUserData.listingsCount}</p>
                      <p className="text-xs text-gray-500">Listings</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold">{mockUserData.reviewsCount}</p>
                      <p className="text-xs text-gray-500">Reviews</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold">{mockUserData.rating}</p>
                      <p className="text-xs text-gray-500">Rating</p>
                    </div>
                  </div>

                  <Button className="mt-6 w-full">Edit Profile</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="md:w-2/3">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile">Profile Info</TabsTrigger>
                <TabsTrigger value="listings">My Listings</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Update your personal details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue={mockUserData.name} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" defaultValue={mockUserData.email} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" defaultValue={mockUserData.phone} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          defaultValue={mockUserData.location}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save Changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="listings" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>My Listings</CardTitle>
                    <CardDescription>
                      Manage your Fox Body listings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockListings.map((listing) => (
                        <div
                          key={listing.id}
                          className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{listing.title}</h3>
                              <Badge
                                variant={
                                  listing.status === "active"
                                    ? "outline"
                                    : "secondary"
                                }
                                className={
                                  listing.status === "active"
                                    ? "bg-green-50 text-green-700 border-green-200"
                                    : ""
                                }
                              >
                                {listing.status === "active"
                                  ? "Active"
                                  : "Sold"}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                              Listed on {listing.date} • {listing.views} views •{" "}
                              {listing.messages} messages
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">{listing.price}</p>
                            <Button variant="ghost" size="sm" className="mt-1">
                              Edit
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Create New Listing</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Reviews & Reputation</CardTitle>
                    <CardDescription>
                      See what others are saying about you
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="p-4 border rounded-lg">
                        <div className="flex justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-10 w-10">
                              <AvatarImage
                                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mike"
                                alt="Mike"
                              />
                              <AvatarFallback>M</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">Mike Johnson</p>
                              <p className="text-xs text-gray-500">
                                May 15, 2023
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg
                                key={star}
                                className={`w-4 h-4 ${star <= 5 ? "text-yellow-400" : "text-gray-300"}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                              </svg>
                            ))}
                          </div>
                        </div>
                        <p className="mt-3 text-gray-700">
                          Great seller! The Mustang was exactly as described.
                          Very honest and straightforward transaction. Would
                          definitely buy from again.
                        </p>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <div className="flex justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-10 w-10">
                              <AvatarImage
                                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                                alt="Sarah"
                              />
                              <AvatarFallback>S</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">Sarah Miller</p>
                              <p className="text-xs text-gray-500">
                                April 28, 2023
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg
                                key={star}
                                className={`w-4 h-4 ${star <= 4 ? "text-yellow-400" : "text-gray-300"}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                              </svg>
                            ))}
                          </div>
                        </div>
                        <p className="mt-3 text-gray-700">
                          John was responsive and helpful throughout the
                          process. The car had a few more issues than mentioned
                          in the listing, but he was fair about adjusting the
                          price.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
