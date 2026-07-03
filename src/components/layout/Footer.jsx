import React from 'react';

export function Footer() {
  return (
    <footer className="app-footer animate-fade-in">
      <p>
        © {new Date().getFullYear()} ⚡ <strong>SparkMind</strong>. All rights reserved. 
        <br />
        Designed with care for a positive mind. 
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer-link">
          GitHub
        </a>
      </p>
    </footer>
  );
}
