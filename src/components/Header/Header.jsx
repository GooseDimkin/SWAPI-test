import style from './Header.module.css';

function Header(props) {
    return(
        <div className={style.header}>
            <div className={style.name}>{props.headerInfo.name}</div>
            <img className={style.avatar} src={props.headerInfo.picture} alt={props.headerInfo.name}/>
        </div>
    );
}

export default Header