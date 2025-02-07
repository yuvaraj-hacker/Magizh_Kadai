import { useState } from "react";

const SignInSignUp = () => {
    const [isSignUp, setIsSignUp] = useState(false);

    return (
        <div className={`container min-h-[60vh] mx-auto my-20  flex justify-center items-center  bg-[#444] ${isSignUp ? "sign-up-mode" : ""}`}>
            <div className="signin-signup">
                <form className="sign-in-form">
                    <h2 className="title">Sign in</h2>
                    <div className="input-field">
                        <i className="fas fa-user"></i>
                        <input type="text" placeholder="Username" />
                    </div>
                    <div className="input-field">
                        <i className="fas fa-lock"></i>
                        <input type="password" placeholder="Password" />
                    </div>
                    <input type="submit" value="Login" className="btn" />
                    <p className="social-text">Or Sign in with social platform</p>
                    <div className="social-media">
                        <a href="#" className="social-icon">
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a href="#" className="social-icon">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#" className="social-icon">
                            <i className="fab fa-google"></i>
                        </a>
                        <a href="#" className="social-icon">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                    <p className="account-text">
                        Don't have an account? <a href="#" onClick={() => setIsSignUp(true)}>Sign up</a>
                    </p>
                </form>

                <form className="sign-up-form">
                    <h2 className="title">Sign up</h2>
                    <div className="input-field">
                        <i className="fas fa-user"></i>
                        <input type="text" placeholder="Username" />
                    </div>
                    <div className="input-field">
                        <i className="fas fa-envelope"></i>
                        <input type="email" placeholder="Email" />
                    </div>
                    <div className="input-field">
                        <i className="fas fa-lock"></i>
                        <input type="password" placeholder="Password" />
                    </div>
                    <input type="submit" value="Sign up" className="btn" />
                    <p className="social-text">Or Sign up with social platform</p>
                    <div className="social-media">
                        <a href="#" className="social-icon">
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a href="#" className="social-icon">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#" className="social-icon">
                            <i className="fab fa-google"></i>
                        </a>
                        <a href="#" className="social-icon">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                    <p className="account-text">
                        Already have an account? <a href="#" onClick={() => setIsSignUp(false)}>Sign in</a>
                    </p>
                </form>
            </div>

            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <h3>Member of Brand?</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <button className="btn" onClick={() => setIsSignUp(false)}>Sign in</button>
                    </div>
                    <img src="signin.svg" alt="Sign In" className="image" />
                </div>

                <div className="panel right-panel">
                    <div className="content">
                        <h3>New to Brand?</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <button className="btn" onClick={() => setIsSignUp(true)}>Sign up</button>
                    </div>
                    <img src="signup.svg" alt="Sign Up" className="image" />
                </div>
            </div>
        </div>
    );
};

export default SignInSignUp;
