import { createContext } from 'react';

const RegistrationContext = createContext({});

export default RegistrationContext;

export const { Provider, Consumer } = RegistrationContext;
