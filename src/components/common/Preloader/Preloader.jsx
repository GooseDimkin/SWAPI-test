import style from './Preloader.module.css';

import preloader from './../assets/preloader.gif';

function Preloader() {
    return <img className={style.loading_gif} src={preloader} alt='loading'/>
}

export default Preloader;