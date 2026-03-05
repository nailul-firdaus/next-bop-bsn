"use client";

import Image from "next/image";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-primary">
      <div className="absolute inset-0 bg-[url('/images/watermark.png')] bg-repeat opacity-25 bg-blend-luminosity" />
      <div className="relative w-full max-w-md rounded-xl bg-background p-8 shadow-xl md:p-10">
        <div className="mb-8 flex justify-center">
          <Image
            src="/images/logo_color.svg"
            alt="Bale Syariah by BSN"
            width={100}
            height={100}
            className="h-28 w-auto"
            priority
          />
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="user_id"
              className="text-xs font-semibold text-primary"
            >
              User Id:
            </Label>
            <Input
              id="user_id"
              placeholder="Enter User Id"
              className="h-11 rounded-lg focus-visible:ring-primary"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-xs font-semibold text-primary"
            >
              Password:
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className="h-11 rounded-lg pr-10 focus-visible:ring-primary"
              />
              <Button
                type="button"
                variant="ghost"
                className="absolute right-0 top-0 flex h-full w-10 items-center justify-center text-primary hover:text-primary focus:outline-none hover:bg-primary/25"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" strokeWidth={3} />
                ) : (
                  <Eye className="h-5 w-5" strokeWidth={3} />
                )}
                <span className="sr-only">Toggle password visibility</span>
              </Button>
            </div>
          </div>
          <Button
            type="button"
            onClick={() => {
              document.cookie = "auth-token=true; path=/";

              router.push("/");
            }}
            className="mt-4 h-12 w-full rounded-lg bg-primary font-semibold text-white hover:bg-primary"
          >
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
}
