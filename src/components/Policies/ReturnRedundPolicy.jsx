import { Helmet } from "react-helmet";

export default function ReturnRefundpolicy () {

    return(
        <>
         <section>
            <Helmet>
                <title>Return and Refund Policy | Kiraana Bazaar</title>
                <meta
                    name="description"
                    content="Read the Return and Refund Policy for using Kiraana Bazaar's website and services, including product availability, pricing, orders, payments, and intellectual property."
                />
                <meta
                    name="keywords"
                    content="Return and Refund Policy, Kiraana Bazaar, product availability, pricing, orders, payments, returns, intellectual property"
                />
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content="Return and Refund Policy | Kiraana Bazaar" />
                <meta
                    property="og:description"
                    content="Find out the Return and Refund Policy for using Kiraana Bazaar's website, including product availability, payments, intellectual property, and liability."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={window.location.href} />
                <meta
                    property="og:image"
                    content="https://www.Magizhkadai.com/images/og-image.jpg"
                />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Return and Refund Policy | Kiraana Bazaar" />
                <meta
                    name="twitter:description"
                    content="Learn about Kiraana Bazaar's Return and Refund Policy, including how to use our website, place orders, and your rights and responsibilities as a customer."
                />
                <meta
                    name="twitter:image"
                    content="https://www.Magizhkadai.com/images/og-image.jpg"
                />
                <link rel="canonical" href={window.location.href} />
            </Helmet>
            <div className="px-4 py-5 mx-auto my-5 md:my-10 max-w-[75rem]">
                <div className="flex items-start justify-start">
                    <h1 className="text-2xl font-bold text-regal-blue">Return and Refund Policy</h1>
                </div>
                <div className="mt-3 text-lg">At Magizh Kadai, we aim to provide the best shopping experience. If you’re not satisfied with your purchase, here’s how we can help:</div>
                <div className="my-5">
                    <h1 className="text-xl font-semibold">1. Eligible Returns:</h1>
                    <p className="my-3 text-lg text-justify">
                        Non-perishable, unopened items in their original condition can be returned within 7 days of delivery.
                    </p>

                    <h1 className="text-xl font-semibold">2. Non-Returnable Items:</h1>
                    <p className="my-3 text-lg text-justify">
                        Fresh produce, frozen items, and perishable goods cannot be returned unless they are damaged or defective.
                    </p>

                    <h1 className="text-xl font-semibold">3. Return Process:</h1>
                    <p className="my-3 text-lg text-justify">
                       &#x2022; Log in to your account, go to the “Orders” section, and submit a return request for the item.
                    </p>
                    <p className="my-3 text-lg text-justify">
                       &#x2022; Our team will review your request and provide further instructions.
                    </p>

                    <h1 className="text-xl font-semibold">4. Refunds and Replacements:</h1>
                    <p className="my-3 text-lg text-justify">
                       &#x2022; Refunds will be processed to your original payment method within 5-7 business days after we receive and inspect the item.
                    </p>
                    <p className="my-3 text-lg text-justify">
                       &#x2022; Replacements are available for damaged, defective, or incorrect items.
                    </p>

                    <h1 className="text-xl font-semibold">5. Return Shipping Costs:</h1>
                    <p className="my-3 text-lg text-justify">
                       &#x2022; Customers are responsible for return shipping costs unless the issue was caused by us (e.g., incorrect or damaged item).
                    </p>
                    <p className="my-3 text-lg text-justify">
                       &#x2022; We will arrange free pick-up for damaged or incorrect items.
                    </p>

                    <h1 className="text-xl font-semibold">6. Contact Information</h1>
                    <p className="my-3 text-lg text-justify">
                        For any questions or assistance, please contact us at support magizhkadai@gmail.com or call us at +91 88256 95060.
                    </p>

                </div>
            </div>
        </section>

        </>
    )
}