import style from './LoginPage.module.css';
import noPicture from './../common/assets/no-picture.webp';

import React from 'react';
import FacebookLogin from 'react-facebook-login'; 
import Preloader from './../common/Preloader/Preloader';

import {getUserDataAC} from '../../Redux/reducers/facebookReducer';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

function LoginPage(props) {
    return(
        <div>
            {props.isLoading ? <Preloader/> : props.fbContent}
        </div>
    )
}

class LoginPageAPI extends React.Component {
    responseFacebook = response => {
        response.picture === undefined ? 
        response.picture = noPicture : this.props.getUserDataAC(response);
    }

    render() {
        let fbContent;

        if(this.props.isLogginedIn) {
            fbContent = (
                <Redirect to='/heroes'/>
            );
        }
        else {
            fbContent = (<div className={style.loginButton}>
                    <div className={style.welcome}>Welcome!</div>
                    <FacebookLogin
                    appId="482595876166181"
                    autoLoad={true}
                    fields="name,email,picture"
                    onClick={this.componentClicked}
                    callback={this.responseFacebook} />
                </div>);
        }

        return <LoginPage fbContent={fbContent} />
    }
}

const mapStateToProps = (state) => {
    return {
        isLogginedIn: state.facebookData.isLogginedIn
    }
}

let LoginPageContainer = connect(mapStateToProps, {getUserDataAC})(LoginPageAPI);

export default LoginPageContainer;