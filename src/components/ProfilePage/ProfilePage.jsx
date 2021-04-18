import style from './ProfilePage.module.css';
import React from 'react';
import Preloader from './../common/Preloader/Preloader';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {getHeroDataThunkCreator, showLoadingAC} from './../../Redux/reducers/profileReducer';
import {NavLink, Redirect} from 'react-router-dom';

function ProfilePage(props) {
    if(props.isLogginedIn === false) return <Redirect to='/login'/>

    return(
        <div className={style.section}>
            <div className={style.button}><NavLink className={style.nav} to='/login'>Back</NavLink></div>
                {
                    props.profileData === null ? <Preloader/> :
                    <div className={style.main_section}>
                        <div className={style.info_section}>
                            <div>
                                <div className={style.info}><span className={style.label}>Name:</span><span>{props.profileData.name}</span></div>
                                <div className={style.info}><span className={style.label}>Height:</span><span>{props.profileData.height}</span></div>
                                <div className={style.info}><span className={style.label}>Mass:</span><span>{props.profileData.mass}</span></div>
                                <div className={style.info}><span className={style.label}>Hair color:</span><span>{props.profileData.hair_color}</span></div>
                                <div className={style.info}><span className={style.label}>Skin color:</span><span>{props.profileData.skin_color}</span></div>
                                <div className={style.info}><span className={style.label}>Eye color:</span><span>{props.profileData.eye_color}</span></div>
                                <div className={style.info}><span className={style.label}>Birth year:</span><span>{props.profileData.birth_year}</span></div>
                                <div className={style.info}><span className={style.label}>Gender:</span><span>{props.profileData.gender}</span></div>
                                <div className={style.info}><span className={style.label}>Homeworld:</span><span>{!props.homeworldsNames ? 'none' : props.homeworldsNames.map(v => v.name)}</span></div>
                            </div>
                            <div className={style.detail_info}>
                                <div className={style.d_info}><span className={style.label}>Vehicles names:</span><span>{!props.vehiclesNames ? 'none' : props.vehiclesNames.map(v => <div>{v.name};</div>)}</span></div>
                                <div className={style.d_info}><span className={style.label}>Vehicles models:</span><span>{!props.vehiclesNames ? 'none' : props.vehiclesNames.map(v => <div>{v.model};</div>)}</span></div>
                                <div className={style.d_info}><span className={style.label}>Films:</span><span>{!props.filmTitles ? 'none' : props.filmTitles.map(v => <div>{v.title};</div>)}</span></div>
                            </div>
                        </div>
                    </div>
                }
        </div>
    );
}

class ProfilePageAPI extends React.Component {
    componentDidMount() {
        let heroId = this.props.match.params.heroID;
        this.props.getHeroDataThunkCreator(heroId);
    }

    render() {
        return ( 
            <div>
                {this.props.showLoading ? <Preloader /> : 
                <ProfilePage 
                    isLogginedIn={this.props.isLogginedIn} 
                    profileData={this.props.profileData}
                    homeworldsNames={this.props.homeworldsNames}
                    vehiclesNames={this.props.vehiclesNames}
                    filmTitles={this.props.filmTitles}
                />} 
            </div>)
    }
}

let withProfilepageContainer = withRouter(ProfilePageAPI);

let mapStateToProps = (state) => {
    return {
        profileData: state.profileData.anotherProfileData,
        showLoading: state.profileData.showLoading,
        isLogginedIn: state.facebookData.isLogginedIn,
        heroes: state.heroesData.people,
        homeworldsNames: state.heroesData.homeworldsNames,
        vehiclesNames: state.heroesData.vehiclesNames,
        filmTitles: state.heroesData.filmTitles
    }
}

let ProfilePageContainer = connect(mapStateToProps, {getHeroDataThunkCreator, showLoadingAC})(withProfilepageContainer);

export default ProfilePageContainer;