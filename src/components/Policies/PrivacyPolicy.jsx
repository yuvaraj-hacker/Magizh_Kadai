import { Helmet } from "react-helmet";

export default function PrivacyPolicy() {
    return (
        <section>
            <Helmet>
                <title>Privacy Policy | Kiraana Bazaar</title>
                <meta name="description" content="Learn how Kiraana Bazaar collects, uses, and protects your personal information. Read our privacy policy to understand your data rights and security." />
                <meta name="keywords" content="privacy policy, Kiraana Bazaar, data protection, personal information, data rights, security, ecommerce privacy" />
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content="Privacy Policy | Kiraana Bazaar" />
                <meta property="og:description" content="Learn how Kiraana Bazaar collects, uses, and protects your personal information. Read our privacy policy to understand your data rights and security." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:image" content="https://www.Magizhkadai.com/images/og-image.jpg" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Privacy Policy | Kiraana Bazaar" />
                <meta name="twitter:description" content="Learn how Kiraana Bazaar collects, uses, and protects your personal information. Read our privacy policy to understand your data rights and security." />
                <meta name="twitter:image" content="https://www.Magizhkadai.com/images/og-image.jpg" />
                <link rel="canonical" href={window.location.href} />
            </Helmet>

            <div className="px-4 py-5 mx-auto my-5 md:my-10 max-w-[75rem]">
                <div className="flex items-start justify-start">
                    <h1 className="text-2xl font-bold text-regal-blue">Privacy Policy</h1>
                </div>

                <div className="my-5">
                    <p className="text-lg text-justify">At Magizh Kadai, your privacy is our priority. Here’s how we handle your information:</p>

                    <h1 className="my-2 text-xl font-semibold">1. Information We Collect</h1>
                    <p className="my-3 text-lg text-justify">&#x2022; Personal details (name, email, address, payment info).</p>
                    <p className="my-3 text-lg text-justify">&#x2022; Order history and technical data (IP address, browser, cookies).</p>

                    <h1 className="text-xl font-semibold">2. How We Use Your Information</h1>
                    <p className="my-3 text-lg text-justify">&#x2022; To process orders, provide customer support, and send updates.</p>
                    <p className="my-3 text-lg text-justify">&#x2022; To improve our services and comply with legal requirements.</p>

                    <h1 className="text-xl font-semibold">3. Sharing Your Information</h1>
                    <p className="my-3 text-lg text-justify">We only share data with trusted service providers (e.g., payment processors, delivery partners) or when required by law.</p>

                    <h1 className="text-xl font-semibold">4. Data Security</h1>
                    <p className="my-3 text-lg text-justify">We use advanced security measures to protect your information.</p>

                    <h1 className="text-xl font-semibold">5. Cookies</h1>
                    <p className="my-3 text-lg text-justify">Cookies help improve your experience. You can manage them through your browser settings.</p>

                    <h1 className="text-xl font-semibold">6. Your Rights</h1>
                    <p className="my-3 text-lg text-justify">You can update, delete, or request a copy of your data anytime. Opt out of promotional emails by clicking “unsubscribe.”</p>

                    <h1 className="text-xl font-semibold">7. Contact Us</h1>
                    <p className="my-3 text-lg text-justify">For privacy-related concerns, email us at support @Magizhkadai.com or write to us at:
                    10415 Old Placerville Rd, Unit 235, Rancho Cordova, CA 95827.</p>


                </div>
            </div>
        </section>
    );
}
