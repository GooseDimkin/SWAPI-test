import style from './HeroItem.module.css';
import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';

import {setVehiclesAC, setHomeworldAC, setFilmAC} from './../../../Redux/reducers/heroesReducer';

import axios from 'axios';
import {connect} from 'react-redux';

function HeroItem(props) {
    const [searchTerm, setSearchTerm] = useState('');
    return(
        <div>
            <div className={style.section}>
                <input type='text' placeholder='Search...' onChange={event => {setSearchTerm(event.target.value)}} />
                {props.heroes.filter((val) => {
                    if(searchTerm == '') {
                        return val
                    } else if(val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return val
                    }
                }).map((val, key) => {
                    let homeworldRequests = props.heroes.map(u => u.homeworld);
                    let vehiclesRequests = props.heroes.map(u => u.vehicles);
                    let filmsRequests = props.heroes.map(u => u.films);

                    async function getFilmData(request, key) { 
                        const promises = request[key].map(element => {
                          return axios
                            .get(element)
                            .then(({ data }) => {
                              return data;
                            });
                        });
                    
                        const elements = await Promise.all(promises)
                        .then(values => {
                            return values;
                        })

                        props.setFilmAC(elements.flat());
                    };

                    async function getHomeworldData(request, key) { 
                        let trueRequest = [request[key]];
                        const promises = trueRequest.map(element => {
                          return axios
                            .get(element)
                            .then(({ data }) => {
                              return data;
                            });
                        });
                    
                        const elements = await Promise.all(promises)
                        .then(values => {
                            return values;
                        })

                        props.setHomeworldAC(elements.flat());
                    };

                    async function getVehicleData(request, key) {  
                        const promises = request[key].map(element => {
                          return axios
                            .get(element)
                            .then(({ data }) => {
                              return data;
                            });
                        });
                    
                        const elements = await Promise.all(promises)
                        .then(values => {
                            return values;
                        })

                        props.setVehiclesAC(elements.flat());
                    };

                    function makeRequests(key) {
                        getVehicleData(vehiclesRequests, key);
                        getHomeworldData(homeworldRequests, key);
                        getFilmData(filmsRequests, key)
                    }

                    return(
                        <NavLink className={style.navlink} to={'/profile/' + val.url.split('/')[5]}>
                            <div onClick={() => makeRequests(key)} className={style.userElement} key={key}>
                                <div className={style.name}>{val.name}</div>
                                <div className={style.gender}>{val.gender}</div>
                            </div>
                        </NavLink>
                    ); 
                })}
            </div>
        </div>
    );
}

class HeroItemAPI extends React.Component {
    render() {
        return <HeroItem heroes={this.props.heroes}
                         setVehiclesAC={this.props.setVehiclesAC} 
                         setHomeworldAC={this.props.setHomeworldAC}
                         setFilmAC={this.props.setFilmAC}
                />
    }
}

const mapStateToProps = (state) => {
    return {
        heroes: state.heroesData.people
    }
}

let HeroItemContainer = connect(mapStateToProps, {setVehiclesAC, setHomeworldAC, setFilmAC})(HeroItemAPI);

export default HeroItemContainer;