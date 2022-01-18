export enum ActionType {
    SEARCH = "search"
}

export interface actionSearch {
    type: ActionType.SEARCH
    payload: string
}

export type Action = actionSearch
export type State = {
    search: string
}