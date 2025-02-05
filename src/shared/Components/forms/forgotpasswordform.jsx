const Forgotpasswordform = (props) => {
  const { handleregister, handlechange } = props;
  return (
    <section className="relative flex items-center justify-center overflow-hidden bg-white  min-h-[60vh] ">
      <div className="absolute hidden top-20 md:block right-20"> <img src="/images/design/icon.png" alt="" className="h-[200px]  " /></div>
      <div className="absolute hidden md:block bottom-20 right-20"> <img src="/images/design/store.png" alt="" className="h-[200px]  " /></div>
      <div className="absolute hidden md:block top-20 left-[8%]"> <img src="/images/design/mobile.png" alt="" className="h-[300px] " /></div>
      <div className="absolute  hidden md:block bottom-8 left-[8%]">  <img className="h-[300px] " src="/images/design/laptop.png" alt="" /></div>
      <div className="max-w-[30rem] w-full px-4 md:px-6  mx-auto">
        <div className="grid grid-cols-1 px-2 mb-10 2xl:mb-0 ">
          <div className="border shadow-lg bg-secondary mt-7 rounded-xl">
            <div className="p-4 sm:p-7">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-white">Forgot password?</h1>
                {/* <p className="mt-2 text-sm text-white">
                Remember your password?
                <Link to={"/login"} className="font-semibold text-primary decoration-2 hover:underline" >
                  Login here
                </Link>
              </p> */}
              </div>
              <div className="mt-8">
                <form onSubmit={handleregister}>
                  <div className="grid gap-y-4">
                    <div>
                      <label htmlFor="email" className="block mb-2 ml-1 text-xl font-bold text-white">Email address</label>
                      <div className="relative">
                        <input onChange={handlechange} type="email" id="email" name="Email" className="w-full px-4 py-3 border shadow-xl outline-none rounded-xl placeholder-slate-500" />
                      </div>
                      <p className="hidden mt-2 text-xs text-red-600 " id="email-error">Please include a valid email address so we can get back to you</p>
                    </div>
                    <button type="submit" className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white transition-all border border-transparent rounded-xl bg-primary ">Send OTP</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Forgotpasswordform
