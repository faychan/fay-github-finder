import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { Repo } from './Repo';

export const Repos = ({toggle, setContent} : any) => {
	const { repos } = React.useContext(GithubContext);

	interface typeRepos {
		name: string,
		private: boolean,
		description: string | null,
		language: string,
	}
   
	return (
		<section className='section'>
			<Wrapper className='section-center'>
				{repos.map( (rp: typeRepos) => {
					const {name, description, private: isPrivate, language} = rp;
					return (
						<Repo name={name} isPrivate={isPrivate} description={description} language={language} toggle={toggle} setContent={setContent}/>
					)
				})}
			</Wrapper>
		</section>
	);
};

const Wrapper = styled.div`
	padding-top: 2rem;
	display: grid;
	gap: 3rem 2rem;
	@media (min-width: 992px) {
		grid-template-columns: 1fr 1fr;
	}
	/* align-items: start; */
`;
