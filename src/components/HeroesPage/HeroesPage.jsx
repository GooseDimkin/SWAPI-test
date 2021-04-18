import style from './HeroesPage.module.css';

import Header from '../Header/Header';

import { connect } from 'react-redux';
import React, {useState} from 'react';

import {checkThunkCreator, setOneVehicleThunkCreator, setMoreVehiclesThunkCreator, 
    setHomeworldThunkCreator, setHeroesThunkCreator, getPageAC, showLoadingAC} from '../../Redux/reducers/heroesReducer';
import HeroItem from './HeroItem/HeroItem';

import Preloader from '../common/Preloader/Preloader';

function HeroesPage(props) {
    let pagesItem = props.showPages(props.totalCount, props.count)
    .map(p => <span 
                onClick={() => props.openPage(p)} 
                className={props.pageNumber === p ? style.selected_page : style.pages}>{p}</span>);
    return(
        <div>
            <Header headerInfo={props.headerInfo}/>
            <div>{pagesItem}</div>
            {props.isLoading ? <Preloader/> : 
            <HeroItem 
            checkThunkCreator={props.checkThunkCreator} 
            setOneVehicleThunkCreator={props.setOneVehicleThunkCreator} 
            setMoreVehiclesThunkCreator={props.setMoreVehiclesThunkCreator} 
            setHomeworldThunkCreator={props.setHomeworldThunkCreator} 
            heroes={props.heroes} />}
        </div>
    );
}

class HeroesPageAPI extends React.Component {    
    componentDidMount() {
        this.props.setHeroesThunkCreator(this.props.count, this.props.pageNumber);
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
       this.props.setHeroesThunkCreator(this.props.count, pageNumber);
    }

    render() {
        return <HeroesPage 
        checkThunkCreator={this.props.checkThunkCreator} 
        setOneVehicleThunkCreator={this.props.setOneVehicleThunkCreator} 
        setMoreVehiclesThunkCreator={this.props.setMoreVehiclesThunkCreator} 
        setHomeworldThunkCreator={this.props.setHomeworldThunkCreator} 
        isLoading={this.props.isLoading} 
        pageNumber={this.props.pageNumber} 
        count={this.props.count} 
        totalCount={this.props.totalCount} 
        showPages={this.showPages} 
        openPage={this.openPage} 
        heroes={this.props.heroes} 
        headerInfo={this.props.headerInfo} />
    }
}

const mapStateToProps = (state) => {
    return {
        heroes: state.heroesData.people,
        totalCount: state.heroesData.totalCount,
        count: state.heroesData.count,
        pageNumber: state.heroesData.pageNumber,
        isLoading: state.heroesData.isLoading,
        headerInfo: state.facebookData
    };
}

let HeroesPageContainer = connect(mapStateToProps, {
    checkThunkCreator, 
    setOneVehicleThunkCreator, 
    setMoreVehiclesThunkCreator, 
    setHomeworldThunkCreator, 
    setHeroesThunkCreator, 
    getPageAC, 
    showLoadingAC})
    (HeroesPageAPI);

export default HeroesPageContainer;