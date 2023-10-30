import { createContext, useContext } from "react";

export type ContextProps = {
  name?: string;
  setName?: any;
  username?: string;
  setUsername?: any;
  email?: string;
  setEmail?: any;
  password?: string;
  setPassword?: any;
  description?: string;
  setDescription?: any;
  genres?: string[];
  setGenres?: any;
  favoriteArtists?: any;
  setFavoriteArtists?: any;
  favoriteAlbums?: any;
  setFavoriteAlbums?: any;
  favoriteSongs?: any;
  setFavoriteSongs?: any;
  picture?: any;
  setPicture?: any;
}

export const SignupContext = createContext<ContextProps>({});

export const useSignupContext = () => useContext(SignupContext);