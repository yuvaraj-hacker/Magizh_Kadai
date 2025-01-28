import { Helmet } from "react-helmet";

export default function Refundpolicy() {

    return (
        <section>
            <Helmet>
                <title>Refund Policy | Kiraana Bazaar</title>
                <meta 
                    name="description" 
                    content="Read Kiraana Bazaar's refund and cancellation policy to understand the process for order cancellations, returns, and refunds. Learn how we handle defective or damaged products." 
                />
                <meta 
                    name="keywords" 
                    content="refund policy, cancellation policy, returns, Kiraana Bazaar, defective items, damaged products, shipping, refund process" 
                />
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content="Refund and Cancellation Policy | Kiraana Bazaar" />
                <meta 
                    property="og:description" 
                    content="Learn about Kiraana Bazaar's refund and cancellation policy, including how to cancel orders, return products, and request refunds for defective or damaged items." 
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={window.location.href} />
                <meta 
                    property="og:image" 
                    content="https://www.kiranaabazaar.com/images/og-image.jpg" 
                /> 
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Refund and Cancellation Policy | Kiraana Bazaar" />
                <meta 
                    name="twitter:description" 
                    content="Learn about Kiraana Bazaar's refund and cancellation policy, including how to cancel orders, return products, and request refunds for defective or damaged items." 
                />
                <meta 
                    name="twitter:image" 
                    content="https://www.kiranaabazaar.com/images/og-image.jpg" 
                /> 
                <link rel="canonical" href={window.location.href} />
            </Helmet>
            <div className="px-4 py-5 mx-auto my-5 md:my-10">
                <div className="flex items-start justify-start">
                    <h1 className="text-2xl font-bold text-regal-blue">Refund and Cancellation Policy</h1>
                </div>
                <div className="my-5">
                    <p className="text-lg text-justify">At Kiraana Bazaar, we want you to be satisfied with your purchase. Please review our Refund and Cancellation Policy to understand your options.</p>

                    <h1 className="my-2 text-xl font-semibold">1. Order Cancellations</h1>
                    <p className="my-3 text-lg text-justify">Before Shipment: You may cancel your order before it has been shipped by contacting us at support@kiranaabazaar.com or calling us at +1 916-507-4320.</p>
                    <p className="my-3 text-lg text-justify">After Shipment: Once the order has been shipped, it cannot be canceled. However, you may return the product according to our Return Policy.</p>

                    <h1 className="text-xl font-semibold">2. Returns</h1>
                    <p className="my-3 text-lg text-justify">Eligibility: Products can be returned within 7 to 10 working days from the date of purchase, excluding shipping charges. To initiate a return, please contact us at support@kiranaabazaar.com with your order details.</p>
                    <p className="my-3 text-lg text-justify">Shipping Costs: Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.</p>

                    <h1 className="text-xl font-semibold">3. Refunds</h1>
                    <p className="my-3 text-lg text-justify">Processing Time: Once we receive your return, we will inspect the item and notify you of the approval or rejection of your refund. If approved, your refund will be processed, and a credit will be applied to your original payment method within 7-10 business days.</p>

                    <h1 className="text-xl font-semibold">4. Damaged or Defective Items</h1>
                    <p className="my-3 text-lg text-justify">If you receive a damaged or defective item, please contact us immediately at support@kiranaabazaar.com. We will arrange for a replacement or refund at no additional cost to you.</p>

                    <h1 className="text-xl font-semibold">5. Contact Us</h1>
                    <p className="my-3 text-lg text-justify">If you have any questions about our Refund and Cancellation Policy, please contact us at:</p>
                    <ol className="space-y-1">
                        <li>Email: support@kiranaabazaar.com</li>
                        <li>Mobile: +1 916-507-4320</li>
                        <li>Address: 10415 Old Placerville Rd, Suite 235, Rancho Cordova, CA, United States, California.</li>
                    </ol>
                </div>
            </div>
        </section>
    )
}
