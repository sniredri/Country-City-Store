import * as actionType from "./actionType"
import reducerData from '../reducer/reducerData'
// Example
// export const saveData = (data) => {
// return {
//     type: actionType.SAVE_DATA,
//     payload: data
// }
// }

export const DBimport = (DataBase) => {
    return {
        type: actionType.IMPORT_DB,
        payload: DataBase
    }
}

export const sortByParams = (Type, data) => {
    let sortedArray = []
    for (let i = 0; i < data.length; i++) {
        //this statement to handle the push if countries already exist in sortedCountries
        if (!sortedArray.filter(index => index[Type] === data[i]).length) {
            //push the object with country and companies count inside it to sortedCountriesy
            sortedArray.push({ [Type]: data[i], companiesCount: data.filter(index => index === data[i]).length })
        }
    }
    console.log(sortedArray)
    //sort in decreasing list the countries by params
    sortedArray = sortedArray.sort((a, b) => {
        //sort by comapnies count
        if (b.companiesCount < a.companiesCount) return -1
        if (b.companiesCount > a.companiesCount) return 1
        //sort by alphabetical if the count is even
        if (a[Type] < b[Type]) return -1
        if (a[Type] > b[Type]) return 1
    })
    return sortedArray
}

export const sortByCountries = () => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            let data = getState().reducerData.generalData.Customers
            console.log(data)
            let countries = []
            data.map(index => {
                countries.push(index.Country)
            })
            console.log(countries)
            let sortedCountries = sortByParams("Country", countries)
            dispatch({
                type: actionType.SORT_BY_COUNTRIES,
                payload: sortedCountries
            })
            resolve("good")
            reject("bad")
        })
    }
}

export const sortByCities = (Country) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            let data = getState().reducerData.generalData.Customers.filter(index => index.Country === Country)
            let cities = []
            data.map(index => {
                cities.push(index.City)
            })
            let sortedCities = sortByParams("City", cities)
            console.log(sortedCities)
            dispatch({
                type: actionType.SORT_BY_CITIES,
                payload: sortedCities
            })
            resolve("good")
            reject("bad")
        })
    }
}

export const getCompanyName = (City) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            let data = getState().reducerData.generalData.Customers.filter(index => index.City === City)
            let companies = []
            data.map(index => {
                companies.push({
                    Company: index.CompanyName,
                    Address: index.Address,
                    City: index.City,
                    Country: index.Country
                })
            })
            companies = companies.sort((a, b) => a - b)
            dispatch({
                type: actionType.SORT_BY_COMPANIES,
                payload: companies
            })
            resolve("good")
            reject("bad")
        })
    }
}