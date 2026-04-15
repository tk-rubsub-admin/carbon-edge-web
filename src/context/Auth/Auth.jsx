import { createContext, useEffect, useState } from 'react';

export const authContext = createContext(null);

export default function AuthContextProvider(props) {
  const [userToken, setUserToken] = useState(null);
  const [userDisplayName, setUserDisplayName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState('guest');

  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    const savedDisplayName = localStorage.getItem('userDisplayName');
    const savedEmail = localStorage.getItem('userEmail');
    const savedRole = localStorage.getItem('userRole');

    if (savedToken && savedToken !== 'xxxxx') {
      setUserToken(savedToken);
    } else if (savedToken === 'xxxxx') {
      localStorage.removeItem('authToken');
    }

    if (savedDisplayName) {
      setUserDisplayName(savedDisplayName);
    }

    if (savedEmail) {
      setUserEmail(savedEmail);
    }

    if (savedRole) {
      setUserRole(savedRole);
    }
  }, []);

  return (
    <authContext.Provider
      value={{
        userToken,
        setUserToken,
        userDisplayName,
        setUserDisplayName,
        userEmail,
        setUserEmail,
        userRole,
        setUserRole,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
}
