
import { auth, provider, signInWithPopup } from './index';

export const loginWithGoogle = async () =>  {
    try {
        const result = await signInWithPopup(auth, provider);
        const user =  result.user.providerData
        return user;
    } catch (error) {
        console.error('Lỗi đăng nhập:', error);
    }
}


