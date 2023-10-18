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
      data: response
    } = useFetch<Post[]>(`${process.env.REACT_APP__API_URL}/auth`, options);
    

    useEffect(() => {
      if (postData) {
        setOptions({
          method: 'post',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(postData)
        });
      }
    }, [postData]);

  return {
    response,
    setPostData
  };
  }
}

export default useAuth;