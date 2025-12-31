"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ModalCloseOnEsc = () => {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        router.push("/about", { scroll: false });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [router]);

  return null;
};

export default ModalCloseOnEsc;
