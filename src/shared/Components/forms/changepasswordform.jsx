const Changepasswordform = (props) => {
    const {handlechange,updatepassword} = props;
    return (
        <section className="relative flex items-center justify-center overflow-hidden bg-white h-dvh">
        <div className="absolute hidden md:block top-20 right-20"> <img src="/images/design/icon.png" alt="" className="h-[200px]  " /></div>
            <div className="absolute hidden md:block bottom-20 right-20"> <img src="/images/design/store.png" alt="" className="h-[200px]  " /></div>
            <div className="absolute hidden md:block top-20 left-[8%]"> <img src="/images/design/mobile.png" alt="" className="h-[300px] " /></div>
            <div className="absolute hidden md:block bottom-8 left-[8%] ">  <img className="h-[300px] " src="/images/design/laptop.png" alt=""  /></div>
        <div className="absolute hidden md:block top-20 -right-14"> <img src="/images/Rectangle 348.svg" alt="" className="h-[100px]" /></div>
        <div className="h-8 hidden md:block w-8 bg-[#AF52DE] rounded-full absolute bottom-24 right-36 drop-shadow-lg"></div>
        <div className="h-8  hidden md:block w-8 bg-[#AF52DE] rounded-full absolute top-24 left-50 drop-shadow-lg"></div>
        <div className="absolute -bottom-5 -left-[13%] hidden md:block">  <img src="/images/Group 37.png" alt="" /></div>
        <div className="max-w-[30rem] w-full px-4 md:px-6  mx-auto">
            <div className="grid grid-cols-1 px-2 mb-10 2xl:mb-0 ">
            <div className="border shadow-lg bg-secondary mt-7 rounded-xl">
            <div className="p-4 sm:p-7">
              <div className="text-center">
                <h1 className="block text-2xl font-bold text-white ">Create new Password</h1>
            
              </div>
              <div className="mt-5">
                <form onSubmit={updatepassword}>
                  <div className="grid gap-y-4">
                    <div>
                      <label htmlFor="email" className="block mb-2 ml-1 text-sm font-bold text-white">New Password</label>
                      <div className="relative space-y-5">
                        <input type="password" id="newpassword" name="newpassword" className="w-full px-4 py-3 border shadow-xl outline-none rounded-xl placeholder-slate-500" required />
                    </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 ml-1 text-sm font-bold text-white">Confirm Password</label>
                        <div className="relative space-y-5">
                          <input type="password" id="confirmpassword" name="Password" onChange={handlechange} className="w-full px-4 py-3 border shadow-xl outline-none rounded-xl placeholder-slate-500" required />
                      </div>
                      </div>
                    <button type="submit" className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white transition-all border border-transparent rounded-xl bg-primary ">Update Password</button>
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

export default Changepasswordform
