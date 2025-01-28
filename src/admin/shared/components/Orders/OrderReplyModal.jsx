import React, { useState, useEffect } from 'react';
import { X, Send, Paperclip, Smile } from 'lucide-react';

const OrderReplyModal = ({ isOpen, onClose, orderDetails }) => {
    const [message, setMessage] = useState('');
    const [attachments, setAttachments] = useState([]);
    const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);


    const quickEmojis = ['👍', '❤️', '😊', '🙏', '👀', '🚀'];

    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files);
        setAttachments(prev => [...prev, ...files]);
    };

    const removeAttachment = (index) => {
        setAttachments(prev => prev.filter((_, i) => i !== index));
    };

    const handleSendMessage = () => {
        if (message.trim() || attachments.length > 0) {
            // Implement your send message logic here
            console.log('Sending message:', {
                orderId: orderDetails.Order_id,
                Email: orderDetails.Email,
                message,
                attachments
            });

            // Reset form
            setMessage('');
            setAttachments([]);
            onClose();
        }
    };

    const addEmoji = (emoji) => {
        setMessage(prev => prev + emoji);
        setIsEmojiPickerOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="w-full max-w-2xl overflow-hidden bg-white border border-gray-200 shadow-2xl rounded-2xl">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            Reply to Order #{orderDetails.Order_id}
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            {orderDetails.Billing_Name} | {orderDetails.Email} | {orderDetails.Mobilenumber}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 transition-colors hover:text-gray-600"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Message Area */}
                <div className="p-6 space-y-4">
                    {/* Context Information */}
                    <div className="p-4 rounded-lg bg-green-50">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-gray-700">Order Details</p>
                                <p className="text-sm text-gray-500">
                                    Total Amount: ${orderDetails.Total_Amount} |
                                    Status: {orderDetails.Order_Status}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Attachments Preview */}
                    {attachments.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                            {attachments.map((file, index) => (
                                <div
                                    key={index}
                                    className="relative flex items-center px-3 py-2 rounded-lg bg-blue-50"
                                >
                                    <span className="mr-2 text-sm text-blue-700">{file.name}</span>
                                    <button
                                        onClick={() => removeAttachment(index)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Message Input */}
                    <div className="relative">
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type your reply here..."
                            className="w-full min-h-[120px] p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                        />

                        {/* Action Buttons */}
                        <div className="absolute flex items-center space-x-2 bottom-2 right-2">
                            {/* File Upload */}
                            <label className="p-2 transition-colors rounded-full cursor-pointer hover:bg-gray-100">
                                <Paperclip size={20} className="text-gray-500" />
                                <input
                                    type="file"
                                    multiple
                                    className="hidden"
                                    onChange={handleFileUpload}
                                />
                            </label>

                            {/* Emoji Picker */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
                                    className="p-2 transition-colors rounded-full hover:bg-gray-100"
                                >
                                    <Smile size={20} className="text-gray-500" />
                                </button>

                                {isEmojiPickerOpen && (
                                    <div className="absolute right-0 p-2 mb-2 bg-white border rounded-lg shadow-lg bottom-full">
                                        <div className="flex space-x-2">
                                            {quickEmojis.map((emoji, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => addEmoji(emoji)}
                                                    className="text-2xl transition-transform hover:scale-125"
                                                >
                                                    {emoji}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Send Button */}
                <div className="flex justify-end p-6 border-t border-gray-100">
                    <button
                        onClick={handleSendMessage}
                        disabled={!message.trim() && attachments.length === 0}
                        className="flex items-center px-6 py-3 space-x-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        <Send size={18} />
                        <span>Send Reply</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderReplyModal;