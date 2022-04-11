import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";
import { Octokit } from "@octokit/core";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  const searchUsers = async (text) => {
    const octokit = new Octokit({ auth: `${GITHUB_TOKEN}` });
    const params = new URLSearchParams({
      q: text,
    });

    const response = await octokit.request(
      `${GITHUB_URL}/search/users?${params}`,
      {
        org: "octokit",
        type: "private",
      }
    );

    const { data } = response;
    const { items } = data;

    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  };

  // testing purposes
  // const searchUsers = async (text) => {
  //   setLoading();
  //   const params = new URLSearchParams({
  //     q: text,
  //   });
  //   const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
  //     headers: {
  //       Authorization: `token ${GITHUB_TOKEN}`,
  //     },
  //   });
  //   const { items } = await response.json();
  //   dispatch({
  //     type: "GET_USERS",
  //     payload: items,
  //   });
  // };

  // Get a single user
  // const getUser = async (login) => {
  //   setLoading();

  //   const response = await fetch(`${GITHUB_URL}/user/${login}`, {
  //     headers: {
  //       Authorization: `token ${GITHUB_TOKEN}`,
  //     },
  //   });
  //   const data = await response.json();
  //   console.log(data);
  //   if (response === 404) {
  //     window.location = "/notfound";
  //   } else {
  //     console.log(data);
  //     dispatch({
  //       type: "GET_USER",
  //       payload: data,
  //     });
  //   }
  // };
  //get Single User
  const getUser = async (login) => {
    const octokit = new Octokit({ auth: `${GITHUB_TOKEN}` });

    const response = await octokit.request(`${GITHUB_URL}/users/${login}`, {
      org: "octokit",
      type: "private",
    });

    const { data } = response;

    dispatch({
      type: "GET_USER",
      payload: data,
    });
  };

  //Get Repos

  const getUserRepos = async (login) => {
    const octokit = new Octokit({ auth: `${GITHUB_TOKEN}` });
    const params = new URLSearchParams({
      sort: "created",
      per_page: 10,
    });

    const response = await octokit.request(
      `${GITHUB_URL}/users/${login}/repos?${params}`,
      {
        org: "octokit",
        type: "private",
      }
    );
    const result = response;
    const { data } = result;

    dispatch({
      type: "GET_REPOS",
      payload: data,
    });
  };

  const clearUsers = () => dispatch({ type: "CLEAR_USERS" });

  //   try out

  // const tryData = async (text) => {
  //   const response = await fetch(`${GITHUB_URL}/search/users?q=${text}`, {
  //     headers: {
  //       Authorization: `token ${GITHUB_TOKEN}`,
  //     },
  //   });
  //   const data = response.json();
  //   console.log(data);
  // };
  // tryData();

  const setLoading = () => dispatch({ type: "SET_LOADING" });
  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        user: state.user,
        repos: state.repos,
        getUserRepos,
        searchUsers,
        clearUsers,
        getUser,
        setLoading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
