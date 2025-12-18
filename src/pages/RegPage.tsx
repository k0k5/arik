import './pages.css'
import {useNavigate} from "react-router-dom";


export const RegPage = () => {
   return(
    <Main></Main>
   )
}


const Main =()=>{
const navigate = useNavigate();


 return (
        <div className="pages-container">
            <div className="pages-inner-container">
                <div className="pages-logo">
                    <div className="pages-triangle">
                        <div className="pages-star"></div>
                    </div>
                </div>
                
                <div className="pages-register-window">
                    <div className="pages-avatar-upload">
                        <div className="pages-avatar-preview">
                            <div className="pages-avatar-placeholder">
                                <span className="pages-upload-icon">+</span>
                            </div>
                        </div>
                        <input 
                            type="file" 
                            id="avatar-input" 
                            accept="image/*" 
                            className="pages-avatar-input"
                        />
                        <label htmlFor="avatar-input" className="pages-avatar-label">
                            Выбрать аватар
                        </label>
                    </div>

                    <div className="pages-input-group">
                        <label htmlFor="username">Имя пользователя</label>
                        <input 
                            type="text" 
                            id="username" 
                            placeholder="Введите ваше имя"
                        />
                    </div>
                    
                    <div className="pages-input-group">
                        <label htmlFor="email">Почта</label>
                        <input 
                            type="email" 
                            id="email" 
                            placeholder="Введите вашу почту"
                        />
                    </div>
                    
                    <div className="pages-input-group">
                        <label htmlFor="password">Пароль</label>
                        <input 
                            type="password" 
                            id="password" 
                            placeholder="Придумайте пароль"
                        />
                    </div>

                    <div className="pages-input-group">
                        <label htmlFor="confirm-password">Подтвердите пароль</label>
                        <input 
                            type="password" 
                            id="confirm-password" 
                            placeholder="Повторите пароль"
                        />
                    </div>
                    
                    <button className='pages-register-btn' onClick={() => navigate('/chat')}>
                    Зарегистрироваться
                </button>
                    <button className='pages-login-btn-secondary' onClick={() => navigate('/login')}>
                    Уже есть аккаунт? Войти
                </button>
                </div>
            </div>
        </div>
    )
}
