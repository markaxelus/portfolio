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
    

    <form ref={form} onSubmit={sendEmail} className="space-y-4">
      <input
        type="text"
        name="user_name"
        placeholder="Your Name"
        required
        className="border px-3 py-2 rounded-md"
      />
      <input
        type="email"
        name="user_email"
        placeholder="Your Email"
        required
        className="border px-3 py-2 rounded-md"
      />
      <textarea
        name="message"
        placeholder="Your Message"
        rows={5}
        required
        className="border px-3 py-2 rounded-md"
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">
        Send Message
      </button>
    </form>

        

  )
}

export default Contact