import React, { createContext, useState } from "react";

const DataContext = createContext({} as any);

const DataProvider = ({ children }: any) => {
  const [data, setData] = useState([]);

  const updateData = (newData: any) => {
    setData(newData);
  };

  return (
    <DataContext.Provider value={{ data, updateData }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
