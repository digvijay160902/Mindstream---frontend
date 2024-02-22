import React from 'react';
import Footer from './Footer';

export default function Contact() {
  return (
    <div className='mt-[44px]'>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg font-anotherFont">
          <h2 className="text-3xl font-semibold mb-6 text-center">Send us a message</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="Name" className="block text-gray-700 font-semibold mb-1">Name</label>
              <input type="text" id="Name" placeholder="Enter Your Name" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-500" />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">Email</label>
              <input type="email" id="email" placeholder="Enter Your Email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-500" />
            </div>

            <div>
              <label htmlFor="phone" className="block text-gray-700 font-semibold mb-1">Phone Number</label>
              <input type="text" id="phone" placeholder="Enter Your Phone Number" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-500" />
            </div>

            <div>
              <label htmlFor="subject" className="block text-gray-700 font-semibold mb-1">Subject</label>
              <input type="text" id="subject" placeholder="Write Subject" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-500" />
            </div>

            <div>
              <label htmlFor="msg" className="block text-gray-700 font-semibold mb-1">Message</label>
              <textarea id="msg" rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-500"></textarea>
            </div>

            <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-500">Submit</button>
          </form>
        </div>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  );
}
