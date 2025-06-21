import React from "react";
import Link from "next/link";

type ShowMoreProps = {
  href: string;
}

const ShowMore = ({ href }: ShowMoreProps) => {
  return (
    <div className="flex items-center">
      <Link href={href} className="bg-[rgb(245,245,245)] dark:bg-neutral-800 dark:text-white w-[133px] h-[51px] tracking-[-0.04em] flex items-center justify-center font-medium">
          Show more
      </Link>
    </div>
  );
};

export default ShowMore;
