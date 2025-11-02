import { useState } from 'react';
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Progress } from "../components/ui/progress";
import { Switch } from "../components/ui/switch";
import { Checkbox } from "../components/ui/checkbox";
import { Slider } from "../components/ui/slider";
import { Skeleton } from "../components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  Loader2,
  Wind,
  Zap,
  Download
} from "lucide-react";

export function ComponentsLibrary() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl text-gray-900 mb-2">Components Library</h1>
        <p className="text-gray-600">
          Complete design system with all component states and variants
        </p>
      </div>

      <div className="space-y-12">
        {/* Buttons */}
        <section>
          <h2 className="text-xl text-gray-900 mb-6">Buttons</h2>
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-gray-900 mb-3">Variants</h3>
                <div className="flex flex-wrap gap-3">
                  <Button>Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                </div>
              </div>

              <div>
                <h3 className="text-gray-900 mb-3">Sizes</h3>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                  <Button size="icon">
                    <Wind className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-gray-900 mb-3">States</h3>
                <div className="flex flex-wrap gap-3">
                  <Button>Normal</Button>
                  <Button disabled>Disabled</Button>
                  <Button>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Loading
                  </Button>
                  <Button>
                    <Download className="w-4 h-4 mr-2" />
                    With Icon
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-gray-900 mb-3">Custom Colors</h3>
                <div className="flex flex-wrap gap-3">
                  <Button className="bg-emerald-600 hover:bg-emerald-700">Emerald</Button>
                  <Button className="bg-indigo-600 hover:bg-indigo-700">Indigo</Button>
                  <Button className="bg-amber-600 hover:bg-amber-700">Amber</Button>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Badges */}
        <section>
          <h2 className="text-xl text-gray-900 mb-6">Badges</h2>
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-gray-900 mb-3">Status Badges</h3>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                    Success
                  </Badge>
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                    Warning
                  </Badge>
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                    Error
                  </Badge>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    Info
                  </Badge>
                  <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                    Verified
                  </Badge>
                  <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">
                    Pending
                  </Badge>
                </div>
              </div>

              <div>
                <h3 className="text-gray-900 mb-3">Certificate Status</h3>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="outline" className="bg-indigo-100 text-indigo-700 border-indigo-200">
                    On Auction
                  </Badge>
                  <Badge variant="outline" className="bg-emerald-100 text-emerald-700 border-emerald-200">
                    Buy Now
                  </Badge>
                  <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200">
                    Soon
                  </Badge>
                  <Badge variant="outline" className="bg-gray-100 text-gray-600 border-gray-200">
                    Sold Out
                  </Badge>
                </div>
              </div>

              <div>
                <h3 className="text-gray-900 mb-3">With Icons</h3>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                    <div className="w-2 h-2 rounded-full bg-emerald-600 mr-2"></div>
                    Active
                  </Badge>
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                    <Wind className="w-3 h-3 mr-1" />
                    Wind Energy
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Inputs & Forms */}
        <section>
          <h2 className="text-xl text-gray-900 mb-6">Inputs & Forms</h2>
          <Card className="p-6">
            <div className="space-y-6 max-w-md">
              <div>
                <h3 className="text-gray-900 mb-3">Text Inputs</h3>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="normal">Normal Input</Label>
                    <Input id="normal" placeholder="Enter text..." />
                  </div>
                  <div>
                    <Label htmlFor="disabled">Disabled</Label>
                    <Input id="disabled" placeholder="Disabled input" disabled />
                  </div>
                  <div>
                    <Label htmlFor="number">Number Input</Label>
                    <Input id="number" type="number" placeholder="0.00" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-gray-900 mb-3">Checkboxes & Switches</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Checkbox id="check1" />
                    <label htmlFor="check1" className="text-sm text-gray-700">
                      Accept terms and conditions
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="switch1" className="text-sm text-gray-700">
                      Auto-list after mint
                    </label>
                    <Switch id="switch1" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-gray-900 mb-3">Slider</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Price Range</span>
                    <span className="text-gray-900">0 - 50 USDC</span>
                  </div>
                  <Slider defaultValue={[25]} max={100} step={1} />
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Alerts */}
        <section>
          <h2 className="text-xl text-gray-900 mb-6">Alerts</h2>
          <Card className="p-6">
            <div className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  This is an informational alert with important details
                </AlertDescription>
              </Alert>

              <Alert className="border-emerald-200 bg-emerald-50">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <AlertDescription className="text-emerald-900">
                  Success! Your transaction has been confirmed
                </AlertDescription>
              </Alert>

              <Alert className="border-amber-200 bg-amber-50">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                <AlertDescription className="text-amber-900">
                  Warning: KYC verification required for large volumes
                </AlertDescription>
              </Alert>

              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Error: Transaction failed - insufficient balance
                </AlertDescription>
              </Alert>
            </div>
          </Card>
        </section>

        {/* Tables */}
        <section>
          <h2 className="text-xl text-gray-900 mb-6">Tables</h2>
          <Card>
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-gray-900">Data Table Example</h3>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Generator</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Volume</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="text-gray-900">WindFarm Oslo North</TableCell>
                  <TableCell>Oslo, Norway</TableCell>
                  <TableCell>1.0 MWh</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                      Active
                    </Badge>
                  </TableCell>
                  <TableCell>45.50 USDC</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-gray-900">Solar Park Bavaria</TableCell>
                  <TableCell>Munich, Germany</TableCell>
                  <TableCell>1.0 MWh</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                      Pending
                    </Badge>
                  </TableCell>
                  <TableCell>38.00 USDC</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </section>

        {/* Cards */}
        <section>
          <h2 className="text-xl text-gray-900 mb-6">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="text-gray-900 mb-2">Basic Card</h3>
              <p className="text-gray-600">
                Simple card with content and border
              </p>
            </Card>

            <Card className="p-6 bg-emerald-50 border-emerald-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <div className="text-sm text-emerald-700">Stat Card</div>
                  <div className="text-xl text-emerald-900">8.7 MW</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="text-gray-900 mb-2">Interactive Card</h3>
              <p className="text-gray-600">
                With hover effect
              </p>
            </Card>
          </div>
        </section>

        {/* Progress & Loading */}
        <section>
          <h2 className="text-xl text-gray-900 mb-6">Progress & Loading</h2>
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-gray-900 mb-3">Progress Bar</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-600 mb-2">Accruing to 1 MWh</div>
                    <Progress value={67} className="h-2" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-gray-900 mb-3">Skeleton Loaders</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                  <Skeleton className="h-32 w-full" />
                </div>
              </div>

              <div>
                <h3 className="text-gray-900 mb-3">Loading Spinners</h3>
                <div className="flex gap-6">
                  <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
                  <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
                  <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Tabs */}
        <section>
          <h2 className="text-xl text-gray-900 mb-6">Tabs</h2>
          <Tabs defaultValue="tab1">
            <TabsList>
              <TabsTrigger value="tab1">Overview</TabsTrigger>
              <TabsTrigger value="tab2">Data</TabsTrigger>
              <TabsTrigger value="tab3">Activity</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">
              <Card className="p-6">
                <h3 className="text-gray-900 mb-2">Overview Content</h3>
                <p className="text-gray-600">This is the overview tab content</p>
              </Card>
            </TabsContent>
            <TabsContent value="tab2">
              <Card className="p-6">
                <h3 className="text-gray-900 mb-2">Data Content</h3>
                <p className="text-gray-600">This is the data tab content</p>
              </Card>
            </TabsContent>
            <TabsContent value="tab3">
              <Card className="p-6">
                <h3 className="text-gray-900 mb-2">Activity Content</h3>
                <p className="text-gray-600">This is the activity tab content</p>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Color System */}
        <section>
          <h2 className="text-xl text-gray-900 mb-6">Color System</h2>
          <Card className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-sm text-gray-600 mb-2">Primary - Emerald/Teal</div>
                <div className="flex gap-2">
                  <div className="w-12 h-12 rounded-lg bg-emerald-50 border border-emerald-200"></div>
                  <div className="w-12 h-12 rounded-lg bg-emerald-600"></div>
                  <div className="w-12 h-12 rounded-lg bg-teal-600"></div>
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-600 mb-2">Accent - Indigo</div>
                <div className="flex gap-2">
                  <div className="w-12 h-12 rounded-lg bg-indigo-50 border border-indigo-200"></div>
                  <div className="w-12 h-12 rounded-lg bg-indigo-600"></div>
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-600 mb-2">Warning - Amber</div>
                <div className="flex gap-2">
                  <div className="w-12 h-12 rounded-lg bg-amber-50 border border-amber-200"></div>
                  <div className="w-12 h-12 rounded-lg bg-amber-600"></div>
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-600 mb-2">Error - Red</div>
                <div className="flex gap-2">
                  <div className="w-12 h-12 rounded-lg bg-red-50 border border-red-200"></div>
                  <div className="w-12 h-12 rounded-lg bg-red-600"></div>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
