import style from './UsersPage.module.css';

import Header from './../Header/Header';

import { connect } from 'react-redux';
import React, {useState} from 'react';

import {setUsersThunkCreator, getPageAC, showLoadingAC} from './../../Redux/reducers/usersReducer';
import UserItem from './UserItem/UserItem';

import Preloader from './../common/Preloader/Preloader';

function UsersPage(props) {
    let pagesItem = props.showPages(props.totalCount, props.count).map(p => <span onClick={() => props.openPage(p)} className={props.pageNumber === p ? style.selected_page : style.pages}>{p}</span>);
    return(
        <div>
            <Header headerInfo={props.headerInfo}/>
            <div>{pagesItem}</div>
            {props.isLoading ? <Preloader/> : 
            <UserItem users={props.users} />}
        </div>
    );
}

class UsersPageAPI extends React.Component {    
    componentDidMount() {
        this.props.setUsersThunkCreator(this.props.count, this.props.pageNumber);
    }

    showPages(totalCount, count) {
        const pagesCount = Math.ceil(totalCount / count);
        let pagesArray = [];

        for(let i = 1; i <= pagesCount; ++i) 
            pagesArray.push(i);

        return pagesArray
    }

    openPage = (pageNumber) => {
       this.props.showLoadingAC();
       this.props.getPageAC(pageNumber);
       this.props.setUsersThunkCreator(this.props.count, pageNumber);
    }

    render() {
        return <UsersPage isLoading={this.props.isLoading} pageNumber={this.props.pageNumber} count={this.props.count} totalCount={this.props.totalCount} showPages={this.showPages} openPage={this.openPage} users={this.props.users} headerInfo={this.props.headerInfo} />
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.usersData.people,
        totalCount: state.usersData.totalCount,
        count: state.usersData.count,
        pageNumber: state.usersData.pageNumber,
        isLoading: state.usersData.isLoading,
        headerInfo: state.facebookData
    };
}

let UsersPageContainer = connect(mapStateToProps, {setUsersThunkCreator, getPageAC, showLoadingAC})(UsersPageAPI);

export default UsersPageContainer;