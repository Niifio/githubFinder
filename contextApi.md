# Context Api

1. Create a reducer

---

const githubReducer = (state, action) => {
switch (action.type) {
case "GET_USERS":
return {
...state,
users: action.payload,
loading: false,
};
default:
return state;
}
};

export default githubReducer;

2. import Context
   --1. import createContex and useReducer from react
   import { createContext, useReducer } from "react";
   --2.import the reducer function
   import githubReducer from "./GithubReducer";

3. create contex
   By defining a variable and set to createContex
   const GithubContext = createContext();

4. you setup a functon which will define the state and extract data and returns the function.Provider
   export const GithubProvider = ({ children }) => {
   return (
   <GithubContext.Provider
   value={{ users: state.users, loading: state.loading, searchUsers, clearUsers }} >
   {children}
   </GithubContext.Provider>
   );
   };

   ---1. set up the initial state object ;

const initialState = {
users: [],
loading: false,
};

--2. use the useReducer hook to connect the reducer function and the initial function. this takes in the state and the dispatch function

const [state, dispatch] = useReducer(githubReducer, initialState);

--3. fetch data by using fetch or axios.
--after getting the data set dispatch to distribute the data
dispatch({
type: "GET_USERS",
payload: items,
});

5.  In the component we use the hook useContext to retrieve functions from the Context Api
    const { users, searchUsers, clearUsers } = useContext(GithubContext);

6.  In Appjs we surround our return with the contextApi
