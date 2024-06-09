"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import { PartyPopper, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { verify_token } from "@/services/verify-token";

const VerifyEmail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(true);

  useEffect(() => {
    const userId = searchParams.get("user-id");
    const token = searchParams.get("verification-token");

    const verify = async () => {
      if (token && userId) {
        const result = await verify_token({ token, userId });
        if (result?.error) setErrorMessage(result?.error);
      }
      setIsValidating(false);
    };

    verify().catch((error) => {
      setErrorMessage(`${error}`);
      setIsValidating(false);
    });
  }, [searchParams]);

  return isValidating ? (
    <Loading text="Verifying token..." />
  ) : (
    <div className="bg-white px-8 py-16 relative w-[400px] max-w-full flex flex-col gap-8 items-center shadow rounded-xl">
      <div
        className={`w-[75px] h-[75px] ${errorMessage ? "bg-red-400" : "bg-green-400"} rounded-full flex text-white items-center justify-center`}>
        {errorMessage ? <X size={48} /> : <PartyPopper size={48} />}
      </div>
      <h2 className="uppercase font-bold text-xl">
        {errorMessage ? "Error" : "Welcome!"}
      </h2>
      <p className="text-center">
        {errorMessage
          ? errorMessage
          : "Your email was successfully verified. You can now log in to your account to enjoy our services."}
      </p>
      {!errorMessage && (
        <Button className="block w-full text-center" asChild>
          <Link href={"/auth/login"}>Login</Link>
        </Button>
      )}
    </div>
  );
};

export default VerifyEmail;
