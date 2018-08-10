import { Action } from 'redux';
import { v1 as uuid } from 'uuid';

//--------------------------------
// actions
//--------------------------------
export enum ActionTypes {
    ADD_MEMO = 'memos/ADD',
    DELETE_MEMO = 'memos/DELETE',
}

//--------------------------------
// action creator
//--------------------------------

// add memo action
interface AddMemoAction extends Action {
    type: ActionTypes.ADD_MEMO;
    payload: {
        id: string;
        text: string;
    };
}
export const addMemo = (text: string): AddMemoAction => (
    {
        type: ActionTypes.ADD_MEMO,
        payload: {
            id: uuid(),
            text,
        },
    }
);

// delete memo action
interface DeleteMemoAction extends Action {
    type: ActionTypes.DELETE_MEMO;
    payload: {
        id: string;
    };
}
export const deleteMemo = (id: string): DeleteMemoAction => (
    {
        type: ActionTypes.DELETE_MEMO,
        payload: { id },
    }
);

// memo action types
export type MemoActions = AddMemoAction | DeleteMemoAction;

//--------------------------------
// reducer
//--------------------------------

// memo states
export interface MemoState {
    memos: {
        id: string,
        text: string,
    }[]
}
export const INITIAL_STATE: MemoState = {
    memos: []
};

// memo reducer
export const memoReducer = (state: MemoState = INITIAL_STATE, action: MemoActions): MemoState => {
    switch (action.type) {
        case ActionTypes.ADD_MEMO:
            return {
                memos: [...state.memos, action.payload]
            };

        case ActionTypes.DELETE_MEMO:
            return {
                memos: state.memos.filter((v) => v.id !== action.payload.id)
            };

        default:
            return state;
    }
};