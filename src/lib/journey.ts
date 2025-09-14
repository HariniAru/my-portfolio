// Journey tracking utilities for session storage

const STORAGE_KEYS = {
  FIRST_VISIT: 'portfolio_first_visit',
  VISITED_PAGES: 'portfolio_visited_pages',
  LAST_STOP: 'portfolio_last_stop',
  PLANE_POSITION: 'portfolio_plane_position'
} as const;

export interface JourneyState {
  visitedPages: string[];
  lastStop: number | null;
  planePosition: { lon: number; lat: number };
}

// Check if this is the user's first visit
export function isFirstVisit(): boolean {
  try {
    return !sessionStorage.getItem(STORAGE_KEYS.FIRST_VISIT);
  } catch {
    return true;
  }
}

// Mark that user has visited before
export function markVisited(): void {
  try {
    sessionStorage.setItem(STORAGE_KEYS.FIRST_VISIT, 'false');
  } catch {
    // Silently fail if localStorage unavailable
  }
}

// Get list of visited pages
export function getVisitedPages(): string[] {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEYS.VISITED_PAGES);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

// Add a page to visited list
export function addVisitedPage(route: string): void {
  try {
    const visited = getVisitedPages();
    if (!visited.includes(route)) {
      visited.push(route);
      sessionStorage.setItem(STORAGE_KEYS.VISITED_PAGES, JSON.stringify(visited));
    }
  } catch {
    // Silently fail
  }
}

// Get last visited stop
export function getLastStop(): number | null {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEYS.LAST_STOP);
    return stored ? parseInt(stored, 10) : null;
  } catch {
    return null;
  }
}

// Set last visited stop
export function setLastStop(stopId: number): void {
  try {
    sessionStorage.setItem(STORAGE_KEYS.LAST_STOP, stopId.toString());
  } catch {
    // Silently fail
  }
}

// Get saved plane position
export function getPlanePosition(): { lon: number; lat: number } | null {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEYS.PLANE_POSITION);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

// Save plane position
export function setPlanePosition(position: { lon: number; lat: number }): void {
  try {
    sessionStorage.setItem(STORAGE_KEYS.PLANE_POSITION, JSON.stringify(position));
  } catch {
    // Silently fail
  }
}

// Get current stop based on route
export function getCurrentStopFromRoute(route: string): number | null {
  const routeToStopMap: Record<string, number> = {
    '/start': 1,
    '/home': 2,
    '/education': 3,
    '/experience': 4,
    '/projects': 5,
    '/leadership': 6
  };
  return routeToStopMap[route] || null;
}

// Clear all journey data (for testing)
export function clearJourneyData(): void {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      sessionStorage.removeItem(key);
    });
  } catch {
    // Silently fail
  }
}