import style from './HeroItem.module.css';
import React, {useState} from 'react';
import Preloader from '../../common/Preloader/Preloader';
import {NavLink} from 'react-router-dom';

import {setHomeworldThunkCreator} from './../../../Redux/reducers/heroesReducer';
import {connect} from 'react-redux';

function HeroItem(props) {
    const [searchTerm, setSearchTerm] = useState('')
    return(
        <div>
            {
                props.isLoading ? <Preloader/> : 
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
                        return(
                            <NavLink className={style.navlink} to={'/profile/' + val.url.split('/')[5]}>
                                <div onClick={() => props.setHomeworldThunkCreator(homeworldRequests[key])} className={style.userElement} key={key}>
                                    <div className={style.name}>{val.name}</div>
                                    <div className={style.gender}>{val.gender}</div>
                                    <div className={style.homeworld}>{val.homeworld} - [does not work correctly]</div>
                                </div>
                            </NavLink>
                        ); 
                    })}
                </div>
            }
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        heroes: state.heroesData.people,
        isLoading: state.heroesData.isLoading,
        homeworldNames: state.heroesData.homeworldNames
    }
}

let HeroItemContainer = connect(mapStateToProps, {setHomeworldThunkCreator})(HeroItem);

export default HeroItemContainer;