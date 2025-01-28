
export default function PopupModal({ setVisible, visible }) {
  return (
    <div className={`${visible ? 'block ':'hidden'} duration-1000 fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm`}>
    {/* <Dialog
    //   visible={visible}
      style={{ width: "30vw" }}
    //   onHide={() => setVisible(false)}
      closable={false}
    > */}
    <div className="lg:w-[30vw] w-[60vw] bg-white dark:bg-gray-600 p-5 lg:p-8 rounded-2xl">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-3 bg-gradient-to-r from-[#CA2E43] to-pink-600 bg-clip-text text-transparent dark:text-white">
          Fresh Flowers
        </h2>
        <div className="py-3 ">
          <img
            src="/images/Items/Fresh Flower.jpg"
            alt=""
            className="rounded-xl"
          />
        </div>
        <p className="text-lg text-gray-600 dark:text-white">
          Orders for fresh flowers take up to one week for Delivery / Pickup
        </p>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => setVisible(false)}
          className={`w-full py-3.5 rounded-full font-bold text-lg uppercase tracking-wider transition-all duration-300 shadow-md ${"bg-[#CA2E43] text-white hover:bg-[#a71f36] hover:shadow-xl"}`}
        >
          Continue
        </button>
      </div>
      </div>
    {/* </Dialog> */}
     </div>
  );
}
