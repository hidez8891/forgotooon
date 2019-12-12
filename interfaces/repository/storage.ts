export interface Storage {
    load<T>(params: { key: string }, defaultValue?: T): Promise<T>;
    save(params: { key: string; data: any }): Promise<void>;
}
