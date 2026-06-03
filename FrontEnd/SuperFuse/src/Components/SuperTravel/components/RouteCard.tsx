import React from 'react';
import type { TravelRoute } from '../interfaces/TravelRoute';

interface RouteCardProps {
  route: TravelRoute;
  selected: boolean;
  onSelect: (routeId: string) => void;
}

const RouteCard: React.FC<RouteCardProps> = ({ route, selected, onSelect }) => {
  return (
    <button
      type="button"
      className={selected ? 'route-card selected' : 'route-card'}
      onClick={() => onSelect(route.id)}
    >
      <div className="route-card-top">
        <strong>{route.title}</strong>
        <span>{route.rank}</span>
      </div>
      <div className="route-legs">{route.legs.map((leg) => `${leg.fromCity} → ${leg.toCity}`).join(' • ')}</div>
      <div className="route-metrics">
        <span>{Math.floor(route.totalDurationMinutes / 60)}h {route.totalDurationMinutes % 60}m</span>
        <span>₹{route.totalCost}</span>
        <span>{route.transfers} transfer{route.transfers === 1 ? '' : 's'}</span>
        <span>Comfort {route.comfortScore}</span>
        <span>Carbon {route.carbonScore}</span>
      </div>
      <div className="route-summary">
        <small>{route.reliability}% reliability</small>
      </div>
    </button>
  );
};

export default RouteCard;
