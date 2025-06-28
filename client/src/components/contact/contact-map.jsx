import React from 'react';

const ContactMap = () => {
  return (
    <>
      <section className="tp-map-area pb-120">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="tp-map-wrapper">
                <div className="tp-map-hotspot">
                  <span className="tp-hotspot tp-pulse-border">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="6" cy="6" r="6" fill="#821F40" />
                    </svg>
                  </span>
                </div>
                <div className="tp-map-iframe">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3723.3765244045767!2d105.7751066!3d21.0576187!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31345540ce7e6b65%3A0x489a0b16433dbe44!2zQ2h1bmcgY8awIFRow6FpIEjDoCA0MyBQaOG6oW0gVsSDbiDEkOG7k25n!5e0!3m2!1sen!2s!4v1751116880181!5m2!1sen!2s"></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactMap;