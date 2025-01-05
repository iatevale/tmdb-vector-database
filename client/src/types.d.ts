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

export type MovieResultsType = {
    movies: MovieType[];
    total: number;
};

export type MovieProviderProps = {
    children: React.ReactNode;
    movieFilters?: MovieFiltersType;
    storageKey?: string;
};

export type MovieProviderState = {
    form: ReturnType<typeof useForm<z.infer<typeof FiltersSchema>>>;
    movieFilters: z.infer<typeof FiltersSchema>;
    setMovieFilters: (movieFilters: z.infer<typeof FiltersSchema>) => void;
    movieResults: MovieResultsType;
    setMovieResults: (movieResults: MovieResultsType) => void;
};

