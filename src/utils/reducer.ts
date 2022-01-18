import { Action, ActionType, State } from "./type";

const initialState = {
  search: "",
};

export const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case ActionType.SEARCH:
      return {
        ...state,
        search: action.payload,
      };
    default:
      return state;
  }
};

export type RootState = ReturnType<typeof reducer>
