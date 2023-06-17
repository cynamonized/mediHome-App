import React, { useEffect, useState } from "react";
import "../../scss/main.scss";
import { MainButton } from "./Buttons";

export const Footer = () => {
  return (
    <section className="footer">
      <div className="container container-footer">
        <div className="footer__top-part">
          <div className="footer__first-column-logo">
            <img
              src="/images/logo - mediHome - white.svg"
              alt=""
              className="first-column-logo__logo"
            />
            <p className="footer__text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              libero sapien, volutpat sed leo ac, dictum placerat ante. In porta
              risus ut turpis eleifend, vitae hendrerit velit venenatis.
            </p>
          </div>
          <div className="footer__second-column-pages">
            <h6 className="footer__title">Pages</h6>
            <ul className="footer__menu-list">
              <a href="#">
                <li>Home</li>
              </a>
              <a href="#">
                <li>Service</li>
              </a>
              <a href="#">
                <li>About us</li>
              </a>
              <a href="#">
                <li>Contact</li>
              </a>
            </ul>
          </div>
          <div className="footer__third-column-utility-pages">
            <h6 className="footer__title">Utility Pages</h6>
            <ul className="footer__menu-list">
              <a href="#">
                <li>Home</li>
              </a>
              <a href="#">
                <li>Service</li>
              </a>
              <a href="#">
                <li>About us</li>
              </a>
              <a href="#">
                <li>Contact</li>
              </a>
            </ul>
          </div>
          <div className="footer__fourth-column-newsletter">
            <h6 className="footer__title">Newsletter</h6>
            <p className="footer__text">
              Sign up for our newsletter to receive weekly knowledge about
              well-being!
            </p>
            <input
              type="email"
              className="white-form fourth-column-newsletter__email-form"
              placeholder="Write your email here"
            />
            <MainButton>contact us</MainButton>
          </div>
        </div>

        <div className="footer__bottom-part">
          <div className="bottom-part__line"></div>
          <div className="bottom-part__copyright">
            <p>
              <span className="copyright__company">mediHome</span> - created by
              <span className="copyright__name"> Mateusz Hofman</span>, 2023
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
