import { CreditCard, DollarSign, QrCode, Shield, Truck } from "lucide-react";

const PaymentMethodLoading = ({ selectedPaymentmethod }) => {
    const renderLoadingContent = () => {
      switch (selectedPaymentmethod) {
        case "Cash on Delivery":
          return (
            <div className="relative w-64 h-40 overflow-hidden shadow-lg bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <Truck className="w-20 h-20 text-white animate-bounce" />
              </div>
              <div className="absolute space-y-2 bottom-4 left-4 right-4">
                <div className="w-3/4 h-2 rounded bg-white/30 animate-pulse"></div>
                <div className="w-1/2 h-2 rounded bg-white/30 animate-pulse"></div>
              </div>
              <div className="absolute top-0 left-0 w-full h-full">
                <div className="w-full h-full transform -translate-x-full bg-white/10 animate-shimmer"></div>
              </div>
            </div>
          );
  
        case "Zelle":
          return (
            <div className="p-3">
            <div className="relative w-64 h-40 overflow-hidden shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <QrCode className="w-20 h-20 text-white animate-pulse" />
              </div>
              <div className="absolute space-y-2 bottom-4 left-4 right-4">
                <div className="w-3/4 h-2 rounded bg-white/30 animate-pulse"></div>
                <div className="w-1/2 h-2 rounded bg-white/30 animate-pulse"></div>
              </div>
              <div className="absolute top-0 left-0 w-full h-full">
                <div className="w-full h-full transform -translate-x-full bg-white/10 animate-shimmer"></div>
              </div>
            </div>
            </div>
          );
  
        default: // Online Payment
          return (
            <div className="relative w-64 h-40 overflow-hidden shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
              <div className="absolute top-4 right-4">
                <div className="w-8 h-8 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
              <div className="absolute space-y-2 bottom-4 left-4 right-4">
                <div className="w-3/4 h-2 rounded bg-white/30 animate-pulse"></div>
                <div className="w-1/2 h-2 rounded bg-white/30 animate-pulse"></div>
              </div>
              <div className="absolute top-0 left-0 w-full h-full">
                <div className="w-full h-full transform -translate-x-full bg-white/10 animate-shimmer"></div>
              </div>
            </div>
          );
      }
    };
  
    const getLoadingText = () => {
      switch (selectedPaymentmethod) {
        case "Cash on Delivery":
          return "Preparing Delivery Details";
        case "Zelle":
          return "Loading QR Code";
        default:
          return "Preparing Secure Payment";
      }
    };
  
    const getIcons = () => {
      switch (selectedPaymentmethod) {
        case "Cash on Delivery":
          return [
            { icon: Truck, color: "text-green-500", delay: "0s" },
            { icon: Shield, color: "text-blue-500", delay: "0.3s" },
            { icon: DollarSign, color: "text-yellow-500", delay: "0.6s" }
          ];
        case "Zelle":
          return [
            { icon: QrCode, color: "text-purple-500", delay: "0s" },
            { icon: Shield, color: "text-blue-500", delay: "0.3s" },
            { icon: DollarSign, color: "text-yellow-500", delay: "0.6s" }
          ];
        default:
          return [
            { icon: Shield, color: "text-green-500", delay: "0s" },
            { icon: CreditCard, color: "text-blue-500", delay: "0.3s" },
            { icon: DollarSign, color: "text-yellow-500", delay: "0.6s" }
          ];
      }
    };
  
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-8">
        {/* Payment Method Specific Animation */}
        {renderLoadingContent()}
  
        {/* Security Icons */}
        <div className="flex items-center justify-center space-x-8">
          {getIcons().map(({ icon: Icon, color, delay }, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center animate-bounce" 
              style={{ animationDelay: delay, animationDuration: "2s" }}
            >
              <Icon className={`w-6 h-6 ${color}`} />
              <div className="w-16 h-2 mt-2 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          ))}
        </div>
  
        {/* Processing Text */}
        <div className="space-y-3 text-center">
          <div className="text-lg font-semibold text-gray-700">{getLoadingText()}</div>
          <div className="flex justify-center space-x-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div 
                key={i} 
                className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" 
                style={{ 
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: "1s"
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  // Add this to your CSS or style block
  const styles = `
  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
  
  .animate-shimmer {
    animation: shimmer 2s infinite;
  }
  `;

  export default PaymentMethodLoading;