import React, {createContext, useState} from 'react';

export const UserContext = createContext()

export const UserProvider = (props) =>{
    const [people, setPeople] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    return(
        <UserContext.Provider value={{people, setPeople, loading, setLoading, isError, setIsError}}>
          {props.children } 
        </UserContext.Provider>
    )
}