import { useDispatch, useSelector } from 'react-redux';

import { useEffect } from 'react';
import { getCurrentUserThunk } from '../stores/auth.js';

const AuthLoader = ({ children }) => {
    const { isAuthenticating } = useSelector(state => state.authentication);
    const dispatch = useDispatch();
    useEffect(() => {
        const verifyAuth = async () => {
            await dispatch(getCurrentUserThunk()).unwrap();
        };

        verifyAuth();
    }, []);

    if (isAuthenticating) {
        return <div className='w-full h-svh bg-base-100 dark:bg-base-300 flex items-center justify-center'>
            <p className={`select-none text-6xl`}>Welcome To PlaySync</p>
        </div>;
    }

    return children;
};

export default AuthLoader;
