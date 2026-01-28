import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "600", "700", "800"],
    variable: "--font-montserrat",
});

export const metadata: Metadata = {
    title: "Inscription Solidatech | Association LÉA",
    description:
        "Formulaire d'inscription au programme Solidatech - Association LÉA : L'Écoute, l'Accompagnement.",
    keywords: [
        "association",
        "LEA",
        "handicap",
        "solidatech",
        "familles",
        "soutien",
        "accompagnement",
    ],
    authors: [{ name: "Association LÉA" }],
    openGraph: {
        title: "Inscription Solidatech | Association LÉA",
        description: "Inscription au programme Solidatech pour l'Association LÉA",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr" className={montserrat.variable}>
            <body className={`${montserrat.className} antialiased`}>
                {children}
            </body>
        </html>
    );
}
