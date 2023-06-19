import React from 'react';
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const copyright = `@ ${currentYear} STAR. All Rights Reserved`;

  return (
    <div>
      <div className="footer flex flex-col md:flex-row items-center justify-around p-4">
        <div className="footer-menu">
          <p className="footer-menu-heading text-white font-medium">Company</p>
          <ul className="f-menu">
            <li>
              <a href="/" className='text-blue-400'>About Us</a>
            </li>
            <li>
              <a href="/" className='text-blue-400'>Careers</a>
            </li>
          </ul>
        </div>
        <div className="footer-menu">
          <p className="footer-menu-heading text-white font-medium">View website in</p>
          <ul className="f-menu">
            <li>
              <a href="/" className='text-blue-400'>English</a>
            </li>
            <li>
              <a href="/" className='text-blue-400'>Spanish</a>
            </li>
          </ul>
        </div>
        <div className="footer-menu">
          <p className="footer-menu-heading text-white font-medium">Need Help?</p>
          <ul className="f-menu">
            <li>
              <a href="/" className='text-blue-400'>Visit Help Centre</a>
            </li>
            <li>
              <a href="/" className='text-blue-400'>Share Feedback</a>
            </li>
          </ul>
        </div>
      </div>
      <p className="text-center text-gray-500 mt-4">{copyright}</p>
    </div>
  );
};

export default Footer;
