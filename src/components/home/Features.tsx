import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Star,
  Search,
  FileText,
  MessageSquare,
  Shield,
  Zap,
} from "lucide-react";

// Feature interface
interface Feature {
  title: string;
  description: string;
  icon: JSX.Element;
}

export function Features() {
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

  return (
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
                <CardTitle className="text-black">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
