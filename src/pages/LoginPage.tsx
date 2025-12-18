import './pages.css'
import {useNavigate} from "react-router-dom";

export const LoginPage = () => {
const navigate = useNavigate();

    return (
        <div className="pages-container">
            <div className="pages-inner-container">
                <div className="pages-logo">
                    <div className="pages-triangle">
                        <div className="pages-star"></div>
                    </div>
                </div>
                
                <div className="pages-login-window">
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
                            placeholder="Введите ваш пароль"
                        />
                    </div>
                    
                    <button className='pages-login-btn' onClick={() => navigate('/chat')}>
                    Вход
                </button>
                    <button className='pages-register-btn-secondary' onClick={() => navigate('/registration')}>
                    Зарегистрироваться
                </button>
                </div>
            </div>
        </div>
    )
}



