"use client"
import React, { useState, useEffect } from 'react'
import Footer from '@/components/Footer'
import StaggerText from '@/utils/Animation/StaggerText'
import EmailCopy from '@/utils/EmailCopy'
import ScrollReveal from '@/utils/Animation/ScrollReveal'

const page = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle');

  // Automatically clear feedback after 4 s
  useEffect(() => {
    if (status === 'sent' || status === 'error') {
      const t = setTimeout(() => setStatus('idle'), 4000);
      return () => clearTimeout(t);
    }
  }, [status]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setStatus('loading');

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      await res.json();

      if (!res.ok) {
        setStatus('error');
        return;
      }

      // success
      setStatus('sent');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setStatus('error');
    }
  }

  return (
    <div
      className=" 
           min-h-screen
           pt-[180px]
           flex flex-col
           gap-12 md:gap-34"
    >
      <ScrollReveal direction='up'>
        <div className="flex flex-col bg-white dark:bg-black px-[20px] md:px-[80px] mb-24 md:mb-32">
          <StaggerText
            text="SHOOT   A"
            className="text-[76px] md:text-[116px] lg:text-[200px] font-bold leading-none tracking-[-0.09em] whitespace-pre"
            distance={100}
            delay={0}
            letterDelay={0.07}
          />
          <StaggerText
            text="MESSAGE"
            className="text-[76px] md:text-[116px] lg:text-[200px] font-bold leading-none tracking-[-0.09em]"
            distance={100}
            delay={0.2}
            letterDelay={0.07}
          />
        </div>

        {/* Form Section */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 bg-white dark:bg-black px-[20px] md:px-[80px] pb-[140px]">
          {/* Left Column: Email */}
          <div className="w-full md:w-1/3 items-center justify-center ">
            <EmailCopy email="mrkaxelus@gmail.com" className="text-[25px] md:text-[30px] font-medium antialiased" />
          </div>

          {/* Right Column: Form */}
          <div className="w-full md:w-2/3">
            <form 
              onSubmit={handleSubmit} 
              className="flex flex-col gap-6"
            >
              <input
                type="text"
                placeholder="Your Name"
                name="name"
                className="bg-neutral-100 dark:bg-neutral-800 p-7 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 border-b-2 border-neutral-300 dark:border-neutral-600 focus:border-b-neutral-900 dark:focus:border-b-neutral-100 focus:outline-none transition-all duration-300"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                />
              <input
                type="email"
                placeholder="Your Email"
                name="email"
                className="bg-neutral-100 dark:bg-neutral-800 p-7 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 border-b-2 border-neutral-300 dark:border-neutral-600 focus:border-b-neutral-900 dark:focus:border-b-neutral-100 focus:outline-none transition-all duration-300"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
              <textarea
                placeholder="Say Hello!"
                name="message"
                rows={6}
                className="bg-neutral-100 dark:bg-neutral-800 p-7 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 border-b-2 border-neutral-300 dark:border-neutral-600 focus:border-b-neutral-900 dark:focus:border-b-neutral-100 focus:outline-none transition-all duration-300"
                value={message}
                onChange={(e)=>setMessage(e.target.value)}
                />
              <button
                type="submit"
                className="bg-neutral-900 dark:bg-neutral-800 text-white p-7  font-medium hover:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors"
              >
                {status==='idle' ? 'Send It!' : ''}
                {status==='loading' && <span className="ml-2">Sending...</span>}
                {status==='sent' && <span className="ml-2">Sent!</span>}
                {status==='error' && <span className="ml-2">Something went wrong. Try again.</span>}
              </button>
            </form>
          </div>
        </div>
      </ScrollReveal>
      {/* New Footer */}
      <Footer />
    </div>
  )
}

export default page