import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Slider } from "./ui/slider";
import { Badge } from "./ui/badge";
import { X, SlidersHorizontal } from "lucide-react";

interface FilterState {
  generators: string[];
  regions: string[];
  renewableTypes: string[];
  priceRange: [number, number];
  carbonMax: number;
  status: string[];
}

interface FilterSidebarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClear: () => void;
}

export function FilterSidebar({ filters, onFiltersChange, onClear }: FilterSidebarProps) {
  const generatorOptions = ['Wexford Wind Farm', 'Kerry Solar Park', 'Cork Offshore Wind'];
  const regionOptions = ['Ireland', 'United Kingdom', 'Germany', 'Spain', 'France'];
  const renewableTypeOptions = ['Wind', 'Solar', 'Hydro'];
  const statusOptions = ['On Auction', 'Buy Now', 'Soon'];

  const toggleArrayFilter = (key: keyof FilterState, value: string) => {
    const current = filters[key] as string[];
    const newValue = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    onFiltersChange({ ...filters, [key]: newValue });
  };

  const activeFilterCount = 
    filters.generators.length + 
    filters.regions.length + 
    filters.renewableTypes.length + 
    filters.status.length;

  return (
    <div className="w-full lg:w-72 border-r border-gray-200 bg-white p-6 space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between lg:flex">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-gray-600" />
          <h3 className="text-gray-900">Filters</h3>
          {activeFilterCount > 0 && (
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
              {activeFilterCount}
            </Badge>
          )}
        </div>
        {activeFilterCount > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClear}
            className="text-gray-600 hover:text-gray-900"
          >
            Clear all
          </Button>
        )}
      </div>

      {/* Status */}
      <div className="space-y-3">
        <Label>Status</Label>
        <div className="space-y-2">
          {statusOptions.map((status) => (
            <div key={status} className="flex items-center gap-2">
              <Checkbox
                id={`status-${status}`}
                checked={filters.status.includes(status)}
                onCheckedChange={() => toggleArrayFilter('status', status)}
              />
              <label
                htmlFor={`status-${status}`}
                className="text-sm text-gray-700 cursor-pointer"
              >
                {status}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Renewable Type */}
      <div className="space-y-3">
        <Label>Renewable Type</Label>
        <div className="space-y-2">
          {renewableTypeOptions.map((type) => (
            <div key={type} className="flex items-center gap-2">
              <Checkbox
                id={`type-${type}`}
                checked={filters.renewableTypes.includes(type)}
                onCheckedChange={() => toggleArrayFilter('renewableTypes', type)}
              />
              <label
                htmlFor={`type-${type}`}
                className="text-sm text-gray-700 cursor-pointer"
              >
                {type}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Region */}
      <div className="space-y-3">
        <Label>Region</Label>
        <div className="space-y-2">
          {regionOptions.map((region) => (
            <div key={region} className="flex items-center gap-2">
              <Checkbox
                id={`region-${region}`}
                checked={filters.regions.includes(region)}
                onCheckedChange={() => toggleArrayFilter('regions', region)}
              />
              <label
                htmlFor={`region-${region}`}
                className="text-sm text-gray-700 cursor-pointer"
              >
                {region}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label>Price Range (USDC)</Label>
          <span className="text-sm text-gray-600">
            {filters.priceRange[0]} - {filters.priceRange[1]}
          </span>
        </div>
        <Slider
          value={filters.priceRange}
          onValueChange={(value) => onFiltersChange({ ...filters, priceRange: value as [number, number] })}
          min={0}
          max={100}
          step={5}
          className="mt-2"
        />
      </div>

      {/* Carbon Intensity */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label>Max Carbon Intensity</Label>
          <span className="text-sm text-gray-600">{filters.carbonMax} gCO₂/kWh</span>
        </div>
        <Slider
          value={[filters.carbonMax]}
          onValueChange={(value) => onFiltersChange({ ...filters, carbonMax: value[0] })}
          min={0}
          max={50}
          step={1}
          className="mt-2"
        />
      </div>

      {/* Active Filters */}
      {activeFilterCount > 0 && (
        <div className="pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600 mb-2">Active Filters:</div>
          <div className="flex flex-wrap gap-2">
            {filters.status.map((s) => (
              <Badge 
                key={s} 
                variant="outline" 
                className="bg-gray-50 text-gray-700 border-gray-300"
              >
                {s}
                <button 
                  onClick={() => toggleArrayFilter('status', s)}
                  className="ml-1 hover:text-gray-900"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
            {filters.renewableTypes.map((t) => (
              <Badge 
                key={t} 
                variant="outline" 
                className="bg-gray-50 text-gray-700 border-gray-300"
              >
                {t}
                <button 
                  onClick={() => toggleArrayFilter('renewableTypes', t)}
                  className="ml-1 hover:text-gray-900"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
            {filters.regions.map((r) => (
              <Badge 
                key={r} 
                variant="outline" 
                className="bg-gray-50 text-gray-700 border-gray-300"
              >
                {r}
                <button 
                  onClick={() => toggleArrayFilter('regions', r)}
                  className="ml-1 hover:text-gray-900"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
