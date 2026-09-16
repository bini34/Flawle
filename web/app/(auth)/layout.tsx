import { BorderBeam } from "@/components/ui/border-beam";
import type { ReactNode } from "react";

export default function AuthLayout({
	children,
}: Readonly<{ children: ReactNode }>) {
	return (
		<main className="">
				{children}
        <BorderBeam
        duration={6}
        size={400}
        className="from-transparent via-red-500 to-transparent"
      />
      <BorderBeam
        duration={6}
        delay={3}
        size={400}
        borderWidth={2}
        className="from-transparent via-blue-500 to-transparent"
      />
		</main>
	);
}
