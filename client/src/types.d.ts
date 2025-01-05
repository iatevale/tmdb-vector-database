export type MovieType = {
    original_title: string;
    vote_average: number;
    popularity: number;
    poster_path: string;
    tagline: string;
    revenue: number;
    genres: string;
    title: string;
    vote_count: number;
    imdb_id: string;
    status: string;
    budget: number;
    backdrop_path: string;
    runtime: number;
    release_date: string;
    spoken_languages: string;
    overview: string;
    id: number;
}

export type MovieResponseData = {
    status: {
        extra_info: string;
        code: number;
        reason: string;
        error_code: string;
        retriable: boolean;
        detail: string;
    };
    data: MovieType[];
} | none;

export type FiltersType = {
    page: number;
    orderBy: string;
    orderDirection: enum;
    totalMovies: number;
    voteAverageMin: number;
    voteAverageMax: number;
    decadeMax: number;
    decadeMin: number;
    genres?: string[];
};

export type MovieProviderProps = {
    children: React.ReactNode;
    filters?: FiltersType;
    storageKey?: string;
};

export type MovieProviderState = {
    filters: FiltersType;
    setFiltersType: (filters: FiltersType) => void;
};

