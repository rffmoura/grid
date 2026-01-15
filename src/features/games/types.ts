export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface EsrbRating {
  id: number;
  name: string;
  slug: string;
}

export interface Genre {
  id: number;
  name: string;
  slug: string;
}

export interface Rating {
  id: number;
  title: string;
  count: number;
  percent: number;
}

export interface Screenshot {
  id: number;
  image: string;
}

export interface Store {
  id: number;
  store: {
    id: number;
    name: string;
    slug: string;
  };
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  language: string;
  games_count: number;
}

export interface AddedByStatus {
  yet: number;
  owned: number;
  beaten: number;
  toplay: number;
  dropped: number;
  playing: number;
}

export interface Game {
  id: number;
  slug: string;
  name: string;
  released: string;
  tba: boolean;
  background_image: string;
  rating: number;
  rating_top: number;
  ratings: Rating[];
  ratings_count: number;
  reviews_text_count: number;
  added: number;
  added_by_status: AddedByStatus;
  metacritic: number | null;
  playtime: number;
  suggestions_count: number;
  updated: string;
  user_game: unknown;
  reviews_count: number;
  saturated_color: string;
  dominant_color: string;
  platforms: {
    platform: Platform;
  }[];
  parent_platforms: {
    platform: Platform;
  }[];
  genres: Genre[];
  stores: Store[];
  clip: string | null;
  tags: Tag[];
  esrb_rating: EsrbRating | null;
  short_screenshots: Screenshot[];
}

export interface FetchGamesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Game[];
}
