import { combineReducers } from 'redux';

const ACCESS = 'access';

export function updateTokens(token) {

    console.log(token);
  return {
    type: ACCESS,
    token,
  }
}

const defaultToken = {
    access_token: '',
    expires_in: '',
    refresh_token: '',
    scope: '',
    token_type: ''
  };

function tokens(state=defaultToken, action) {
  switch (action.type) {
    case ACCESS:
        console.log('ACCESSSSS', action);
      return {
            access_token: action.token.access_token,
            expires_in: action.token.expires_in,
            refresh_token: action.token.refresh_token,
            scope: action.token.scope,
            token_type: action.token.token_type
        };
    default:
      return state;
  }
}

const tokenStore = combineReducers({
    tokens,
  });
  
  export default tokenStore;