import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Alert, AlertDescription } from "../components/ui/alert";
import { 
  Activity, 
  AlertCircle, 
  CheckCircle2, 
  Clock,
  Database,
  Server,
  Zap
} from "lucide-react";

export function AdminObservability() {
  const queueHealth = [
    { name: 'Ingestion Worker', status: 'healthy', lastRun: '30s ago', errors: 0 },
    { name: 'Minting Queue', status: 'healthy', lastRun: '2m ago', errors: 0 },
    { name: 'Settlement Worker', status: 'degraded', lastRun: '15m ago', errors: 3 },
    { name: 'Notification Service', status: 'healthy', lastRun: '1m ago', errors: 0 },
  ];

  const generators = [
    { id: 'WF-NO-001', name: 'WindFarm Oslo North', lastSlice: '2m ago', lag: 2, success: 144, failures: 0 },
    { id: 'SP-DE-045', name: 'Solar Park Bavaria', lastSlice: '5m ago', lag: 5, success: 142, failures: 2 },
    { id: 'WF-UK-012', name: 'Offshore Wind Dogger Bank', lastSlice: '3m ago', lag: 3, success: 143, failures: 1 },
  ];

  const errors = [
    { timestamp: '2025-10-30 14:35:22', component: 'ingester', level: 'error', message: 'API timeout for SP-DE-045', count: 2 },
    { timestamp: '2025-10-30 14:28:15', component: 'program', level: 'warning', message: 'High gas price detected', count: 1 },
    { timestamp: '2025-10-30 14:15:08', component: 'marketplace', level: 'error', message: 'Failed to update auction state', count: 3 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl text-gray-900 mb-2">Admin / Observability</h1>
        <p className="text-gray-600">System health and monitoring dashboard</p>
      </div>

      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">System Status</div>
              <div className="text-xl text-emerald-600">Healthy</div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
              <Server className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Active Workers</div>
              <div className="text-xl text-gray-900">4 / 4</div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
              <Database className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Queue Depth</div>
              <div className="text-xl text-gray-900">127</div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Errors (1h)</div>
              <div className="text-xl text-gray-900">6</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Alerts */}
      <div className="space-y-3 mb-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>Settlement worker experiencing delays - 3 errors in last hour</span>
            <Button variant="ghost" size="sm">Investigate</Button>
          </AlertDescription>
        </Alert>
      </div>

      {/* Queue/Worker Health */}
      <Card className="mb-8">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-900">Queue & Worker Health</h3>
            <Button variant="outline" size="sm">
              <Activity className="w-4 h-4 mr-2" />
              View Logs
            </Button>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Worker</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Run</TableHead>
              <TableHead>Errors (1h)</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {queueHealth.map((worker) => (
              <TableRow key={worker.name}>
                <TableCell className="text-gray-900">{worker.name}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline"
                    className={
                      worker.status === 'healthy' 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }
                  >
                    <div className="w-2 h-2 rounded-full bg-current mr-2"></div>
                    {worker.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-600">{worker.lastRun}</TableCell>
                <TableCell>
                  <span className={worker.errors > 0 ? 'text-red-600' : 'text-gray-600'}>
                    {worker.errors}
                  </span>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">View Details</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Ingestion Monitor */}
      <Card className="mb-8">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-gray-900">Ingestion Monitor</h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Generator ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Last Slice</TableHead>
              <TableHead>Lag (min)</TableHead>
              <TableHead>Success (24h)</TableHead>
              <TableHead>Failures (24h)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {generators.map((gen) => (
              <TableRow key={gen.id}>
                <TableCell className="font-mono text-sm">{gen.id}</TableCell>
                <TableCell className="text-gray-900">{gen.name}</TableCell>
                <TableCell className="text-gray-600">{gen.lastSlice}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline"
                    className={
                      gen.lag < 5
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }
                  >
                    {gen.lag} min
                  </Badge>
                </TableCell>
                <TableCell className="text-emerald-600">{gen.success}</TableCell>
                <TableCell>
                  <span className={gen.failures > 0 ? 'text-red-600' : 'text-gray-600'}>
                    {gen.failures}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Error Log */}
      <Card>
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-900">Recent Errors</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Filter</Button>
              <Button variant="outline" size="sm">Export</Button>
            </div>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>Component</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Count</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {errors.map((error, index) => (
              <TableRow key={index}>
                <TableCell className="font-mono text-xs text-gray-600">
                  {error.timestamp}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-300">
                    {error.component}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="outline"
                    className={
                      error.level === 'error'
                        ? 'bg-red-50 text-red-700 border-red-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }
                  >
                    {error.level}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-900">{error.message}</TableCell>
                <TableCell className="text-gray-600">{error.count}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">View Stack</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
