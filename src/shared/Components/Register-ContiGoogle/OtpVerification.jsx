import { Button, Input } from "@nextui-org/react";
import { Dialog } from "primereact/dialog";

const OtpVerificationModal = ({loading,showOtpModal,setShowOtpModal,handleVerifyOtp, formData,selected,otp,handleOtpChange,verificationLoading,handleManualSubmit}) => (
    <Dialog  visible={showOtpModal}  onHide={() => setShowOtpModal(false)} style={{ width: "45vw" }} className="overflow-hidden" breakpoints={{ "960px": "75vw", "641px": "100vw" }} >
      <form onSubmit={handleVerifyOtp} className="p-6">
        <h2 className="mb-6 text-xl font-semibold text-center">Verify OTP</h2>
        <p className="mb-4 text-sm text-center text-gray-600">
          Please enter the OTP sent to{" "}
          <span className="font-medium">
            {selected === 'Email' ? formData.Email : formData.Mobilenumber}
          </span>
        </p>

        <Input type="text" label="Enter OTP" placeholder="Enter 4-digit OTP" value={otp} onChange={handleOtpChange} required maxLength={4} pattern="\d{4}" isDisabled={verificationLoading}
          variant="bordered"
          classNames={{
            input: "text-center text-xl tracking-wider",
            inputWrapper: "border-2 focus-within:border-green-500",
          }}
        />

        <Button type="submit" className="w-full mt-6 text-white bg-green-500" size="lg" isLoading={verificationLoading} >
          {verificationLoading ? 'Verifying...' : 'Verify OTP'}
        </Button>

        <div className="mt-4 text-center">
          <Button variant="light" className="text-sm text-gray-600" onPress={() => handleManualSubmit({ preventDefault: () => {} })} isDisabled={loading} >
            Didn&apos;t receive OTP? Resend
          </Button>
        </div>
      </form>
    </Dialog>
  );

  export default OtpVerificationModal;