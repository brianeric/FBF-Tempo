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
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle } from "lucide-react";

export default function ManageSubscription() {
  const { user } = useAuth();

  // Mock subscription data - in a real app, this would come from your database
  const mockSubscription = {
    type: "Garage Pass",
    price: "$65/month",
    activeListings: 12,
    maxListings: 25,
    nextBillingDate: "June 15, 2023",
    status: "active",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HomeHeader />
      <main className="container pt-24 pb-16">
        <h1 className="text-3xl font-bold mb-8">Manage Subscription</h1>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Current Plan</CardTitle>
                    <CardDescription>
                      Manage your subscription details
                    </CardDescription>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200 flex items-center"
                  >
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Active
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                    <span className="text-gray-500">Plan</span>
                    <span className="font-medium">{mockSubscription.type}</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                    <span className="text-gray-500">Price</span>
                    <span className="font-medium">
                      {mockSubscription.price}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                    <span className="text-gray-500">Active Listings</span>
                    <span className="font-medium">
                      {mockSubscription.activeListings} /{" "}
                      {mockSubscription.maxListings}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                    <span className="text-gray-500">Next Billing Date</span>
                    <span className="font-medium">
                      {mockSubscription.nextBillingDate}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel Subscription</Button>
                <Button>Upgrade Plan</Button>
              </CardFooter>
            </Card>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
                <CardDescription>View your past payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                    <div>
                      <p className="font-medium">May 15, 2023</p>
                      <p className="text-sm text-gray-500">
                        Garage Pass - Monthly
                      </p>
                    </div>
                    <span className="font-medium">$65.00</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                    <div>
                      <p className="font-medium">April 15, 2023</p>
                      <p className="text-sm text-gray-500">
                        Garage Pass - Monthly
                      </p>
                    </div>
                    <span className="font-medium">$65.00</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                    <div>
                      <p className="font-medium">March 15, 2023</p>
                      <p className="text-sm text-gray-500">
                        Garage Pass - Monthly
                      </p>
                    </div>
                    <span className="font-medium">$65.00</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
                <CardDescription>Contact our support team</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-4">
                  If you have any questions about your subscription or billing,
                  our support team is here to help.
                </p>
                <Button variant="outline" className="w-full">
                  Contact Support
                </Button>
              </CardContent>
            </Card>

            <Card className="mt-8">
              <CardHeader>
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div>
                    <CardTitle>Cancellation Policy</CardTitle>
                    <CardDescription>Important information</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  You can cancel your subscription at any time. Your
                  subscription will remain active until the end of your current
                  billing period. No refunds are provided for partial months.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
