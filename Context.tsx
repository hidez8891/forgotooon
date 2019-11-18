import React from 'react';
import { useTodo, Store } from './Store';
import { useRepositry } from './Repository';

interface AppStore {
    todo: Store;
}

const Context = React.createContext<AppStore>({} as any);
const { Provider } = Context;

export const StoreProvider: React.FC = ({ children }) => {
    const todo = useTodo(useRepositry());
    return <Provider value={{ todo }}>{children}</Provider>;
};

export function useContext() {
    return React.useContext(Context);
}
