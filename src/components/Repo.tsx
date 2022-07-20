import React from 'react';
import { GithubContext } from '../context/context';
import styled from 'styled-components';
import { MdBusiness, MdLocationOn, MdLink } from 'react-icons/md';
import axios from 'axios';

interface RepoProps {
	name: string,
	isPrivate: boolean,
	description: any,
	language: string,
	toggle: () => {},
	setContent: (data: string) => {},
}

export const Repo = ({name, isPrivate, description, language, toggle, setContent}: RepoProps) => {
	const { githubUser } = React.useContext(GithubContext);

	const { login }: any = githubUser;

	return (
		<Wrapper>
			<header>
				<div>
					<h4>{name}</h4>
					<h6>{isPrivate ? "Private" : "Public"}</h6>
				</div>
				<div onClick={async () => {
						toggle();
						const response = await axios
							.get(`https://raw.githubusercontent.com/${login}/${name}/master/README.md`)
							.catch((err: object) => console.log(err));
						setContent(response?.data);
					}}>
					ReadMe
				</div>
			</header>
			<p className='desc'>{description}</p>
			<p className='lang'>{language}</p>
		</Wrapper>
	);
};
const Wrapper = styled.article`
	background: var(--clr-white);
	padding: 1.5rem 2rem;
	border-top-right-radius: var(--radius);
	border-bottom-left-radius: var(--radius);
	border-bottom-right-radius: var(--radius);
	position: relative;
	&::before {
		content: 'Repository';
		position: absolute;
		top: 0;
		left: 0;
		transform: translateY(-100%);
		background: var(--clr-white);
		color: var(--clr-grey-5);
		border-top-right-radius: var(--radius);
		border-top-left-radius: var(--radius);
		text-transform: capitalize;
		padding: 0.5rem 1rem 0 1rem;
		letter-spacing: var(--spacing);
		font-size: 1rem;
	}
	header {
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: center;
		column-gap: 1rem;
		margin-bottom: 1rem;
		h4 {
			margin-bottom: 0.25rem;
		}
		p {
			margin-bottom: 0;
		}
		& div:nth-child(2){
			width: 100%;
			display: flex;
			justify-self: flex-end;
			color: var(--clr-primary-5);
			border: 1px solid var(--clr-primary-5);
			padding: 0.25rem 0.75rem;
			border-radius: 1rem;
			text-transform: capitalize;
			letter-spacing: var(--spacing);
			transition: var(--transition);
			cursor: pointer;
			max-width: 100px;
			text-align: center;
			&:hover {
				background: var(--clr-primary-5);
				color: var(--clr-white);
			}
		}
	}
	.desc {
		color: var(--clr-grey-3);
	}
	.lang{
		color: var(--clr-primary-3);
	}
`;