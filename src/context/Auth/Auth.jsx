import { createContext, useEffect, useState } from 'react';

export const authContext = createContext(null);

export default function AuthContextProvider(props) {
  const [userToken, setUserToken] = useState(null);
  const [userDisplayName, setUserDisplayName] = useState('');

  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    const savedDisplayName = localStorage.getItem('userDisplayName');

    if (savedToken && savedToken !== 'xxxxx') {
      setUserToken(savedToken);
    } else if (savedToken === 'xxxxx') {
      localStorage.removeItem('authToken');
    }

    if (savedDisplayName) {
      setUserDisplayName(savedDisplayName);
    }
  }, []);

  return (
    <authContext.Provider
      value={{
        userToken,
        setUserToken,
        userDisplayName,
        setUserDisplayName,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
}
