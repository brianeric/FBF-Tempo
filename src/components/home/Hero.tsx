import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, CheckCircle2, Search } from "lucide-react";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 space-y-8">
            <div className="flex flex-col items-start">
              <Badge className="mb-4 bg-gray-200 text-gray-800 hover:bg-gray-300 border-none">
                New Release v1.0
              </Badge>
              <div className="flex flex-col items-center lg:items-start">
                <img
                  src="/logo.png"
                  alt="Fox Body Finder Logo"
                  className="h-auto w-full max-w-[400px] mb-6"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
            <p className="text-lg md:text-xl text-gray-600">
              The premier destination for buying and selling Fox Body Mustangs
              (1979-1993). Connect with fellow enthusiasts, find your dream
              classic Ford, and access our specialized community features.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup">
                <Button
                  size="lg"
                  className="bg-black text-white hover:bg-gray-800 w-full sm:w-auto"
                >
                  Browse Listings
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="border-gray-300 text-gray-700 hover:border-gray-500 hover:text-black w-full sm:w-auto"
              >
                <Search className="mr-2 h-4 w-4" />
                Search Mustangs
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
              <CheckCircle2 className="h-4 w-4 text-black" />
              <span>Verified sellers</span>
              <Separator
                orientation="vertical"
                className="h-4 mx-2 bg-gray-300 hidden sm:block"
              />
              <CheckCircle2 className="h-4 w-4 text-black" />
              <span>Detailed vehicle history</span>
              <Separator
                orientation="vertical"
                className="h-4 mx-2 bg-gray-300 hidden sm:block"
              />
              <CheckCircle2 className="h-4 w-4 text-black" />
              <span>Secure messaging</span>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="absolute -z-10 inset-0 bg-gradient-to-tr from-gray-200/60 via-gray-400/40 to-black/10 rounded-3xl blur-2xl transform scale-110" />
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl shadow-xl overflow-hidden">
              <div className="p-1 bg-gradient-to-r from-gray-200 via-gray-400 to-black rounded-t-xl">
                <div className="flex items-center gap-2 px-3 py-1">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <div className="ml-2 text-xs text-black font-medium">
                    Tempo App
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-24 h-24 bg-gray-200 rounded-md overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1600382684817-99a56a50c8f6?q=80&w=400&auto=format&fit=crop"
                        alt="Fox Body Mustang"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold">1989 Mustang GT</h3>
                      <p className="text-sm text-gray-600">
                        5.0L V8, 62k miles
                      </p>
                      <p className="font-semibold">$24,500</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-24 h-24 bg-gray-200 rounded-md overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1567808291548-fc3ee04dbcf0?w=400&q=80"
                        alt="Fox Body Mustang"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold">1993 Cobra SVT</h3>
                      <p className="text-sm text-gray-600">
                        Limited Edition, 45k miles
                      </p>
                      <p className="font-semibold">$38,900</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-0 -z-10 h-[300px] w-[300px] rounded-full bg-gray-200/60 blur-[100px]" />
      <div className="absolute bottom-0 right-0 -z-10 h-[300px] w-[300px] rounded-full bg-gray-400/40 blur-[100px]" />
    </section>
  );
}
