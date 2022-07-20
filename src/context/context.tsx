import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import { AxiosResponse } from 'axios';

const axios = require('axios').default;
axios.defaults.baseURL = 'https://api.github.com';

// type childrenProps={
// 	children: React.ReactNode;
// 	githubUser: {},
// 	respos: {},
// 	followers: {},
// 	request: {},
// 	searchGithubUser: () => null,
// }

const GithubContext = React.createContext<any>(null);

const GithubProvider:React.FC<{}> = ({ children } : { children?: React.ReactNode}) => {
	const [githubUser, setGithubUser] = useState(mockUser);
	const [repos, setRepos] = useState(mockRepos);
	const [followers, setFollowers] = useState(mockFollowers);
	//request loading
	const [requests, setRequests] = useState(0);

	const searchGithubUser = async (user: string) => {
		const response = await axios
			.get(`users/${user}`)
			.catch((err: object) => console.log(err));

		console.log(response);
		if (response) {
			setGithubUser(response.data);
			console.log(response);
			const { followers_url, login } = response.data;

			await Promise.allSettled([
				axios.get(`/users/${login}/repos`),
				axios.get(`${followers_url}?per_page=100`),
			])
				.then((results) => {
					const [repos, followers] = results;
					const fulfilledStatus = 'fulfilled';

					if (repos.status === fulfilledStatus) {
						setRepos(repos.value.data);
					}
					if (followers.status === fulfilledStatus) {
						setFollowers(followers.value.data);
					}
				})
				.catch((err) => console.log(err));
		} else {
			getRemainingRequests();
			console.log('no such user');
		}
	};
	//nfn named function
	const getRemainingRequests = () => {
		axios
			.get('/rate_limit')
			.then((res: AxiosResponse) => {
				console.log(res);
				let { remaining } = res?.data?.data.rate;
				setRequests(remaining);
				console.log('getRemainingRequests', remaining);
				if (remaining === 0) {
					console.log("is error, sorry")
				}
			})
			.catch((error: object) => {
				console.log(error);
			});
	};

	//add empty dependency array hence,
	// useEffect will run only once after the rendering of the page.
	// It will not re-run
	useEffect(() => getRemainingRequests());
	return (
		<GithubContext.Provider
			value={{githubUser, repos, followers, requests, searchGithubUser}}
		>
			{children}
		</GithubContext.Provider>
	);
};

export { GithubProvider, GithubContext };
