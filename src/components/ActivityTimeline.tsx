import { Activity } from "../lib/mock-data";
import { Badge } from "./ui/badge";
import { formatDateTime, shortenSignature, getStatusColor } from "../lib/utils";
import { ExternalLink } from "lucide-react";

interface ActivityTimelineProps {
  activities: Activity[];
}

export function ActivityTimeline({ activities }: ActivityTimelineProps) {
  const getActivityIcon = (type: Activity['type']) => {
    const icons = {
      'Minted': '🎨',
      'Listed': '📋',
      'Bid Placed': '💰',
      'Outbid': '⚠️',
      'Settled': '✅',
      'Redeemed': '♻️',
      'Transfer': '↗️',
    };
    return icons[type] || '•';
  };

  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <div key={index} className="flex gap-4">
          {/* Timeline dot */}
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm border-2 ${
              activity.status === 'success' ? 'bg-emerald-50 border-emerald-200' :
              activity.status === 'pending' ? 'bg-amber-50 border-amber-200' :
              'bg-red-50 border-red-200'
            }`}>
              {getActivityIcon(activity.type)}
            </div>
            {index < activities.length - 1 && (
              <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 pb-6">
            <div className="flex items-start justify-between gap-4 mb-1">
              <div>
                <div className="text-gray-900 mb-1">{activity.type}</div>
                <div className="text-sm text-gray-600">{activity.description}</div>
              </div>
              <Badge 
                variant="outline" 
                className={`${getStatusColor(activity.status)} border shrink-0`}
              >
                {activity.status}
              </Badge>
            </div>

            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
              <span>{formatDateTime(activity.timestamp)}</span>
              {activity.signature && (
                <a 
                  href={`https://solscan.io/tx/${activity.signature}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-indigo-600 hover:text-indigo-700"
                >
                  {shortenSignature(activity.signature)}
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
