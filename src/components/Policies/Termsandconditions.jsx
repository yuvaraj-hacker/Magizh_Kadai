import { Helmet } from "react-helmet";

export default function TermsandConditions() {

    return (
        <section>
            <Helmet>
                <title>Terms and Conditions | Kiraana Bazaar</title>
                <meta
                    name="description"
                    content="Read the Terms and Conditions for using Kiraana Bazaar's website and services, including product availability, pricing, orders, payments, and intellectual property."
                />
                <meta
                    name="keywords"
                    content="terms and conditions, Kiraana Bazaar, product availability, pricing, orders, payments, returns, intellectual property"
                />
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content="Terms and Conditions | Kiraana Bazaar" />
                <meta
                    property="og:description"
                    content="Find out the terms and conditions for using Kiraana Bazaar's website, including product availability, payments, intellectual property, and liability."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={window.location.href} />
                <meta
                    property="og:image"
                    content="https://www.Magizhkadai.com/images/og-image.jpg"
                />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Terms and Conditions | Kiraana Bazaar" />
                <meta
                    name="twitter:description"
                    content="Learn about Kiraana Bazaar's terms and conditions, including how to use our website, place orders, and your rights and responsibilities as a customer."
                />
                <meta
                    name="twitter:image"
                    content="https://www.Magizhkadai.com/images/og-image.jpg"
                />
                <link rel="canonical" href={window.location.href} />
            </Helmet>
            <div className="px-4 py-5 mx-auto my-5 md:my-10 max-w-[75rem]">
                <div className="flex items-start justify-start">
                    <h1 className="text-2xl font-bold text-regal-blue">Terms and Conditions</h1>
                </div>
                <div className="mt-3 text-lg">Welcome to Magizh Kadai! By using our website, you agree to the following terms:</div>
                <div className="my-5">
                    <h1 className="text-xl font-semibold">1. Eligibility</h1>
                    <p className="my-3 text-lg text-justify">
                        You must be at least 18 years old or have parental consent to use our services.
                    </p>

                    <h1 className="text-xl font-semibold">2. User Responsibilities</h1>
                    <p className="my-3 text-lg text-justify">
                        &#x2022; Provide accurate information during checkout.
                    </p>
                    <p className="my-3 text-lg text-justify">
                        &#x2022; Keep your account details secure and do not misuse our website.
                    </p>

                    <h1 className="text-xl font-semibold">3. Orders and Payments</h1>
                    <p className="my-3 text-lg text-justify">
                        &#x2022; All orders are subject to availability and must be paid at checkout.
                    </p>
                    <p className="my-3 text-lg text-justify">
                        &#x2022; Prices may change without prior notice.
                    </p>

                    <h1 className="text-xl font-semibold">4. Return and Refund Policy</h1>
                    <p className="my-3 text-lg text-justify">
                        Refer to our Return and Refund Policy for details on eligible returns, refunds, and replacements.
                    </p>

                    <h1 className="text-xl font-semibold">5. Privacy Policy</h1>
                    <p className="my-3 text-lg text-justify">
                        &#x2022; We collect personal information to process orders and improve your experience.
                    </p>
                    <p className="my-3 text-lg text-justify">
                        &#x2022; Your data is secure and not shared without consent. For more, read our Privacy Policy.
                    </p>

                    <h1 className="text-xl font-semibold">6. Prohibited Activities</h1>
                    <p className="my-3 text-lg text-justify">
                        Do not use our website for illegal activities or attempt to disrupt its functionality.
                    </p>

                    <h1 className="text-xl font-semibold">7. Limitation of Liability</h1>
                    <p className="my-3 text-lg text-justify">
                        Magizh Kadai is not liable for delays or issues caused by circumstances beyond our control.
                    </p>

                    <h1 className="text-xl font-semibold">8. Changes to Terms</h1>
                    <p className="my-3 text-lg text-justify">
                        These terms may be updated at any time. Continued use of the website means you accept the updated terms.
                    </p>

                    <h1 className="text-xl font-semibold">9. Contact Us</h1>
                    <p className="my-3 text-lg text-justify">
                        For questions, email us at magizhkadai@gmail.com or write to:
                        Narayanan Nagar Road,
                        Ramakrishna school Opposite,
                        Villupuram 605 602.
                    </p>

                </div>
            </div>
        </section>
    )
}
