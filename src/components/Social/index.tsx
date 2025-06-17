import React from 'react'
import { LucideIcon } from "lucide-react"

type SocialProps = {
  name: string;
  href: string;
  icon: LucideIcon;
}

const index = ({ name, href, icon:Icon }: SocialProps) => {
  return (
    <a 
      href={href}
      target="_blank"
      className=''
    >
      <Icon className="w-6 h-6 place-items-center" /> 
    </a>
  )
}

export default index