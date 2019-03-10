import { FETCH_START, FETCH_ERROR, FETCH_SUCCESS } from '../../actions';

const initialState = {
  loading: true,
  error: null,
  data: [],
  nextPage: 'https://api.github.com/user/repos?type=all&per_page=1',
  isLastPage: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case FETCH_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
        nextPage: action.nextPage,
        isLastPage: action.isLastPage,
        data: state.data.concat(action.data),
      };
    }
    default:
      return state;
  }
};
