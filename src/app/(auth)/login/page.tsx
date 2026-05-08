import LoginForm from "@/components/forms/LoginForm";

export default function Login() {
  return (
    <>
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-muted/40 px-4 py-10">
        <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(#000_1px,transparent_1px)] bg-size-[20px_20px]" />
        <div className="absolute -top-40 left-0 h-96 w-96 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
        <LoginForm />
      </main>
    </>
  );
}
