import axios from "axios";
import { API_BASE_URL } from "../global";

export const getPokemonList = async (startIndex, limit) => {
  const response = await axios.get(
    `${API_BASE_URL}/pokemon?offset=${startIndex}&limit=${limit}`
  );
  return response.data;
};

export const getPokemonByName = async (name) => {
  const response = await axios.get(`${API_BASE_URL}/pokemon/${name}`);
  return response.data;
};
