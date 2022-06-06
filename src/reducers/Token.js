const initialState = { 
    access_token: '',
    expires_in: '',
    refresh_token: '',
    scope: '',
    token_type: ''
};

const reducer = (state,action) => {
    console.log(state,action);
    switch(action.type){
        case 'access': 
            console.log('access switch');
            return {
                ...state,
                access_token: action.access_token,
                expires_in: action.expires_in,
                refresh_token: action.refresh_token,
                scope: action.scope,
                token_type: action.token_type
            };
    }
};

export default reducer;