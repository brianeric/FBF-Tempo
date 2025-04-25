import { HomeHeader } from "../home/HomeHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreateListing() {
  return (
    <div className="min-h-screen bg-white">
      <HomeHeader />
      <div className="container pt-24 pb-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Create a New Listing</h1>
          <p className="text-gray-600 mb-8">
            Fill out the form below to list your Fox Body Mustang for sale.
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Select Listing Type</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-black rounded-lg p-4 bg-black text-white">
                <h3 className="font-medium mb-2">Vehicle</h3>
                <p className="text-sm">List your Fox Body Mustang for sale</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-400 cursor-pointer">
                <h3 className="font-medium mb-2">Parts</h3>
                <p className="text-sm">List Fox Body parts for sale</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-400 cursor-pointer">
                <h3 className="font-medium mb-2">Services</h3>
                <p className="text-sm">
                  Offer services related to Fox Body Mustangs
                </p>
              </div>
            </div>
          </div>

          <form className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Vehicle Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 15 }, (_, i) => 1979 + i).map(
                        (year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="model">Model</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gt">GT</SelectItem>
                      <SelectItem value="lx">LX</SelectItem>
                      <SelectItem value="cobra">Cobra</SelectItem>
                      <SelectItem value="saleen">Saleen</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="body-style">Body Style</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select body style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hatchback">Hatchback</SelectItem>
                      <SelectItem value="coupe">Coupe</SelectItem>
                      <SelectItem value="convertible">Convertible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="transmission">Transmission</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select transmission" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manual">Manual</SelectItem>
                      <SelectItem value="automatic">Automatic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="engine">Engine</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select engine" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5.0-v8">5.0L V8</SelectItem>
                      <SelectItem value="2.3-turbo">2.3L Turbo</SelectItem>
                      <SelectItem value="custom">Custom/Swap</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mileage">Mileage</Label>
                  <Input
                    id="mileage"
                    type="number"
                    placeholder="Enter mileage"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Listing Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., 1989 Ford Mustang GT - Excellent Condition"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your vehicle in detail..."
                  className="min-h-32"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="Enter asking price"
                />
              </div>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full bg-black hover:bg-gray-800"
              >
                Continue to Select Fox Pack
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
