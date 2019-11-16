import { AsyncStorage } from 'react-native';
import Storage from 'react-native-storage';

export interface Repositry {
    load<T = any>(params: { key: string }): Promise<T>;
    save(params: { key: string; data: any }): Promise<void>;
}

export function useRepositry(): Repositry {
    const storage = new Storage({
        storageBackend: AsyncStorage
    });
    return storage;
}
