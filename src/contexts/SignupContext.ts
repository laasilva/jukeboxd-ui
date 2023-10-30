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
  favoriteArtist?: any;
  setFavoriteArtist?: any;
  favoriteAlbum?: any;
  setFavoriteAlbum?: any;
  favoriteSong?: any;
  setFavoriteSong?: any;
  picture?: any;
  setPicture?: any;
}

export const SignupContext = createContext<ContextProps>({});

export const useSignupContext = () => useContext(SignupContext);