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
                    <p className="text-lg text-justify">At MagizhKadai, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our eCommerce website.</p>

                    <h1 className="my-2 text-xl font-semibold">1. Information We Collect</h1>
                    <p className="my-3 text-lg text-justify">&#x2022; Personal details (name, phone number, delivery address) when you place an order via WhatsApp.</p>
                    <p className="my-3 text-lg text-justify">&#x2022; Usage data (browsing activity, IP address, device information).</p>

                    <h1 className="text-xl font-semibold">2. How We Use Your Information</h1>
                    <p className="my-3 text-lg text-justify">&#x2022; To process and deliver orders.</p>
                    <p className="my-3 text-lg text-justify">&#x2022; To improve user experience and personalize content.</p>
                    <p className="my-3 text-lg text-justify">&#x2022; For customer support and communication via WhatsApp or Voice call.</p>
                    <p className="my-3 text-lg text-justify">&#x2022; For marketing, promotions, and updates (with your consent).</p>
                    <p className="my-3 text-lg text-justify">&#x2022; To ensure security and prevent fraud.</p>

                    <h1 className="text-xl font-semibold">3. Sharing Your Information</h1>
                    <p className="my-3 text-lg text-justify"> &#x2022; We do not sell your personal data.</p>
                    <p className="my-3 text-lg text-justify"> &#x2022; Information may be shared with trusted third parties (delivery services) only for operational purposes.</p>
                    <p className="my-3 text-lg text-justify">&#x2022; Legal compliance: We may disclose data when required by law.</p>

                    <h1 className="text-xl font-semibold">5. Cookies and Tracking Technologies:</h1>
                    <p className="my-3 text-lg text-justify">&#x2022; We use cookies to enhance your browsing experience, analyze website traffic, and personalize ads.</p>

                    <h1 className="text-xl font-semibold">4. Data Security</h1>
                    <p className="my-3 text-lg text-justify"> &#x2022; We implement advanced security measures to protect your personal data from unauthorized access.</p>

                    <h1 className="text-xl font-semibold">6. Your Rights</h1>
                    <p className="my-3 text-lg text-justify">&#x2022; You can request access, correction, or deletion of your personal data.</p>
                    <p className="my-3 text-lg text-justify">&#x2022; You can opt out of marketing communications at any time.</p>

                    <h1 className="text-xl font-semibold">7. Contact Us</h1>
                    <p className="my-3 text-lg text-justify">
                        For any privacy concerns, contact us at magizhkadai@gmail.com
                    </p>
                </div>
            </div>
        </section>
    );
}
