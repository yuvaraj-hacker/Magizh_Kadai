import { Link } from "react-router-dom";

const SignIn = (props) => {
  const { handlechange, handlelogin } = props;

  return (
    <section className="relative flex items-center justify-center overflow-hidden bg-white h-dvh">
      <div className="absolute hidden md:block top-20 right-20"> 
        <img src="/images/design/icon.png" alt="" className="h-[200px]" /> 
      </div>

      <div className="absolute hidden md:block bottom-20 right-20"> 
        <img src="/images/design/store.png" alt="" className="h-[200px]" /> 
      </div>

      <div className="absolute top-20 left-[8%] hidden md:block"> 
        <img src="/images/design/mobile.png" alt="" className="h-[300px]" /> 
      </div>

      <div className="absolute bottom-8 left-[8%] hidden md:block">  
        <img className="h-[300px]" src="/images/design/laptop.png" alt="" /> 
      </div>

      <div className="max-w-[30rem] w-full px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 px-2 mb-10 2xl:mb-0">
          <div className="relative">
            <div className="relative z-0 p-10 overflow-hidden border bg-secondary rounded-xl">
              <div className="mb-10">
                <h1 className="text-2xl font-semibold text-primary">Sign In</h1>
              </div>
              <form className="space-y-5" onSubmit={handlelogin}>
                <div>
                  <input
                    type="email"
                    onChange={handlechange}
                    name="Email"
                    id="Email"
                    className="w-full px-4 py-3 border shadow-xl outline-none rounded-xl placeholder-slate-500"
                    placeholder="Email Address"
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    onChange={handlechange}
                    name="Password"
                    id="Password"
                    className="w-full px-4 py-3 border shadow-xl outline-none rounded-xl placeholder-slate-500"
                    placeholder="Password"
                    required
                  />
                </div>
                <div>
                  <button type="submit" className="w-full px-4 py-3 text-white rounded-xl bg-primary">
                    Sign In
                  </button>
                </div>
              </form>
              <div className="flex justify-center gap-2 mt-5 text-white text-md">
                New to Website?
                <Link to={"/register"}>
                  <span className="font-semibold text-primary"> Register</span>
                </Link>
              </div>
              <div className="flex justify-center gap-2 mt-5 text-md">
                <Link to={"/forgotpassword"}>
                  <span className="font-semibold text-primary"> Forgot Password?</span>
                </Link>
              </div>
            </div>
            <div className="absolute hidden md:block top-20 -left-14"> 
              <img src="/images/Rectangle 348.svg" alt="" className="h-[100px]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
