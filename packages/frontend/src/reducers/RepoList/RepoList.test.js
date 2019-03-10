import reducer from './';
import { FETCH_SUCCESS, FETCH_START } from '../../actions';

it('should return the initialState', () => {
  const initialState = {
    loading: true,
    error: null,
    data: [],
    nextPage: 'https://api.github.com/user/repos?type=all&per_page=1',
    isLastPage: false,
  };
  const action = { type: FETCH_START };
  const result = reducer(initialState, action);
  expect(result).toEqual(initialState);
});

it('should append to the data array with FETCH_SUCCESS', () => {
  const action = { type: FETCH_SUCCESS, data: [3, 4] };

  const initialState = {
    loading: true,
    error: null,
    data: [1, 2],
    nextPage: null,
    isLastPage: false,
  };

  const result = reducer(initialState, action);

  const expected = [1, 2, 3, 4];

  expect(result.data).toEqual(expected);
});

it('should set isLastPage to true if nextPage is null', () => {
  const action = {
    type: FETCH_SUCCESS,
    data: [],
    nextPage: null,
    isLastPage: true,
  };

  const initialState = {
    loading: true,
    error: null,
    data: [1, 2],
    nextPage: null,
    isLastPage: false,
  };

  const result = reducer(initialState, action);

  if (result.nextPage == null) {
    expect(result.isLastPage).toEqual(true);
  }
});
