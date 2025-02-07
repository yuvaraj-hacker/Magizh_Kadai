import { Helmet } from "react-helmet";

export default function ShippingPolicy() {

    return (
        <section>
            <Helmet>
                <title>Shipping Policy | Kiraana Bazaar</title>
                <meta
                    name="description"
                    content="Learn about Kiraana Bazaar's shipping policy, including order processing times, shipping methods, costs, and delivery times. Contact us for more information."
                />
                <meta
                    name="keywords"
                    content="shipping policy, Kiraana Bazaar, order processing, delivery times, shipping methods, shipping costs, lost packages"
                />
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content="Shipping Policy | Kiraana Bazaar" />
                <meta
                    property="og:description"
                    content="Find out how Kiraana Bazaar processes and ships your orders. Learn about available shipping methods, costs, and how to track your packages."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={window.location.href} />
                <meta
                    property="og:image"
                    content="https://www.Magizhkadai.com/images/og-image.jpg"
                />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Shipping Policy | Kiraana Bazaar" />
                <meta
                    name="twitter:description"
                    content="Find out how Kiraana Bazaar processes and ships your orders. Learn about available shipping methods, costs, and how to track your packages."
                />
                <meta
                    name="twitter:image"
                    content="https://www.Magizhkadai.com/images/og-image.jpg"
                />
                <link rel="canonical" href={window.location.href} />
            </Helmet>
            <div className="px-4 py-5 mx-auto my-5 md:my-10">
                <div className="flex items-start justify-start">
                    <h1 className="text-2xl font-bold text-regal-blue">Shipping Policy</h1>
                </div>
                <div className="my-5">

                    <h1 className="my-2 text-xl font-semibold">1. Order Processing</h1>
                    <p className="my-3 text-lg text-justify">Orders are processed and shipped on business days (Monday through Friday, excluding holidays).</p>
                    <p className="my-3 text-lg text-justify">Please allow [1-2] business days for order processing after payment is received.</p>

                    <h1 className="text-xl font-semibold">2. Shipping Methods</h1>
                    <p className="my-3 text-lg text-justify">Standard Shipping: Typically delivered within [3-7] business days.</p>
                    <p className="my-3 text-lg text-justify">Express Shipping: Typically delivered within [1-3] business days.</p>
                    <p className="my-3 text-lg text-justify">Shipping options and costs will be calculated at checkout based on your location and the weight of your order.</p>

                    <h1 className="text-xl font-semibold">3. Shipping Costs</h1>
                    <p className="my-3 text-lg text-justify">Shipping costs are determined by the shipping method you select, the destination, and the weight of the package.</p>
                    <p className="my-3 text-lg text-justify">Free standard shipping may be available for orders over ₹2000.</p>

                    <h1 className="text-xl font-semibold">4. Order Tracking</h1>
                    <p className="my-3 text-lg text-justify">Once your order is shipped, you will receive an email with tracking information.</p>
                    <p className="my-3 text-lg text-justify">You can track your package using the link provided in the email.</p>

                    <h1 className="text-xl font-semibold">5. Delivery Times</h1>
                    <p className="my-3 text-lg text-justify">Orders placed before 3 PM will be delivered by 9 PM the same day. Orders placed after 3 PM will be delivered by 9 PM the following day.</p>
                    <p className="my-3 text-lg text-justify">If you require a different delivery date, please contact us via email or WhatsApp, and we will do our best to accommodate your request.</p>

                    <h1 className="text-xl font-semibold">6. Shipping Restrictions</h1>
                    <p className="my-3 text-lg text-justify">We currently only ship to addresses within India. International shipping is not available at this time.</p>
                    <p className="my-3 text-lg text-justify">We do not ship to P.O. boxes or military addresses (APO/FPO).</p>

                    <h1 className="text-xl font-semibold">7. Lost or Damaged Packages</h1>
                    <p className="my-3 text-lg text-justify">If your package is lost or arrives damaged, please contact us at support@Magizhkadai.com within [7] days of the delivery date.</p>
                    <p className="my-3 text-lg text-justify">We will assist in filing a claim with the shipping carrier and may offer a replacement or refund depending on the situation.</p>

                    <h1 className="text-xl font-semibold">8. Undeliverable Packages</h1>
                    <p className="my-3 text-lg text-justify">If a package is returned to us as undeliverable due to incorrect address information, failed delivery attempts, or any other reason, we will notify you. Additional shipping charges may apply for reshipping.</p>

                    <h1 className="text-xl font-semibold">9. Returns and Exchanges</h1>
                    <p className="my-3 text-lg text-justify">For information about returns and exchanges, please refer to our [Return Policy].</p>

                    <h1 className="text-xl font-semibold">10. Changes to Shipping Policy</h1>
                    <p className="my-3 text-lg text-justify">We reserve the right to update this shipping policy at any time. Any changes will be posted on this page.</p>

                    <h1 className="text-xl font-semibold">11. Contact Us</h1>
                    <p className="my-3 text-lg text-justify">If you have any questions about this Shipping Policy, please contact us at:</p>
                    <ol className="space-y-1">
                        <li>Email: support@Magizhkadai.com</li>
                        <li>Mobile: +1 916-507-4320</li>
                        <li>Address: 10415 Old Placerville Rd, Suite 235, Rancho Cordova, CA, United States, California.</li>
                    </ol>
                </div>
            </div>
        </section>
    );
}
