import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

interface ApiResponse {
  id: number;
  name: string;
}

const useViewport = () => {
  const [width, setWidth] = useState<number>(0);
  const [data, setData] = useState<ApiResponse[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    
    const fetchData = async () => {
      try {
        const response = await axios.get<ApiResponse[]>("https://api.example.com/data");
        setData(response.data);
      } catch (err) {
        const axiosError = err as AxiosError;
        setError(axiosError.message);
      }
    };

    fetchData();
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return { width, data, error };
};

export default useViewport;
