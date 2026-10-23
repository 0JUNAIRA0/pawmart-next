import { Suspense } from "react";
import AuthForm from "@/components/AuthForm";
import Loading from "@/components/Loading";

export const metadata = { title: "Register" };

export default function RegisterPage() {
  return (
    <Suspense fallback={<Loading />}>
      <AuthForm mode="register" />
    </Suspense>
  );
}
