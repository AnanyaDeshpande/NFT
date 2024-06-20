import React, { createContext, useState } from 'react';

export const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [username, setUsername] = useState('');

  return (
    <AccountContext.Provider value={{ selectedAccount, username, setSelectedAccount, setUsername }}>
      {children}
    </AccountContext.Provider>
  );
};
