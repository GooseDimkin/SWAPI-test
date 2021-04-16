import style from './App.module.css';

import LoginPageContainer from './components/LoginPage/LoginPage';
import ProfilePageContainer from './components/ProfilePage/ProfilePage';
import HeroesPage from './components/HeroesPage/HeroesPage';

import {Route, Redirect} from 'react-router-dom';

function App(props) {
  return (
    <div>
      <body>
        <div className={style.content}>
          <Route path='' render={()=> <Redirect to='/login'/>}/>
          <Route path='/login' render={()=> <LoginPageContainer/>}/>
          <Route path='/profile/:heroID' render={()=> <ProfilePageContainer />} />
          <Route path='/heroes' render={()=> <HeroesPage/>}/>
        </div>
      </body>
    </div>
  );
}

export default App;
