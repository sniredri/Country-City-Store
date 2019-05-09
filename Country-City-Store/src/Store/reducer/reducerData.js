import * as actionType from "../action/actionType"
import { updateObject } from './utilReducer'
//object in javacsript are always working as refenreces.
const initialState = {
    countries: [],
    cities: [],
    companies: [],
    marker: [],
    generalData: [],
    isLoading: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.IMPORT_DB: {
            return updateObject(state, { generalData: action.payload })
        }
        case actionType.SORT_BY_COUNTRIES: {
            return updateObject(state, { countries: action.payload })
        }
        case actionType.SORT_BY_CITIES: {
            return updateObject(state, { cities: action.payload })
        }
        case actionType.SORT_BY_COMPANIES: {
            return updateObject(state, {  companies: action.payload })
        }
        default:
            return state;
    }

}

export default reducer