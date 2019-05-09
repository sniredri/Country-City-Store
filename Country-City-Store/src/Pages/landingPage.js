import React, { Component } from 'react'
import { connect } from 'react-redux'
import "../CSS/landingPage.css"
import * as action from '../Store/action/action'
import DataBase from '../DataBase/clients.json'
import Table from '../Components/Table'
import Geocode from "react-geocode";
import Map from '../Components/GoogleMap'
import { relative } from 'path';
export class landingPage extends Component {
    state = {
        activeCountry: "",
        activeCity: "",
        activeCompany: "",
        activeLocation: "",
    }
    componentDidMount() {
        this.init()
    }

    init = () => {
        this.props.DBimport(DataBase)
        this.props.sortByCountries().then(res => {
            this.props.sortByCities(this.props.countries[0].Country).then(res => {
                this.props.getCompanyName(this.props.cities[0].City).then(res => {
                    this.setState({ activeCountry: this.props.countries[0].Country, activeCity: this.props.cities[0].City, activeCompany: this.props.companies[0].Company }, () => {
                        this.onCompanyHandler(this.props.companies[0])
                    })
                })
            })
        })
    }

    onCountryHandler = (Country) => {
        this.props.sortByCities(Country).then(res => {
            this.setState({ activeCountry: Country })
            this.props.getCompanyName(this.props.cities[0].City).then(res => {
                this.setState({ activeCity: this.props.cities[0].City, activeCompany: this.props.companies[0].Company }, () => {
                    this.onCompanyHandler(this.props.companies[0])
                })
            })
        })
    }

    onCityHandler = (City) => {
        this.props.getCompanyName(City).then(res => {
            this.setState({ activeCity: City, activeCompany: this.props.companies[0].Company }, () => {
                this.onCompanyHandler(this.props.companies[0])
            })
        })
    }

    onCompanyHandler = (address) => {
        this.setState({ activeCompany: address.Company })
        Geocode.setApiKey("AIzaSyC6BlTA49uBTk5lIpzKBDFkFj2ATxqrSAY");
        Geocode.fromAddress(address.City + ", " + address.Address).then(
            response => {
                const { lat, lng } = response.results[0].geometry.location;
                this.setState({
                    activeLocation: {
                        lat: lat,
                        lng: lng
                    }
                }, () => {
                    console.log(this.state);
                })
            },
            error => {
                console.error(error);
            }
        );
    }



    render() {
        let countries = this.props.countries.map(index => {
            return (
                <div
                    className={this.state.activeCountry === index.Country ? "activeRow Row" : "Row"}
                    name={index.Country}
                    onClick={() => { this.onCountryHandler(index.Country) }}
                >
                    {index.Country}
                </div>
            )
        })

        let cities = this.props.cities.map(index => {
            return (
                <div
                    className={this.state.activeCity === index.City ? "activeRow Row" : "Row"}
                    name={index.City}
                    onClick={() => { this.onCityHandler(index.City) }}
                >
                    {index.City}
                </div>
            )
        })

        let companies = this.props.companies.map(index => {
            return (
                <div
                    className={this.state.activeCompany === index.Company ? "activeRow Row" : "Row"}
                    name={index.Company}
                    onClick={() => { this.onCompanyHandler(index) }}
                >
                    {index.Company}
                </div>
            )
        })

        return (
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Table title={"Countries"} contect={countries} />
                <Table title={"Cities"} contect={cities} />
                <Table title={"Companies"} contect={companies} />
                <div className="mapContainer">
                    <h2 style={{ borderBottom: "0.5px solid black" }}>Map</h2>
                    <div style={{marginTop: "-2.85%"}}>
                        <Map position={this.state.activeLocation} />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        // data: state.reducerData.data,
        countries: state.reducerData.countries,
        cities: state.reducerData.cities,
        companies: state.reducerData.companies,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        DBimport: (data) => dispatch(action.DBimport(data)),
        sortByCountries: () => dispatch(action.sortByCountries()),
        sortByCities: (data) => dispatch(action.sortByCities(data)),
        getCompanyName: (data) => dispatch(action.getCompanyName(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(landingPage)
