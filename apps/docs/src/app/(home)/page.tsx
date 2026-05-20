import TechStackSet from "@/components/tech-stack-set";
import { CopyCodeBlock } from "@/components/ui/copy-code-block";
import { Icons } from "@/components/ui/icons";
import * as motion from "motion/react-client";

export default function HomePage() {
  return (
    <>
      <section className="p-12">
        <div className="mx-auto max-w-340">
          <div className="max-w-prose space-y-5">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-start text-2xl text-balance"
            >
              The production-grade starter kit for modern full-stack applications
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <CopyCodeBlock value="npx degit stack-found/vazen <Your-Project>" />
            </motion.div>
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16, ease: [0.25, 0.46, 0.45, 0.94] }}
              href="https://web.vazen.dev"
              target="_blank"
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-black px-4 py-3 text-[14px] text-white dark:bg-white dark:text-black"
            >
              See Demo
              <Icons.LinkSquare />
            </motion.a>
          </div>
        </div>
      </section>
      <section className="mt-12 p-3">
        <div className="mx-auto max-w-340">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.123, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative w-full border border-[#AAAAAA] bg-[#F0F0F0] p-5 dark:border-neutral-500 dark:bg-neutral-900"
          >
            <span className="absolute top-0 left-0 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black dark:bg-white" />
            <span className="absolute top-0 right-0 size-2 translate-x-1/2 -translate-y-1/2 rounded-full bg-black dark:bg-white" />
            <span className="absolute bottom-0 left-0 size-2 -translate-x-1/2 translate-y-1/2 rounded-full bg-black dark:bg-white" />
            <span className="absolute right-0 bottom-0 size-2 translate-x-1/2 translate-y-1/2 rounded-full bg-black dark:bg-white" />
            <CirclePattern />
            <div className="flex flex-col items-center gap-8 pt-15.5">
              <h1 className="text-md max-w-[330px] text-center text-neutral-600 md:max-w-[380px] md:text-lg dark:text-neutral-200">
                Built with trusted tools powering the modern full-stack web ecosystem
              </h1>
              <TechStackSet />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

function CirclePattern() {
  return (
    <>
      <svg width="100%" height="100%" viewBox="0 0 1320 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="20" fill="currentColor" />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
    </>
  );
}
