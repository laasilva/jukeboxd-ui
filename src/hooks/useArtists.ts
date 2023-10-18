import { useFetch } from "./useFetch";

const useArtists = {
  GetById: () => {
    const {
      data: artistData
    } = useFetch(`${process.env.REACT_APP__API_URL}/artists?id=06HL4z0CvFAxyc27GXpf02`)
    
    return {
      artistData
    };
  },

  GetTop5: () => {
    const artistIds = ["06HL4z0CvFAxyc27GXpf02","1hLiboQ98IQWhpKeP9vRFw","1McMsnEElThX1knmY4oliG","1Ffb6ejR6Fe5IamqA5oRUF","4MzJMcHQBl9SIYSjwWn8QW"];
    const {
      data: artistData,
      loading: artistLoading,
      error: artistError
    } = useFetch(`${process.env.REACT_APP__API_URL}/artists/list?ids=${artistIds.toString()}`)
    return {
      artistData, 
      artistLoading,
      artistError
    };
  },

  GetAll: () => {
    const headers = new Headers();

    headers.append("page", "0");
    headers.append("size", "10");

    const params: RequestInit = {
      headers: headers,
      method: "GET"
    }

    const {
      data,
      loading,
      error
    } = useFetch(`${process.env.REACT_APP__API_URL}/artists/list/all`, params)

    return {
      data,
      loading,
      error
    }
  }
}

export default useArtists;