import { m } from "framer-motion";
import type { NextPage } from "next";
import { NextSeo, NextSeoProps } from "next-seo";
import dynamic from "next/dynamic";

const Footer = dynamic(() => import("../components/Footer"));

const Contact: NextPage = () => {
    
    const SEO: NextSeoProps = {
        title: "Snacks | Ladu Samrat",
        description: "Snacks offered at Ladu Samrat",
        openGraph: {
            title: "Snacks | Ladu Samrat",
            description: "Snacks offered at Ladu Samrat",
        },
    };
    
    return (
        <m.div
            initial={{
                opacity: 0,
                y: -50,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            exit={{
                opacity: 0,
                y: 50,
            }}
        >
            <NextSeo {...SEO} />

            <main>
              <h1>Contact</h1>
            </main>

            <Footer />
        </m.div>
    );
}

export default Contact