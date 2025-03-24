"use client"
import React, { useRef } from 'react'
import emailjs from "emailjs-com"


const Contact = () => {
    const form = useRef<HTMLFormElement>(null);

    const sendEmail = (e:React.FormEvent) => {
        e.preventDefault();

        if(!form.current) return;

        emailjs.sendForm(
            process.env.SERVICE_ID!,
            process.env.TEMPLATE_ID!,
            form.current,
            process.env.PUBLIC_KEY!
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
        className=''
    >
        <input type='text' name='' placeholder='' required />
        <input type='email' name='' placeholder='' required />
        <textarea name='' placeholder='' required rows={5}/>
        <button type='submit' className=''>

        </button>
    

        <div className='flex gap-6 border-b-200 '>
            <form>
                
            </form>


            <div className="flex flex-col ">
                <h1 className="text-2xl font-semibold leading-tight">
                Contact <br /> Me
                </h1>
                <p className="text-lg text-gray-400">Say Hello!</p>
            </div>

            <div className='relative w-12 h-12 border-2 border-gray-400 rounded-full p-2 text-green-500'>
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
        </div>

        </form>
  )
}

export default Contact