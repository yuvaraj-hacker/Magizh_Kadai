
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import apiurl from "../../services/apiendpoint/apiendpoint";
import { containerVariants, slideVariants } from "../../../framerMotion";

export const NewArrivals = ({ products }) => {

  return (
    <section>
      <div className="w-full p-3 mx-auto">

        <div className="w-full rounded-2xl bg-[#f2f2f2] " >
          <div>
            <div className="flex justify-between items-center">
              <div className="flex flex-col pl-5 lg:pl-14 lg:mt-10 mt-5">
                <div className="capitalize tracking-widest text-secondary lg:text-base text-sm lg:pb-2">Most popular items</div>
                <div className="capitalize tracking-widest lg:text-4xl text-xl font-semibold">New Arrivals</div>
              </div>
            </div>
          </div>
          <motion.div
          variants={containerVariants}

          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }} className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2 lg:gap-5 p-5 lg:p-14 ">
            {products && products?.slice(0,12).map((product) => (
              <motion.div key={product._id} variants={slideVariants}>
              <Link
                to={`/product-details/${product._id}`}
                state={{ product }}

                className="block"
              >
                <div key={product._id} className="flex w-full bg-white rounded-xl duration-300" >
                  <div className="p-3 rounded-lg overflow-hidden w-1/3 h-[125px]"><img src={`${apiurl()}/${product.Images}`.split(',')[0]} alt={product.Product_Name} className="rounded-lg h-full w-full object-cover border" /></div>
                  <div className="w-2/3 p-3 pl-0">
                    <div className="flex flex-col  justify-between h-full">
                      <p className="text-secondary font-semibold">{product.Discount || 0}% OFF</p>
                      <p className="line-clamp-2 text-sm font-semibold ">{product.Product_Name}</p>
                      <p className=" text-sm text-gray-400">{product.Brand_Name}</p>
                    </div>
                  </div>
                </div>
              </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
