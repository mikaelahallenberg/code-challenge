export const FETCH_START = '@fetch/start';
export const FETCH_ERROR = '@fetch/error';
export const FETCH_SUCCESS = '@fetch/success';

const parse = require('parse-link-header');

const fetchStart = (username, token) => ({
  type: FETCH_START,
  username,
  token,
});

const fetchError = error => ({
  type: FETCH_ERROR,
  error,
});

const fetchSuccess = (nextPage, isLastPage, data) => ({
  type: FETCH_SUCCESS,
  nextPage,
  isLastPage,
  data,
});

export const fetchUserRepos = token => async (dispatch, getState) => {
  dispatch(fetchStart());
  const state = getState().RepoList;

  return fetch(state.nextPage, {
    headers: {
      Authorization: `token ${token}`,
    },
  }).then(res => {
    if (res.status !== 200) {
      console.log(`There was a problem, code: ${res.status}`);
      return;
    }
    const linkHeader = res.headers.get('link');
    const parsed = parse(linkHeader);
    const next = parsed.next != null ? parsed.next.url : '';
    res.json().then(
      data =>
        dispatch(
          fetchSuccess(
            next,
            next === '',
            data.map(item => ({
              id: item.id,
              name: item.name,
              html_url: item.html_url,
              language: item.language,
              description: item.description,
            })),
          ),
        ),
      error => dispatch(fetchError(error)),
    );
  });
};
