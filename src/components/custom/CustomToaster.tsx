import { Toaster } from "@/components/ui/sonner";

export function CustomToaster() {
  return (
    <Toaster
      className="!bg-opacity-40" // Make background slightly transparent
      toastOptions={{
        classNames: {
          toast: "bg-gray-800/90 text-white", // Semi-transparent background
          description: "text-gray-300",
          actionButton: "bg-blue-500",
          cancelButton: "bg-gray-500",
        },
      }}
    />
  );
} 