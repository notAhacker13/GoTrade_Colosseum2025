import { useState, useEffect } from 'react';
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { ActivityTimeline } from "../components/ActivityTimeline";
import { Filter } from "lucide-react";
import { mockActivityFeed } from "../lib/mock-data";
import { ActivityTimelineSkeleton } from "../components/LoadingStates";
import { NoActivityEmptyState, NoFilteredActivityEmptyState } from "../components/EmptyStates";
import { LoadErrorState } from "../components/ErrorStates";

export function Activity() {
  const [filter, setFilter] = useState<'all' | 'you' | 'following'>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Simulate data loading
  useEffect(() => {
    setLoading(true);
    setError(false);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [filter]);

  const handleRetry = () => {
    setLoading(true);
    setError(false);
    setTimeout(() => {
      setError(false);
      setLoading(false);
    }, 600);
  };

  const filteredActivities = mockActivityFeed.filter(activity => {
    if (filter === 'you') {
      return activity.description.toLowerCase().includes('you');
    }
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl text-gray-900 mb-2">Activity Feed</h1>
        <p className="text-gray-600">Track all marketplace and your trading activity</p>
      </div>

      {/* Filter Tabs */}
      <Tabs value={filter} onValueChange={(v) => setFilter(v as any)} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Activity</TabsTrigger>
          <TabsTrigger value="you">Your Activity</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Activity Timeline */}
      <Card className="p-6">
        {loading ? (
          <ActivityTimelineSkeleton count={5} />
        ) : error ? (
          <LoadErrorState onRetry={handleRetry} />
        ) : filteredActivities.length > 0 ? (
          <ActivityTimeline activities={filteredActivities} />
        ) : mockActivityFeed.length === 0 ? (
          <NoActivityEmptyState />
        ) : (
          <NoFilteredActivityEmptyState />
        )}
      </Card>

      {filteredActivities.length > 0 && (
        <div className="mt-6 text-center">
          <Button variant="outline">Load More Activity</Button>
        </div>
      )}
    </div>
  );
}
