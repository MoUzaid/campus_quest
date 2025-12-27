import React from 'react'
import "../styles/Header.css"

const Header = () => {
  return (
    <header className="app-header1">
  <div className="left-logo">
    <img src="/campus-quest.png" alt="Campus Quest Logo" />
    <span>Campus Quest</span>
  </div>

  <div className="right-logo">
    <img src="/integral-logo.png" alt="Integral University Logo" />
  </div>
</header>
  )
}

export default Header