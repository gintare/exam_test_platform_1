import axios from 'axios';
import { getDefaultToken } from './service';
const API_URL = import.meta.env.VITE_API_URL;

export const getAllData = async () => {
  try {
    const resp = await axios.get(API_URL);
    return resp.data;
  } catch (error) {
    throw new Error(`Error fetching all data: ${error.message}`);
  }
};

export const getOne = async (id) => {
  try {
    const resp = await axios.get(`${API_URL}/${id}`);
    return resp.data;
  } catch (error) {
    console.error(`Error fetching data for ID ${id}: ${error.message}`);
  }
};

export const getAllCategories = async () => {
  try {
    //const userToken = getDefaultToken();
    const resp = await axios.get(`${API_URL}/api/categories`);
    return resp.data;
  } catch (error) {
    throw new Error(`Error fetching all data: ${error.message}`);
  }
};

export const getAllBooks = async (page) => {
  try {
    const userToken = getDefaultToken();
    const resp = await axios.get(`${API_URL}/api/books?page=${page}`);
    
    return resp.data;
  } catch (error) {
    throw new Error(`Error fetching all data: ${error.message}`);
  }
};

export const getOneBook = async (id) => {
  try {
    const userToken = getDefaultToken();
    const resp = await axios.get(`${API_URL}/api/books/${id}`);
    return resp.data;
  } catch (error) {
    throw new Error(`Error fetching all data: ${error.message}`);
  }
};

export const getBooksByCategories = async (category_id) => {
  try {
    const userToken = getDefaultToken();
    const resp = await axios.get(`${API_URL}/api/categories/${category_id}/books`);
    return resp.data;
  } catch (error) {
    throw new Error(`Error fetching all data: ${error.message}`);
  }
};

