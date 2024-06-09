"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import { PartyPopper, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { verify_token } from "@/services/verify-token";

const VerifyEmail = () => {
  const router = useRouter();
  const params = useParams();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(true);

  useEffect(() => {
    const userId = params["user-id"] as string;
    const token = params["verification-token"] as string;

    // console.log("URL Params:", { userId, token });

    const verify = async () => {
      if (token && userId) {
        try {
          const result = await verify_token({ token, userId });
          // console.log("Verification Result:", result);
          if (result?.error) {
            setErrorMessage(result.error);
          }
        } catch (error) {
          // console.error("Verification Error:", error);
          setErrorMessage("An error occurred during verification.");
        } finally {
          setIsValidating(false);
        }
      } else {
        setErrorMessage("Missing token or user ID.");
        setIsValidating(false);
      }
    };

    verify();
  }, [params]);

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
