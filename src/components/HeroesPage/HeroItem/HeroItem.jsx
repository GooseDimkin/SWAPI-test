import style from './HeroItem.module.css';
import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';

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
                    let check;

                    let makeRequests = () => {
                        if(vehiclesRequests[key].length === 0) {
                            props.checkThunkCreator(0);
                            return props.setHomeworldThunkCreator(homeworldRequests[key])
                        }

                        if(vehiclesRequests[key].length > 1) {
                            props.checkThunkCreator(2);
                            for(let i = 0; i < vehiclesRequests[key].length; ++i) {
                                props.setMoreVehiclesThunkCreator(vehiclesRequests[key], i)
                            }
                            return props.setHomeworldThunkCreator(homeworldRequests[key])
                         }

                        return(
                            props.checkThunkCreator(1),
                            props.setHomeworldThunkCreator(homeworldRequests[key]),
                            props.setOneVehicleThunkCreator(vehiclesRequests[key])
                        );
                    }

                    return(
                        <NavLink className={style.navlink} to={'/profile/' + val.url.split('/')[5]}>
                            <div onClick={makeRequests} className={style.userElement} key={key}>
                                <div className={style.name}>{val.name}</div>
                                <div className={style.gender}>{val.gender}</div>
                                <div className={style.homeworld}>{val.homeworld} - [does not work correctly]</div>
                            </div>
                        </NavLink>
                    ); 
                })}
            </div>
        </div>
    );
}

export default HeroItem;