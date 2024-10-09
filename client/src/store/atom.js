import { atom } from 'recoil';

export const mode = atom({
    key: 'mode',
    default: 'light',
});