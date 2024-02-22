
import React from 'react';
import {Link} from 'react-router-dom'

function About() {
  return (
    <div className="bg-gray-900 text-white min-h-screen md:mt-[44px] font-custom">
      <div className="container mx-auto p-8 font-anotherFont">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl">About Us</h1>
         
        </header>
        <main>
          <section id="mission" className="mb-8">
            <h2 className="text-2xl mb-4">Our Mission</h2>
            <p className="mb-4">Our mission at MindStream is to provide a space where individuals from diverse backgrounds can engage in meaningful discussions, share insights, and inspire one another. We strive to cultivate a culture of curiosity, open-mindedness, and mutual respect, empowering our members to explore new ideas and expand their horizons.</p>
          </section>
          <section id="offer" className="mb-8">
            <h2 className="text-2xl mb-4">What We Offer</h2>
            <ul className="list-disc pl-4 mb-4">
              <li>A dynamic platform for sharing thoughts, ideas, and perspectives on a wide range of topics.</li>
              <li>Opportunities to connect with like-minded individuals and engage in thought-provoking conversations.</li>
              <li>Regular events, discussions, and collaborative projects to stimulate creativity and innovation.</li>
              <li>Resources and tools to support personal and professional development, including articles, podcasts, and workshops.</li>
            </ul>
          </section>
          <section id="community" className="mb-8">
            <h2 className="text-2xl mb-4">Our Community</h2>
            <p className="mb-4">MindStream is more than just a website—it's a community of thinkers, creators, and innovators who are passionate about making a positive impact in the world. Our diverse community includes individuals from various fields, backgrounds, and interests, united by a shared commitment to intellectual curiosity and growth.</p>
          </section>
          <section id="join">
            <h2 className="text-2xl mb-4">Join Us</h2>
            <p className="mb-4">Whether you're a seasoned thinker or just beginning your journey of exploration, we invite you to join us on MindStream. Together, let's embark on a journey of discovery, learning, and inspiration. Join our community today and become part of the MindStream movement!</p>
            <Link to="/signUp" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Sign Up</Link>
          </section>
        </main>
        <footer className="text-center mt-8">
          <p>&copy; 2024 MindStream. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default About;
