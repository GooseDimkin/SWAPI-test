import style from './ProfilePage.module.css';
import React from 'react';
import Preloader from './../common/Preloader/Preloader';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {getHeroDataThunkCreator, showLoadingAC} from './../../Redux/reducers/profileReducer';
import {NavLink, Redirect} from 'react-router-dom';
import * as axios from 'axios';

function ProfilePage(props) {
    if(props.isLogginedIn === false) return <Redirect to='/login'/>
    return(
        <div className={style.section}>
            <div className={style.button}><NavLink className={style.nav} to='/login'>Back</NavLink></div>
                {
                    props.profileData === null ? <Preloader/> :
                    <div className={style.main_section}>
                        <div className={style.label_section}>
                            <div><span className={style.label}>Name:</span><span className={style.info}>{props.profileData.name}</span></div>
                            <div><span className={style.label}>Height:</span><span className={style.info}>{props.profileData.height}</span></div>
                            <div><span className={style.label}>Mass:</span><span className={style.info}>{props.profileData.mass}</span></div>
                            <div><span className={style.label}>Hair color:</span><span className={style.info}>{props.profileData.hair_color}</span></div>
                            <div><span className={style.label}>Skin color:</span><span className={style.info}>{props.profileData.skin_color}</span></div>
                            <div><span className={style.label}>Eye color:</span><span className={style.info}>{props.profileData.eye_color}</span></div>
                            <div><span className={style.label}>Birth year:</span><span className={style.info}>{props.profileData.birth_year}</span></div>
                            <div><span className={style.label}>Gender:</span><span className={style.info}>{props.profileData.gender}</span></div>
                            <div><span className={style.label}>Homeworld:</span><span className={style.info}>{props.homeworldName}</span></div>
                            <div><span className={style.label}>Vehicle name:</span><span className={style.info}>{props.checkStatus === 0 ? '-' : props.vehiclesName}</span></div>
                            <div><span className={style.label}>Vehicle model:</span><span className={style.info}>{props.checkStatus === 0 ? '-' : props.vehiclesModel}</span></div>
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
                    checkStatus={this.props.checkStatus} 
                    vehiclesName={this.props.vehiclesName} 
                    vehiclesModel={this.props.vehiclesModel}
                    homeworldName={this.props.homeworldName} 
                    isLogginedIn={this.props.isLogginedIn} 
                    profileData={this.props.profileData}
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
        homeworldName: state.heroesData.homeworldName,
        vehiclesName: state.heroesData.vehiclesName,
        vehiclesModel: state.heroesData.vehiclesModel,
        checkStatus: state.heroesData.checkStatus
    }
}

let ProfilePageContainer = connect(mapStateToProps, {getHeroDataThunkCreator, showLoadingAC})(withProfilepageContainer);

export default ProfilePageContainer;