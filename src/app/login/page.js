import { Suspense } from "react";
import AuthForm from "@/components/AuthForm";
import Loading from "@/components/Loading";

export const metadata = { title: "Login" };

export default function LoginPage() {
  return (
    <Suspense fallback={<Loading />}>
      <AuthForm mode="login" />
    </Suspense>
  );
}
