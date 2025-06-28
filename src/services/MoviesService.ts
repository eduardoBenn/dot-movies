import httpClient, { API_KEY } from ".";


export default {
  getMovies: async (page: number = 1) => {
    try {
      const response = await httpClient.get(`movie/popular?api_key=${API_KEY}&language=pt-BR&page=${page}`)
      console.log(response)
      return response.data;
    } catch (error) {
      console.error("Error fetching movies:", error);
      throw error;
    }
  }
}
