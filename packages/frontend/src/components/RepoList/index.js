import React from 'react';
import styled from 'styled-components';
import { number, string, shape, arrayOf } from 'prop-types';

const RepoListWrapper = styled.div`
  margin-top: 3em;
`;

const LanguageSpan = styled.span`
  padding-left: 0.5em;
`;

const LanguageColors = styled.div`
  display: block;
  height: 1.5em;
  width: 1.5em;
  border-radius: 50%;
  border: 0;
  background-color: ${({ Language }) =>
    (Language === 'JavaScript' && '#f1e05a') ||
    (Language === 'HTML' && '#e34c26') ||
    (Language === 'CSS' && '#563d7c') ||
    (Language !== 'JavaScript' || 'TypeScript' || 'HTML' || 'CSS'
      ? 'other' && '#949494'
      : null)};
`;
const LanguageWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const RepoList = props => {
  const { data } = props;
  return [
    <h1 key="RepoList">Your repos</h1>,
    data.map(item => (
      <RepoListWrapper key={item.id}>
        <a href={item.html_url} target="_blank" rel="noopener noreferrer">
          <h2>{item.name}</h2>
        </a>
        <p>{item.description}</p>
        {item.language ? (
          <LanguageWrapper>
            <LanguageColors Language={item.language} />
            <LanguageSpan>{item.language}</LanguageSpan>
          </LanguageWrapper>
        ) : null}
      </RepoListWrapper>
    )),
  ];
};

RepoList.propTypes = {
  data: arrayOf(
    shape({
      id: number,
      name: string,
      html_url: string,
      language: string,
      description: string,
    }),
  ).isRequired,
};

export default RepoList;
