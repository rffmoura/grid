import { createContext, useContext, useState, type ReactNode } from 'react';
import type { GameFilters } from '../features/games/types';

interface FilterContextType {
  filters: GameFilters;
  setFilters: (filters: GameFilters) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<GameFilters>({});

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>{children}</FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
}
