import React from 'react';
import { Mail, Phone, MessageSquare, Instagram, Facebook, MailIcon } from 'lucide-react';

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-10">
       <div className="bg-green-400 text-white py-4 rounded-md shadow-md mb-12">
  <h1 className="text-4xl font-bold text-center tracking-wide uppercase">
    Contact Us
  </h1>
</div>

        {/* Top Contact Info Grid */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
  {/* Live Chat */}
  <div className="space-y-6 text-center mt-10 bg-gray-100 rounded-xl py-8 px-4 min-h-[360px]">
    <MessageSquare className="w-10 h-10 mx-auto text-gray-700" />
    <h2 className="text-xl font-semibold">Available At Hospital</h2>
    <p className="text-base text-gray-600 leading-relaxed">
      Mon–Fri: 9:00 AM–4:00 PM<br />
      Sat–Sun: 6:00 PM–9:00 PM
    </p>
  </div>

  {/* Call Us */}
  <div className="space-y-6 text-center mt-10 bg-gray-100 rounded-xl py-8 px-4 min-h-[360px]">
    <Phone className="w-10 h-10 mx-auto text-gray-700" />
    <h2 className="text-xl font-semibold">Call</h2>
    <p className="text-lg font-bold text-gray-800">+91 95352 61996</p>
    <p className="text-base text-gray-600 leading-relaxed">
      Mon–Fri: 9:00 AM–4:00 PM<br />
      Sat & Sun: <em>Closed, use Chat</em>
    </p>
  </div>

  {/* Email Us */}
  <div className="space-y-6 text-center mt-10 bg-gray-100 rounded-xl py-8 px-4 min-h-[360px]">
    <Mail className="w-10 h-10 mx-auto text-gray-700" />
    <h2 className="text-xl font-semibold">Email</h2>
    <p className="text-base text-gray-600 leading-relaxed">
      Submit an email and we’ll respond shortly.
    </p>
    <p className="text-base text-gray-600 leading-relaxed">
      Mon–Fri: 9:00 AM–4:00 PM<br />
      Sat–Sun: 10:00 AM–12:00 PM
    </p>
  </div>
</div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-2xl font-bold text-blue-700 text-center mb-6 font-playfair">SEND US A MESSAGE</h2>

          <form
            action="https://formspree.io/f/YOUR_FORM_ID"
            method="POST"
            className="space-y-3"
          >
            <input name="name" type="text" placeholder="Your Name" className="w-full p-2 border rounded-md text-sm h-10" required />
            <input name="email" type="email" placeholder="Your Email" className="w-full p-2 border rounded-md text-sm h-10" required />
            <input name="phone" type="tel" placeholder="Phone Number" className="w-full p-2 border rounded-md text-sm h-10" />
            <input name="subject" type="text" placeholder="Subject" className="w-full p-2 border rounded-md text-sm h-10" required />
            <textarea name="message" placeholder="Your message (optional)" rows="3" className="w-full p-2 border rounded-md text-sm" />
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Social Media Icons in Gray Bar */}
        <div className="mt-10 rounded-xl py-6">
          <div className="flex justify-center space-x-6">
            <a
              href="https://www.instagram.com/YOUR_INSTAGRAM_USERNAME"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="https://www.facebook.com/YOUR_FACEBOOK_PAGE"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a
              href="mailto:your@email.com"
              className="text-blue-600 hover:text-blue-800 transition"
            >
              <MailIcon className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
