import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Settings,
  User,
  CheckCircle2,
  ArrowRight,
  Star,
  ChevronRight,
  Github,
  Loader2,
  Twitter,
  Instagram,
  X,
  Car,
  Search,
  FileText,
  MessageSquare,
  Shield,
  Zap,
} from "lucide-react";
import { HomeHeader } from "@/components/home/HomeHeader";
import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { Link } from "react-router-dom";
import { useAuth } from "../../../supabase/auth";
import { useEffect, useState } from "react";
import { supabase } from "../../../supabase/supabase";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

// Define the Plan type
interface Plan {
  id: string;
  object: string;
  active: boolean;
  amount: number;
  currency: string;
  interval: string;
  interval_count: number;
  product: string;
  created: number;
  livemode: boolean;
  [key: string]: any;
}

// Testimonial interface
interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

// Feature interface
interface Feature {
  title: string;
  description: string;
  icon: JSX.Element;
}

// Import the Vehicle interface from VehicleCard component
import VehicleCard, { Vehicle } from "@/components/home/VehicleCard";

export default function LandingPage() {
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const [plans, setPlans] = useState<Plan[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [processingPlanId, setProcessingPlanId] = useState<string | null>(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      // Use the Supabase client to call the Edge Function
      const { data, error } = await supabase.functions.invoke(
        "supabase-functions-get-plans",
      );

      if (error) {
        throw error;
      }

      setPlans(data || []);
      setError("");
    } catch (error) {
      console.error("Failed to fetch plans:", error);
      setError("Failed to load plans. Please try again later.");
    }
  };

  // Handle checkout process
  const handleCheckout = async (priceId: string) => {
    if (!user) {
      // Redirect to login if user is not authenticated
      toast({
        title: "Authentication required",
        description: "Please sign in to subscribe to a plan.",
        variant: "default",
      });
      window.location.href = "/login?redirect=pricing";
      return;
    }

    setIsLoading(true);
    setProcessingPlanId(priceId);
    setError("");

    try {
      const { data, error } = await supabase.functions.invoke(
        "supabase-functions-create-checkout",
        {
          body: {
            price_id: priceId,
            user_id: user.id,
            return_url: `${window.location.origin}/dashboard`,
          },
          headers: {
            "X-Customer-Email": user.email || "",
          },
        },
      );

      if (error) {
        throw error;
      }

      // Redirect to Stripe checkout
      if (data?.url) {
        toast({
          title: "Redirecting to checkout",
          description:
            "You'll be redirected to Stripe to complete your purchase.",
          variant: "default",
        });
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      setError("Failed to create checkout session. Please try again.");
      toast({
        title: "Checkout failed",
        description:
          "There was an error creating your checkout session. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setProcessingPlanId(null);
    }
  };

  // Format currency
  const formatCurrency = (amount: number, currency: string) => {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
      minimumFractionDigits: 2,
    });

    return formatter.format(amount / 100);
  };

  // Sample features data
  const features: Feature[] = [
    {
      title: "Featured Listings",
      description:
        "Browse premium Fox Body Mustangs with high-quality images and detailed specifications. Our Burnout Boost featured listings get maximum visibility.",
      icon: <Star className="h-10 w-10 text-black" />,
    },
    {
      title: "Fox-Specific Search",
      description:
        "Find your perfect Fox Body with specialized filters for year range, model, body style, engine types, transmission, and more - all tailored for Fox enthusiasts.",
      icon: <Search className="h-10 w-10 text-black" />,
    },
    {
      title: "Parts & Services",
      description:
        "Browse and list Fox Body parts, restoration services, shipping options, and inspection services from trusted community members.",
      icon: <FileText className="h-10 w-10 text-black" />,
    },
    {
      title: "Community Forum",
      description:
        "Connect with fellow Fox Body enthusiasts through our dedicated discussion forum. Share insights, advice, and experiences with the community.",
      icon: <MessageSquare className="h-10 w-10 text-black" />,
    },
    {
      title: "Verified Sellers",
      description:
        "Our reputation system helps you identify trusted sellers with transaction history, ratings, and reviews from other community members.",
      icon: <Shield className="h-10 w-10 text-black" />,
    },
    {
      title: "Mobile Experience",
      description:
        "Access Fox Body Finder on any device with our fully responsive design and optional dark mode for comfortable browsing day or night.",
      icon: <Zap className="h-10 w-10 text-black" />,
    },
  ];

  // Sample featured vehicles
  const featuredVehicles: Vehicle[] = [
    {
      id: 1,
      year: 1989,
      model: "Mustang GT",
      trim: "5.0",
      price: 24500,
      mileage: 62000,
      location: "Phoenix, AZ",
      image:
        "https://images.unsplash.com/photo-1600382684817-99a56a50c8f6?q=80&w=800&auto=format&fit=crop",
      featured: true,
      condition: "Excellent",
      sellerName: "ClassicMustangGuy",
      sellerRating: 4.9,
      description:
        "Fully restored 1989 Mustang GT Hatchback with original 5.0L V8 and T5 manual transmission. New paint, interior, and suspension. Documented history since new.",
    },
    {
      id: 2,
      year: 1993,
      model: "Mustang Cobra",
      trim: "SVT",
      price: 38900,
      mileage: 45000,
      location: "Dallas, TX",
      image:
        "https://images.unsplash.com/photo-1567808291548-fc3ee04dbcf0?w=800&q=80",
      featured: true,
      condition: "Mint",
      sellerName: "CobraCollector",
      sellerRating: 5.0,
      description:
        "Rare 1993 SVT Cobra in Teal. One of only 4,993 produced. Hatchback body style with 5.0L V8 and Tremec transmission. All original with complete documentation and service records.",
    },
    {
      id: 3,
      year: 1987,
      model: "Mustang LX",
      trim: "5.0 Notchback",
      price: 19500,
      mileage: 78000,
      location: "Atlanta, GA",
      image:
        "https://images.unsplash.com/photo-1494905998402-395d579af36f?w=800&q=80",
      featured: true,
      condition: "Very Good",
      sellerName: "FoxBodyFan",
      sellerRating: 4.7,
      description:
        "Clean LX notchback coupe with 5.0L V8 and AOD automatic transmission. Upgraded suspension, Flowmaster exhaust, and cold A/C. Original paint with minimal wear.",
    },
    {
      id: 4,
      year: 1984,
      model: "Mustang SVO",
      trim: "Turbo",
      price: 17900,
      mileage: 103000,
      location: "Portland, OR",
      image:
        "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
      featured: true,
      condition: "Good",
      sellerName: "TurboTim",
      sellerRating: 4.5,
      description:
        "Rare 1984 Mustang SVO with 2.3L Turbocharged engine and T5 manual transmission. Hatchback body style with factory Recaro seats. Recent turbo rebuild and new clutch.",
    },
  ];

  // Sample testimonials data
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Mike Johnson",
      role: "Collector",
      company: "Mustang Enthusiast",
      content:
        "This marketplace helped me find my dream '88 GT with all the right specs. The detailed photos and maintenance records gave me confidence in my purchase.",
      avatar: "mike",
    },
    {
      id: 2,
      name: "David Chen",
      role: "Restorer",
      company: "Classic Restorations",
      content:
        "As someone who buys and sells Fox Body Mustangs regularly, this platform has been a game-changer. The specialized filters save me hours of searching.",
      avatar: "david",
    },
    {
      id: 3,
      name: "Amanda Patel",
      role: "Enthusiast",
      company: "Mustang Club of America",
      content:
        "I sold my '93 Cobra in just two weeks! The detailed listing options let me showcase all the work I'd put into the car over the years.",
      avatar: "amanda",
    },
  ];

  // Plan features
  const getPlanFeatures = (planType: string) => {
    const starterStallionFeatures = [
      "Browse all listings",
      "Basic search filters",
      "Contact sellers",
      "Community forum access",
      "For vehicles priced $1-$9,999",
    ];

    const streetScreamerFeatures = [
      ...starterStallionFeatures,
      "Featured listings",
      "Advanced search filters",
      "Saved searches",
      "Listing alerts",
      "For vehicles priced $10,000-$19,999",
    ];

    const trackKingFeatures = [
      ...streetScreamerFeatures,
      "Premium placement",
      "Detailed analytics",
      "Verified seller badge",
      "For vehicles priced $20,000+",
    ];

    const garagePassFeatures = [
      ...trackKingFeatures,
      "Up to 25 active listings",
      "Bulk listing management",
      "Priority customer support",
      "Monthly subscription",
    ];

    if (planType.includes("STREET")) return streetScreamerFeatures;
    if (planType.includes("TRACK")) return trackKingFeatures;
    if (planType.includes("GARAGE")) return garagePassFeatures;
    return starterStallionFeatures;
  };

  // formatVehiclePrice is now imported from VehicleCard component

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      {/* Header */}
      <HomeHeader />

      <main>
        {/* Hero Section */}
        <Hero />

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-gray-200 text-gray-800 hover:bg-gray-300 border-none">
                Features
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-black">
                The Ultimate Fox Body Experience
              </h2>
              <p className="text-gray-600 max-w-[700px] mx-auto">
                Our specialized marketplace is built by enthusiasts, for
                enthusiasts, with features designed specifically for Fox Body
                Mustang buyers and sellers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="border-gray-200 bg-gradient-to-b from-white to-gray-50 shadow-md hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="mb-4">{feature.icon}</div>
                    <CardTitle className="text-black">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Listings Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-gray-200 text-gray-800 hover:bg-gray-300 border-none">
                Featured Listings
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-black">
                Premium Fox Body Mustangs
              </h2>
              <p className="text-gray-600 max-w-[700px] mx-auto">
                Browse our selection of hand-picked Fox Body Mustangs. Each
                listing includes detailed specifications, high-quality images,
                and complete vehicle history.
              </p>
            </div>

            {error && (
              <div
                className="bg-red-100 border border-red-200 text-red-800 px-4 py-3 rounded relative mb-6"
                role="alert"
              >
                <span className="block sm:inline">{error}</span>
                <button
                  className="absolute top-0 bottom-0 right-0 px-4 py-3"
                  onClick={() => setError("")}
                >
                  <span className="sr-only">Dismiss</span>
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
            <div className="mt-10 text-center">
              <Button
                variant="outline"
                size="lg"
                className="border-gray-300 text-gray-700 hover:border-gray-500 hover:text-black"
              >
                View All Listings
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-gray-200 text-gray-800 hover:bg-gray-300 border-none">
                Advanced Search
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-black">
                Find Your Perfect Fox Body
              </h2>
              <p className="text-gray-600 max-w-[700px] mx-auto">
                Use our specialized search tools to filter by year, model,
                condition, price, modifications, and location.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Year Range
                  </label>
                  <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black">
                    <option>All Years (1979-1993)</option>
                    <option>1979-1982 (Early Fox)</option>
                    <option>1983-1986 (Mid Fox)</option>
                    <option>1987-1990 (Aero Fox)</option>
                    <option>1991-1993 (Late Fox)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Model
                  </label>
                  <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black">
                    <option>All Models</option>
                    <option>GT</option>
                    <option>LX</option>
                    <option>Cobra</option>
                    <option>SVO</option>
                    <option>SSP (Special Service Package)</option>
                    <option>Saleen</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Body Style
                  </label>
                  <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black">
                    <option>All Body Styles</option>
                    <option>Hatchback</option>
                    <option>Coupe (Notchback)</option>
                    <option>Convertible</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Engine Type
                  </label>
                  <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black">
                    <option>All Engine Types</option>
                    <option>5.0L V8</option>
                    <option>2.3L Turbo</option>
                    <option>3.8L V6</option>
                    <option>2.3L N/A</option>
                    <option>Custom Swap</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Transmission
                  </label>
                  <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black">
                    <option>All Transmissions</option>
                    <option>Manual</option>
                    <option>Automatic</option>
                    <option>T5</option>
                    <option>AOD</option>
                    <option>Tremec</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price Range
                  </label>
                  <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black">
                    <option>Any Price</option>
                    <option>Under $10,000</option>
                    <option>$10,000 - $20,000</option>
                    <option>$20,000 - $30,000</option>
                    <option>$30,000 - $50,000</option>
                    <option>$50,000+</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Condition
                  </label>
                  <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black">
                    <option>Any Condition</option>
                    <option>Project</option>
                    <option>Good</option>
                    <option>Very Good</option>
                    <option>Excellent</option>
                    <option>Mint</option>
                    <option>Concours</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mileage
                  </label>
                  <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black">
                    <option>Any Mileage</option>
                    <option>Under 25,000</option>
                    <option>Under 50,000</option>
                    <option>Under 75,000</option>
                    <option>Under 100,000</option>
                    <option>Over 100,000</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black">
                    <option>Nationwide</option>
                    <option>Within 50 miles</option>
                    <option>Within 100 miles</option>
                    <option>Within 250 miles</option>
                    <option>Within 500 miles</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-center">
                <Button className="bg-black text-white hover:bg-gray-800 px-8">
                  <Search className="mr-2 h-4 w-4" />
                  Find Mustangs
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Membership Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-gray-200 text-gray-800 hover:bg-gray-300 border-none">
                Membership
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-black">
                Choose Your Fox Pack
              </h2>
              <p className="text-gray-600 max-w-[700px] mx-auto">
                Choose the perfect membership level for your needs. All plans
                include access to our core marketplace features.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {plans.map((plan) => (
                <Card
                  key={plan.id}
                  className="flex flex-col h-full border-gray-200 bg-gradient-to-b from-white to-gray-50 shadow-lg hover:shadow-xl transition-all"
                >
                  <CardHeader className="pb-4">
                    <CardDescription className="text-sm text-gray-600">
                      {plan.interval_count === 1
                        ? "Monthly"
                        : `Every ${plan.interval_count} ${plan.interval}s`}
                    </CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-black">
                        {formatCurrency(plan.amount, plan.currency)}
                      </span>
                      <span className="text-gray-600">/{plan.interval}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <Separator className="my-4 bg-gray-200" />
                    <ul className="space-y-3">
                      {getPlanFeatures(plan.product).map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-start text-gray-700"
                        >
                          <CheckCircle2 className="h-5 w-5 text-black mr-2 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-black text-white hover:bg-gray-800"
                      onClick={() => handleCheckout(plan.id)}
                      disabled={isLoading}
                    >
                      {isLoading && processingPlanId === plan.id ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Join Now
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-gray-200 text-gray-800 hover:bg-gray-300 border-none">
                Testimonials
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-black">
                Trusted by Enthusiasts
              </h2>
              <p className="text-gray-600 max-w-[700px] mx-auto">
                See what our community members have to say about their Fox Body
                Finder experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <Card
                  key={testimonial.id}
                  className="border-gray-200 bg-gradient-to-b from-white to-gray-50 shadow-md"
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${testimonial.avatar}`}
                          alt={testimonial.name}
                        />
                        <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base text-black">
                          {testimonial.name}
                        </CardTitle>
                        <CardDescription className="text-gray-600">
                          {testimonial.role} at {testimonial.company}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-black text-black"
                        />
                      ))}
                    </div>
                    <p className="text-gray-600">{testimonial.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 mx-auto">
            <div className="bg-gradient-to-r from-gray-100 to-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-200">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">
                  Ready to Find Your Dream Fox Body?
                </h2>
                <p className="text-lg md:text-xl mb-8 text-gray-600">
                  Join thousands of enthusiasts who are buying, selling, and
                  connecting through the Fox Body Finder.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link to="/signup">
                    <Button
                      size="lg"
                      className="bg-black text-white hover:bg-gray-800 w-full sm:w-auto"
                    >
                      Create Account
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-gray-300 text-gray-700 hover:border-gray-500 hover:text-black w-full sm:w-auto"
                  >
                    Sell Your Mustang
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link
                to="/"
                className="font-bold text-xl flex items-center mb-4 text-black"
              >
                <img
                  src="/logo.png"
                  alt="Fox Body Finder Logo"
                  className="h-7 w-auto mr-2"
                />
                Fox Body Finder
              </Link>
              <p className="text-gray-600 mb-4">
                The premier destination for buying and selling Fox Body Mustangs
                (1979-1993).
              </p>
              <div className="flex space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-gray-600 hover:text-black"
                >
                  <Github className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-gray-600 hover:text-black"
                >
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-gray-600 hover:text-black"
                >
                  <Instagram className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-lg mb-4 text-black">
                Marketplace
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link to="#" className="text-gray-600 hover:text-black">
                    Browse Listings
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-600 hover:text-black">
                    Sell Your Mustang
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-600 hover:text-black">
                    Featured Listings
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-600 hover:text-black">
                    Recently Sold
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-lg mb-4 text-black">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="#" className="text-gray-600 hover:text-black">
                    Buyer's Guide
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-600 hover:text-black">
                    Restoration Tips
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-600 hover:text-black">
                    Fox Body History
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-600 hover:text-black">
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-lg mb-4 text-black">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="#" className="text-gray-600 hover:text-black">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-600 hover:text-black">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-600 hover:text-black">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-600 hover:text-black">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <Separator className="my-8 bg-gray-200" />

          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Fox Body Finder. All rights
              reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="#" className="text-sm text-gray-600 hover:text-black">
                Privacy
              </Link>
              <Link to="#" className="text-sm text-gray-600 hover:text-black">
                Terms
              </Link>
              <Link to="#" className="text-sm text-gray-600 hover:text-black">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
      <Toaster />
    </div>
  );
}
