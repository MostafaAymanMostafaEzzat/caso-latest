import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function useAuthOnClient() {
  const [auth, setAuth] = useState<null | { userId: string; role: string , image:string , name:string }>(
    null
  );
  const x = useRef(true);
  useEffect(() => {
    async function authenticate() {
      try {
        const user = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/authenticateUser`
        );
        if (JSON.stringify(user.data.user) !== JSON.stringify(auth)) {
          setAuth(user.data.user);
          x.current = false;
        }
      } catch (error) {
        if (auth !== null) {
          setAuth(null); // Clear state if there's an error
          x.current = false;
        }
      }
    }
    if (x.current) {
      authenticate();
    } else {
      x.current = true;
    }
  });

  return auth;
}
