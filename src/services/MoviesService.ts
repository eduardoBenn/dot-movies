import { API_KEY, baseHttpClient } from '.'

export default {
  getPopularMovies: async (page: number = 1) => {
    try {
      const response = await baseHttpClient.get(
        `movie/popular?api_key=${API_KEY}&page=${page}&language=pt-BR`
      )
      return response.data
    } catch (error) {
      console.error('Error fetching movies:', error)
      throw error
    }
  },
  getMoviesImages: async (movieId: number) => {
    try {
      const response = await baseHttpClient.get(
        `movie/${movieId}/images?include_image_language=pt&api_key=${API_KEY}`
      )
      return response.data
    } catch (error) {
      console.error('Error fetching movie images:', error)
      throw error
    }
  },
  getMoviesGenres: async () => {
    try {
      const response = await baseHttpClient.get(
        `genre/movie/list?api_key=${API_KEY}&language=pt-BR`
      )
      return response.data
    } catch (error) {
      console.error('Error fetching movie genres:', error)
      throw error
    }
  },
}
