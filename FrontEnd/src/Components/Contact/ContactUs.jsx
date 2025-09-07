import React, { useState } from 'react';
import {
  Mail,
  Phone,
  Instagram,
  Facebook,
  MailIcon,
  MapPin,
  Clock,
  Send,
  CheckCircle
} from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const AnimatedCard = ({ icon, title, details, delay = 0 }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out transform ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="h-full rounded-xl shadow-md hover:shadow-xl transition-all duration-500 group-hover:scale-105 bg-white bg-opacity-60 backdrop-blur-md">
        <div className="p-8 text-center space-y-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-medical-primary to-medical-accent opacity-10 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-700"></div>
          <div className="relative z-10">
            <div className="w-16 h-16 mx-auto mb-6 p-4 rounded-2xl icon-gradient shadow-md flex items-center justify-center text-white">
              {icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-medical-primary transition-colors duration-300">
              {title}
            </h3>
            <div className="text-gray-600 leading-relaxed">{details}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactUs = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const { ref: headerRef, inView: headerInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const { ref: formRef, inView: formInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactCards = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Hospital Hours',
      details: (
        <div className="space-y-2">
          <div className="font-semibold text-medical-primary">Mon–Fri: 9:00 AM–4:00 PM</div>
          <div className="font-semibold text-medical-primary">Sat–Sun: 6:00 PM–9:00 PM</div>
          <p className="text-sm mt-3">Walk-ins welcome during operating hours</p>
        </div>
      ),
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: 'Call Us',
      details: (
        <div className="space-y-2">
          <div className="text-2xl font-bold text-medical-primary">+91 9535261996</div>
          <div className="text-sm">Mon–Fri: 9:00 AM–4:00 PM</div>
          <div className="text-sm italic text-medical-accent">Weekends: Use chat or email</div>
        </div>
      ),
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: 'Email Support',
      details: (
        <div className="space-y-2">
          <div className="font-semibold text-medical-primary">healthyayurveda.patil@gmail.com</div>
          <div className="text-sm">Response within 24 hours</div>
          <div className="text-sm">Mon–Fri: 9:00 AM–4:00 PM</div>
          <div className="text-sm">Sat–Sun: 10:00 AM–12:00 PM</div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white">
      {/* Header */}
      <div
        ref={headerRef}
        className={`transition-all duration-1000 ease-out ${
          headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
        }`}
      >
        <div className="header-gradient py-20 px-4 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Get In Touch</h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto leading-relaxed">
              We're here to help and answer any questions you might have.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-12 relative z-10">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contactCards.map((item, index) => (
            <AnimatedCard key={index} {...item} delay={index * 200} />
          ))}
        </div>

        {/* Contact Form */}
        <div
          ref={formRef}
          className={`transition-all duration-800 ease-out ${
            formInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="max-w-2xl mx-auto rounded-xl shadow-xl bg-white bg-opacity-60 backdrop-blur-md p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Send Us A Message</h2>
              <p className="text-gray-600">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>

            {isSubmitted ? (
              <div className="text-center py-8 animate-fade-in">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-green-600 mb-2">Message Sent Successfully!</h3>
                <p className="text-gray-600">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-800">Full Name *</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-medical-primary focus:border-transparent"
                      
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-800">Email Address *</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-medical-primary focus:border-transparent"
                      
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-gray-800">Phone Number</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-medical-primary focus:border-transparent"
                      placeholder="+91 "
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-gray-800">Subject *</label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-medical-primary focus:border-transparent"
                      placeholder="How can we help?"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-800">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-medical-primary focus:border-transparent resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <button
  type="submit"
  className="w-full py-4 text-lg font-semibold text-white bg-gradient-to-br from-[var(--medical-primary)] to-[var(--medical-accent)] rounded-lg hover:shadow-xl transition-transform transform hover:scale-105 flex items-center justify-center"
>
  <Send className="w-5 h-5 mr-2" />
  Send Message
</button>

              </form>
            )}
          </div>
        </div>

        {/* Social Media */}
        <div className="mt-16 pb-16">
          <div className="max-w-4xl mx-auto shadow-md rounded-xl bg-white bg-opacity-60 backdrop-blur-md p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Connect With Us</h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Follow us on social media for the latest updates, health tips, and community news.
            </p>
            <div className="flex justify-center space-x-6">
              {[
                {
                  href: 'https://www.instagram.com/dr_sangamesh_patil?igsh=MXAwdDNkN2V5b2tudg==',
                  icon: <Instagram className="w-6 h-6 text-white" />,
                },
                {
                  href: 'https://www.facebook.com/your_healthcare',
                  icon: <Facebook className="w-6 h-6 text-white" />,
                },
                {
                  href: 'mailto:healthyayurveda.patil@gmail.com',
                  icon: <MailIcon className="w-6 h-6 text-white" />,
                },
                {
                  href: 'https://www.google.com/maps/place/Navajeevan+Ayurveda+Chikistalaya/@15.781671,76.4516469,17z/data=!3m1!4b1!4m6!3m5!1s0x3bb81fb3c0c53a45:0x2e0e8cd6c7b60dab!8m2!3d15.781671!4d76.4516469!16s%2Fg%2F11kt8tc5_j?entry=ttu&g_ep=EgoyMDI1MDkwMi4wIKXMDSoASAFQAw%3D%3D',
                  icon: <MapPin className="w-6 h-6 text-white" />,
                },
              ].map(({ href, icon }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <div className="social-icon">
                    {icon}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
