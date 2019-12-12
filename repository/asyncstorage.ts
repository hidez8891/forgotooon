import { AsyncStorage } from 'react-native';
import Storage from 'react-native-storage';

import { Storage as IStorage } from '../interfaces/repository/storage';

export function useRepositry(): IStorage {
    const storage = new Storage({
        storageBackend: AsyncStorage,
        defaultExpires: null
    });

    function load<T>(params: { key: string }, defaultValue?: T): Promise<T> {
        return storage.load(params).catch(err => {
            console.warn(err);
            if (defaultValue) return defaultValue;
            throw err;
        });
    }

    function save(params: { key: string; data: any }): Promise<void> {
        return storage.save(params).catch(err => {
            console.warn(err);
        });
    }

    return { load, save };
}
