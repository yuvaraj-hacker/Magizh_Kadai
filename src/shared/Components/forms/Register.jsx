import { Link } from "react-router-dom";

const Register = (props) => {
  const { handlechange, handleregister } = props;

  return (
    <section className="relative flex items-center justify-center min-h-screen overflow-hidden bg-white">
      {/* Responsive image visibility for mobile and larger screens */}
      <div className="absolute hidden lg:block top-20 right-20">
        <img src="/images/design/icon.png" alt="" className="h-[200px]" />
      </div>
      <div className="absolute hidden lg:block bottom-20 right-20">
        <img src="/images/design/store.png" alt="" className="h-[200px]" />
      </div>
      <div className="absolute hidden lg:block top-20 left-[8%]">
        <img src="/images/design/mobile.png" alt="" className="h-[300px]" />
      </div>
      <div className="absolute hidden xl:block bottom-8 left-[8%]">
        <img className="h-[300px]" src="/images/design/laptop.png" alt="" />
      </div>
      <div className="max-w-[50rem] w-full px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 px-2 mb-10 2xl:mb-0">
          <div className="relative">
            <div className="relative p-6 overflow-hidden border bg-secondary rounded-xl">
              <div className="mb-6">
                <h1 className="text-2xl font-semibold text-white">Register</h1>
              </div>
              <form className="space-y-5" onSubmit={handleregister}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <input
                      type="text"
                      onChange={handlechange}
                      name="First_Name"
                      id="First_Name"
                      className="w-full px-4 py-3 placeholder-gray-500 border border-gray-300 shadow-md outline-none rounded-xl focus:ring-2 focus:ring-primary"
                      placeholder="First Name"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      onChange={handlechange}
                      name="Last_Name"
                      id="Last_Name"
                      className="w-full px-4 py-3 placeholder-gray-500 border border-gray-300 shadow-md outline-none rounded-xl focus:ring-2 focus:ring-primary"
                      placeholder="Last Name"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      onChange={handlechange}
                      name="Email"
                      id="Email"
                      className="w-full px-4 py-3 placeholder-gray-500 border border-gray-300 shadow-md outline-none rounded-xl focus:ring-2 focus:ring-primary"
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      onChange={handlechange}
                      name="Mobilenumber"
                      id="Mobilenumber"
                      className="w-full px-4 py-3 placeholder-gray-500 border border-gray-300 shadow-md outline-none rounded-xl focus:ring-2 focus:ring-primary"
                      placeholder="Mobile Number"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      onChange={handlechange}
                      name="Password"
                      id="Password"
                      className="w-full px-4 py-3 placeholder-gray-500 border border-gray-300 shadow-md outline-none rounded-xl focus:ring-2 focus:ring-primary"
                      placeholder="Password"
                      required
                    />
                  </div>
                  <div>
                    <textarea
                      onChange={handlechange}
                      name="Address"
                      id="Address"
                      className="w-full px-4 py-3 placeholder-gray-500 border border-gray-300 shadow-md outline-none rounded-xl focus:ring-2 focus:ring-primary"
                      placeholder="Address"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      onChange={handlechange}
                      name="Country"
                      id="Country"
                      className="w-full px-4 py-3 placeholder-gray-500 border border-gray-300 shadow-md outline-none rounded-xl focus:ring-2 focus:ring-primary"
                      placeholder="Country"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      onChange={handlechange}
                      name="State"
                      id="State"
                      className="w-full px-4 py-3 placeholder-gray-500 border border-gray-300 shadow-md outline-none rounded-xl focus:ring-2 focus:ring-primary"
                      placeholder="State"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      onChange={handlechange}
                      name="City"
                      id="City"
                      className="w-full px-4 py-3 placeholder-gray-500 border border-gray-300 shadow-md outline-none rounded-xl focus:ring-2 focus:ring-primary"
                      placeholder="City"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      onChange={handlechange}
                      name="Zipcode"
                      id="Zipcode"
                      className="w-full px-4 py-3 placeholder-gray-500 border border-gray-300 shadow-md outline-none rounded-xl focus:ring-2 focus:ring-primary"
                      placeholder="Zipcode"
                      required
                    />
                  </div>
                </div>
                <div className="flex items-center justify-center mt-6">
                  <button
                    type="submit"
                    className="w-full px-6 py-3 font-semibold text-white rounded-xl bg-primary hover:bg-primary-dark sm:w-auto"
                  >
                    Register
                  </button>
                </div>

                <div className="flex justify-center gap-2 mt-5 text-white">
                  Already have an account?
                  <Link to="/login">
                    <span className="font-semibold text-primary"> Login</span>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
