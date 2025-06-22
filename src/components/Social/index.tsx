import React from 'react'
import { IconType } from "react-icons"

type SocialProps = {
  name: string;
  href: string;
  icon: IconType;
}

const SocialIcon = ({ name, href, icon:Icon }: SocialProps) => {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={name}
      className=''
    >
      <Icon className="w-6 h-6 place-items-center" /> 
    </a>
  )
}

export default SocialIcon