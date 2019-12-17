const INITIAL_STATE={
    id:0,
    username:'',
    password:'',
    login:false,
    error:'',
    loading:false,
    role:'',
    cart:0
}

export default(state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {...state,...action.payload,login:true,loading:false,error:''}
        case 'LOGIN_LOADING':
            return {...state,loading:true,error:''}
        case 'LOGIN_ERROR':
            return {...state,error:action.payload,loading:false}
        case 'NOTIF_CART':
            return {...state,cart:action.payload}
        default:
            return state;
    }
}