export interface IMovie {
  id: number
  title: string
  release_date: string
  vote_average: number
  genre_ids: number[]
  poster_path: string
  price?: string
}

export interface IGenre {
  id: number
  name: string
}

interface IMovieImagePaths {
  file_path: string
}

export interface IMovieImage {
  id: number
  backdrops: IMovieImagePaths[]
  logos: IMovieImagePaths[]
  posters: IMovieImagePaths[]
}
