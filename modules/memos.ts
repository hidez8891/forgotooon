import { Action } from "redux";
import { v1 as uuid } from "uuid";

//--------------------------------
// actions
//--------------------------------
export enum ActionTypes {
  ADD_MEMO = "memos/ADD",
  DELETE_MEMO = "memos/DELETE",
  SELECT_MEMO = "memos/SELECT",
  UPDATE_MEMO = "memos/UPDATE"
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
export const addMemo = (text: string): AddMemoAction => ({
  type: ActionTypes.ADD_MEMO,
  payload: {
    id: uuid(),
    text
  }
});

// delete memo action
interface DeleteMemoAction extends Action {
  type: ActionTypes.DELETE_MEMO;
  payload: {
    id: string;
  };
}
export const deleteMemo = (id: string): DeleteMemoAction => ({
  type: ActionTypes.DELETE_MEMO,
  payload: { id }
});

// select memo action
interface SelectMemoAction extends Action {
  type: ActionTypes.SELECT_MEMO;
  payload: {
    id: string;
  };
}
export const selectMemo = (id: string): SelectMemoAction => ({
  type: ActionTypes.SELECT_MEMO,
  payload: { id }
});

// select memo action
interface UpdateMemoAction extends Action {
  type: ActionTypes.UPDATE_MEMO;
  payload: {
    id: string;
    text: string;
  };
}
export const updateMemo = (id: string, text: string): UpdateMemoAction => ({
  type: ActionTypes.UPDATE_MEMO,
  payload: { id, text }
});

// memo action types
export type MemoActions =
  | AddMemoAction
  | DeleteMemoAction
  | SelectMemoAction
  | UpdateMemoAction;

//--------------------------------
// reducer
//--------------------------------

// memo states

export interface MemoState {
  select: string;
  memos: {
    id: string;
    text: string;
  }[];
}
export const INITIAL_STATE: MemoState = {
  select: "",
  memos: []
};

// memo reducer
export const memoReducer = (
  state: MemoState = INITIAL_STATE,
  action: MemoActions
): MemoState => {
  switch (action.type) {
    case ActionTypes.ADD_MEMO:
      return {
        ...state,
        memos: [...state.memos, action.payload]
      };

    case ActionTypes.DELETE_MEMO:
      return {
        ...state,
        memos: state.memos.filter(v => v.id !== action.payload.id)
      };

    case ActionTypes.SELECT_MEMO:
      return {
        ...state,
        select: action.payload.id
      };

    case ActionTypes.UPDATE_MEMO:
      return {
        ...state,
        memos: state.memos.map(
          v => (v.id !== action.payload.id ? v : action.payload)
        )
      };

    default:
      return state;
  }
};
