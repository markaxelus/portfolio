"use client"
import React, { useRef } from 'react'
import emailjs from "emailjs-com"


const Contact = () => {
    const form = useRef<HTMLFormElement>(null);

    const sendEmail = (e:React.FormEvent) => {
        e.preventDefault();

        if(!form.current) return;

        emailjs.sendForm(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
            form.current,
            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
        ).then (
            (result) => {
                alert('Message sent, \ Thank you !')
                form.current?.reset();
            },
            (err) => {
                alert('Message failed to send.');
                console.error(err);
            }
        )
    }


  return (
    

    <form
        ref={form}
        onSubmit={sendEmail}
        className="rounded-lg w-full max-w-2xl space-y-4 "
    >
        {/* Name + Email Row */}
        <div className="flex gap-4 w-full">
            <input
            type="text"
            name="user_name"
            placeholder="Name"
            required
            className="flex-1 border-black border px-4 py-2 h-16"
            />
            <input
            type="email"
            name="user_email"
            placeholder="Email"
            required
            className="flex-1 border-black border px-4 py-2"
            />
        </div>

        {/* Message Box */}
        <textarea
            name="message"
            placeholder="Your message..."
            rows={6}
            required
            className="w-full border-black border px-4 py-4 resize-none"
        />

        {/* Send Button aligned right */}
        <div className="w-full flex justify-end">
            <button
            type="submit"
            className="flex items-center font-medium px-5 py-2 gap-2 border-black border transition"
            >
            Send it
            <div className="w-5 h-5 text-green-500">
                <svg
                className="w-full h-full stroke-current"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                    d="M5 12H19M19 12L13 6M19 12L13 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                </svg>
            </div>
            </button>
        </div>
    </form>

        

  )
}

export default Contact