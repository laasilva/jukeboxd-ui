import { useEffect, useState } from "react";
import { useFetch } from "./useFetch";

interface Post {
  username: string;
  password: string;
}

const useAuth = {
  Authenticate: () => {
    const [postData, setPostData] = useState<any>();

    const [options, setOptions] = useState<any>();

    const {
      data: response,
      error: authError,
      loading: authLoading
    } = useFetch<Post[]>(`${process.env.REACT_APP__API_URL}/auth`, options);
    

    useEffect(() => {
      if (postData) {
        setOptions({
          method: 'post',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        });
      }
    }, [postData]);

    return {
      response,
      setPostData,
      authError,
      authLoading
    };
  },

  UsernameExists: () => {
    const [usern, setUsern] = useState<any>();
    const [options, setOptions] = useState<any>();

    const {
      data: validateResponse,
      error: validateError,
      loading: validateLoading
    } = useFetch(`${process.env.REACT_APP__API_URL}/auth/validate`, options);
    
    useEffect(() => {
      if (usern) {
        const headers = new Headers();

        headers.append("username", usern);
        headers.append("accept", "application/json");
        
        setOptions({
          method: 'GET',
          headers: headers
        });
      }
    }, [usern]);

    useEffect(() => {
      if (validateError) {
        setUsern(null);
        setOptions(null);
      }
    }, [validateError]);

    return {
      usern,
      setUsern,
      validateResponse,
      validateError,
      validateLoading
    }
  }
}

export default useAuth;