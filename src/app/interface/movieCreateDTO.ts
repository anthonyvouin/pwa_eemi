export interface MovieCreateDTO {
    id?: number; 
    original_name: string;
    overview: string;
    original_language: string;
    origin_country: string[];
    first_air_date: string;
    vote_average: number;
    vote_count: number;
    popularity: number;
    adult: boolean;
    backdrop_path: string;
    poster_path: string;
    categories: number[]; 
  }
  