import React, {createContext, useState} from 'react';

export const UserContext = createContext()

export const UserProvider = (props) =>{
   
    return(
        <UserContext.Provider value={}>
          {props.children } 
        </UserContext.Provider>
    )
}