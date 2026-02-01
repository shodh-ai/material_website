export default function DemoPage() {
  return (
    <main className="h-screen w-full bg-black">
      <iframe
        title="Summit Demo"
        src="/demo/index.html"
        className="h-full w-full border-0"
        sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-same-origin allow-scripts"
      />
    </main>
  );
}
