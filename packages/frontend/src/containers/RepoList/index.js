import React, { Component } from 'react';
import { number, string, func, shape, bool, arrayOf } from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { fetchUserRepos } from '../../actions';
import RepoList from '../../components/RepoList';
import LoadingSpinner from '../../components/LoadingSpinner';

const Container = styled.section`
  display: flex;
  justify-content: center;
  padding: 1em;
`;

const Wrapper = styled.div`
  max-width: 37.5em;
  margin: 0 auto;
`;

const Button = styled.button`
  margin-top: 3em;
  padding: 0.8em 2em;
  border-radius: 20px;
  border: 2px solid #519129;
  font-size: 0.8em;
  text-transform: uppercase;
  background-color: #fff;
  color: #519129;
`;
class RepoListContainer extends Component {
  componentDidMount() {
    this.props.dispatch(fetchUserRepos(this.props.token));
  }

  fetchMore() {
    this.props.dispatch(fetchUserRepos(this.props.token, this.props.nextPage));
  }

  render() {
    const { loading, error, data, token, isLastPage, ...rest } = this.props;
    if (error) {
      return <div>{error}</div>;
    }

    return [
      loading && <LoadingSpinner key="loading" />,
      <Container key="RepoListContainer">
        <Wrapper>
          {data !== null && data.length > 0 && (
            <RepoList
              data={data}
              fetchMore={this.fetchMore}
              {...rest}
              key="RepoList"
            />
          )}
          {!loading && !isLastPage ? (
            <Button onClick={e => this.fetchMore(e)}>Load more</Button>
          ) : null}
        </Wrapper>
      </Container>,
    ];
  }
}

RepoListContainer.propTypes = {
  dispatch: func.isRequired,
  loading: bool.isRequired,
  isLastPage: bool.isRequired,
  nextPage: string.isRequired,
  error: string,
  data: arrayOf(
    shape({
      id: number,
      name: string,
      html_url: string,
      language: string,
      description: string,
    }),
  ),
};

RepoListContainer.defaultProps = {
  error: null,
  data: null,
};

const mapStateToProps = state => ({
  loading: state.RepoList.loading,
  data: state.RepoList.data,
  isLastPage: state.RepoList.isLastPage,
  nextPage: state.RepoList.nextPage,
});

export default connect(mapStateToProps)(RepoListContainer);
