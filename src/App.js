import style from './App.module.css';

import LoginPageContainer from './components/LoginPage/LoginPage';
import ProfilePageContainer from './components/ProfilePage/ProfilePage';

import {Route} from 'react-router-dom';

function App(props) {
  return (
    <div>
      <body>
        <div className={style.content}>
          <Route path='/login' render={()=> <LoginPageContainer/>}/>
          <Route path='/profile/:userID' render={()=> <ProfilePageContainer />} />
        </div>
      </body>
    </div>
  );
}

export default App;
