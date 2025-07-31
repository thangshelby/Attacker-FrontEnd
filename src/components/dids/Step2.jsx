import React from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
const Step2 = () => {
  const [value, setValue] = React.useState("");

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-lg font-semibold">Check your email</h1>
      <p className="text-muted-foreground max-w-[60%] text-sm">
        Your code was sent to you via email.
      </p>
      <div className="space-y-2">
        <InputOTP
          maxLength={6}
          value={value}
          onChange={(value) => setValue(value)}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <div className="text-center text-sm">
          {value === "" ? (
            <>Enter your one-time password.</>
          ) : (
            <>You entered: {value}</>
          )}
        </div>
        <div className="mx-8 cursor-pointer rounded-2xl bg-blue-500 py-1 text-center text-lg font-semibold text-white">
          Verify
        </div>
      </div>
    </div>
  );
};

export default Step2;