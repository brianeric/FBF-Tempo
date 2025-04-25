import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Heart, Star } from "lucide-react";

// Vehicle interface
export interface Vehicle {
  id: number;
  year: number;
  model: string;
  trim: string;
  price: number;
  mileage: number;
  location: string;
  image: string;
  featured: boolean;
  condition: string;
  sellerName: string;
  sellerRating: number;
  description: string;
  bodyStyle?: string;
  engineType?: string;
  transmission?: string;
  color?: string;
  modifications?: string[];
  maintenanceHistory?: string[];
}

interface VehicleCardProps {
  vehicle: Vehicle;
}

// Format currency for vehicle prices
const formatVehiclePrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
};

export const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  return (
    <Card className="flex flex-col h-full border-gray-200 bg-white hover:shadow-lg transition-all overflow-hidden rounded-lg">
      {/* Image container with aspect ratio */}
      <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
        <img
          src={vehicle.image}
          alt={`${vehicle.year} ${vehicle.model} ${vehicle.trim}`}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-0 left-0 w-full p-3 flex justify-between items-start">
          <Badge className="bg-blue-600 text-white font-medium">
            {vehicle.condition}
          </Badge>
          <button className="bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
            <Heart className="h-5 w-5 text-gray-600 hover:text-red-500 transition-colors" />
          </button>
        </div>
        {vehicle.featured && (
          <div className="absolute bottom-0 left-0 bg-yellow-500 text-black px-3 py-1 text-xs font-bold">
            FEATURED
          </div>
        )}
      </div>

      {/* Vehicle info */}
      <CardHeader className="pb-2 pt-4">
        <div className="flex justify-between items-start gap-2">
          <div>
            <CardTitle className="text-xl font-bold text-gray-900 line-clamp-1">
              {vehicle.year} {vehicle.model} {vehicle.trim}
            </CardTitle>
            <CardDescription className="text-gray-600 mt-1">
              {vehicle.mileage.toLocaleString()} miles • {vehicle.location}
            </CardDescription>
          </div>
          <div className="text-right">
            <span className="font-bold text-xl text-blue-600">
              {formatVehiclePrice(vehicle.price)}
            </span>
          </div>
        </div>
      </CardHeader>

      {/* Vehicle details */}
      <CardContent className="flex-grow px-6 py-2">
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-4">
          {vehicle.bodyStyle && (
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Body:</span>
              <span className="font-medium">{vehicle.bodyStyle}</span>
            </div>
          )}
          {vehicle.engineType && (
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Engine:</span>
              <span className="font-medium">{vehicle.engineType}</span>
            </div>
          )}
          {vehicle.transmission && (
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Trans:</span>
              <span className="font-medium">{vehicle.transmission}</span>
            </div>
          )}
          {vehicle.color && (
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Color:</span>
              <span className="font-medium">{vehicle.color}</span>
            </div>
          )}
        </div>

        <p className="text-gray-700 text-sm line-clamp-2 mb-3">
          {vehicle.description}
        </p>

        <div className="flex items-center text-sm text-gray-600 border-t pt-3">
          <Avatar className="h-6 w-6 mr-2">
            <AvatarImage
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${vehicle.sellerName}`}
              alt={vehicle.sellerName}
            />
            <AvatarFallback>{vehicle.sellerName[0]}</AvatarFallback>
          </Avatar>
          <span className="font-medium">{vehicle.sellerName}</span>
          <div className="flex ml-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${i < Math.floor(vehicle.sellerRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span className="ml-1">{vehicle.sellerRating.toFixed(1)}</span>
        </div>
      </CardContent>

      <CardFooter className="pt-0 pb-4 px-6">
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium">
          View Details
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VehicleCard;
