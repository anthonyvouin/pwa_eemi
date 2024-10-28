import { Category } from "./categoryDTO";

export interface Movie {
    id: number;
    original_name: string;
    overview: string;
    original_language: string;
    first_air_date: string;
    vote_average: number;
    vote_count: number;
    poster_path: string;
    categories: Category[];
  }
  