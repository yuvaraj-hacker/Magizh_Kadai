import { useState } from 'react';
import { HelpCircle } from "lucide-react";

export default function Faqsection() {
    // State to track which accordion is open
    const [openAccordion, setOpenAccordion] = useState(null);

    // Toggle accordion section
    const toggleAccordion = (index) => {
        setOpenAccordion(openAccordion === index ? null : index);
    };

    return (
        <>
            <div>
                <div className="flex items-center mb-6 bg-secondary dark:bg-gray-700 w-fit p-3 rounded-3xl">
                    <HelpCircle className="w-8 h-8 mr-3 text-blue-600 dark:text-blue-400" />
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Frequently Asked Questions</h2>
                </div>
                <div className="border divide-y rounded-lg">
                    {[
                        {
                            question: "Do I need to create an account to shop?",
                            answer: "While you can browse without an account, creating one helps track orders and speeds up future checkouts."
                        },
                        {
                            question: "How can I contact customer support?",
                            answer: "You can reach us via phone, email, or live chat from 9 AM to 9 PM."
                        },
                        {
                            question: "Is my personal and payment information secure?",
                            answer: "Yes, our site uses SSL encryption for secure transactions."
                        },
                        {
                            question: "What payment methods do you accept?",
                            answer: "We accept credit cards, PayPal, and bank transfers."
                        },
                        {
                            question: "What if I encounter website errors or issues?",
                            answer: "Contact customer support via phone, email, or live chat."
                        }
                    ].map((faq, index) => (
                        <div key={index} role="accordion">
                            <button
                                type="button"
                                onClick={() => toggleAccordion(index)}
                                className={`flex items-center w-full p-5 text-base font-semibold text-left transition-all dark:text-white dark:bg-gray-600 dark:rounded-lg
                                    ${openAccordion === index
                                        ? 'text-primary'
                                        : 'text-gray-800 hover:text-primary'}`} >
                                <span className="mr-4">{faq.question}</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`w-4 ml-auto fill-current shrink-0 transition-transform ${openAccordion === index ? 'rotate-0' : 'rotate-180'
                                        }`}
                                    viewBox="0 0 24 24"   >
                                    <path
                                        fillRule="evenodd"
                                        d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>

                            <div
                                className={`px-6 py-4 transition-all duration-300 ease-in-out dark:bg-gray-700 ${openAccordion === index
                                    ? 'block opacity-100 max-h-96'
                                    : 'hidden opacity-0 max-h-0'
                                    }`}
                            >
                                <p className="text-base font-medium leading-relaxed text-gray-600 dark:text-gray-300">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}