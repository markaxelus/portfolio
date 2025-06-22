import React from "react";
import Link from "next/link";

type ShowMoreProps = {
  href: string;
  buttonLabel?: string;
  style?: React.CSSProperties;
}

const ShowMore = ({ href, buttonLabel, style,  }: ShowMoreProps) => {
  return (
    <div className="flex items-center">
      <Link href={href} style={style} className="bg-[rgb(245,245,245)] dark:bg-neutral-800 dark:text-white w-[133px] h-[51px] tracking-[-0.04em] flex items-center justify-center font-medium">
          {buttonLabel}
      </Link>
    </div>
  );
};

export default ShowMore;
