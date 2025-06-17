import React from "react";
import Link from "next/link";

const ShowMore = () => {
  return (
    <div className="flex items-center">
      <Link href="/works" className="bg-[rgb(245,245,245)] w-[133px] h-[51px] tracking-[-0.04em] flex items-center justify-center font-medium">
          Show more
      </Link>
    </div>
  );
};

export default ShowMore;
