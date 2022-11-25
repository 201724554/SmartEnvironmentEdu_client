import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
  render() {
    return (
      <footer>
        <div id="bottomMenu">
          <ul>
            <li>
              <a href="#">센터 소개</a>
            </li>
            <li>
              <a href="#">이용약관</a>
            </li>
            <li>
              <a href="#">개인정보처리방침</a>
            </li>
          </ul>
        </div>
        <div id="company">
          <p>부산광역시 금정구 (대표전화) 123-456-7890</p>
        </div>
        <div id="right">
          <p>© 2022 Company, Inc. All rights reserved.</p>
        </div>
      </footer>
    );
  }
}

export default Footer;
