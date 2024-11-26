import { createContext, useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";

const BookmarkContext = createContext();
const BASE_URL = "http://localhost:5000/bookmarks";

function BookmarkListProvider({ children }) {
  const [currentBookmark, setCurrentbookmark] = useState(null);
  const [isLoadingCurrBookmark, setIsLoadingCurrBookmark] = useState(false);

  const { isLoading, data: bookmarks } = useFetch(BASE_URL);

  async function getBookmark(id) {
    setIsLoadingCurrBookmark(true);
    setCurrentbookmark(null)
    try {
      const { data } = await axios.get(`${BASE_URL}/${id}`);
      setCurrentbookmark(data);
      setIsLoadingCurrBookmark(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoadingCurrBookmark(false);
    }
  }

  return (
    <BookmarkContext.Provider
      value={{ isLoading, bookmarks, currentBookmark, getBookmark, isLoadingCurrBookmark }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export default BookmarkListProvider;

export function useBookmark() {
  return useContext(BookmarkContext);
}
