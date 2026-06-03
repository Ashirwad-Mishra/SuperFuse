import type { RouteLeg } from '../interfaces/RouteLeg';

interface GraphAdjacency {
  [city: string]: RouteLeg[];
}

export const buildRouteGraph = (legs: RouteLeg[]): GraphAdjacency => {
  return legs.reduce<GraphAdjacency>((map, leg) => {
    const cityKey = leg.fromCity.toLowerCase();
    if (!map[cityKey]) {
      map[cityKey] = [];
    }
    map[cityKey].push(leg);
    return map;
  }, {});
};

export const searchRoutePaths = (
  source: string,
  destination: string,
  legs: RouteLeg[],
  maxStops = 2
): RouteLeg[][] => {
  const adjacency = buildRouteGraph(legs);
  const normalizedDestination = destination.trim().toLowerCase();
  const normalizedSource = source.trim().toLowerCase();
  const collected: RouteLeg[][] = [];

  const visited = new Set<string>([normalizedSource]);

  const dfs = (currentCity: string, path: RouteLeg[]) => {
    if (path.length > maxStops + 1) {
      return;
    }
    if (currentCity === normalizedDestination && path.length > 0) {
      collected.push([...path]);
      return;
    }
    const outgoing = adjacency[currentCity] || [];
    for (const leg of outgoing) {
      const nextCity = leg.toCity.trim().toLowerCase();
      if (visited.has(nextCity)) {
        continue;
      }
      visited.add(nextCity);
      path.push(leg);
      dfs(nextCity, path);
      path.pop();
      visited.delete(nextCity);
    }
  };

  dfs(normalizedSource, []);
  return collected;
};
