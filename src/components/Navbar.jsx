import React, { useState, useEffect } from 'react';
import { Menu, Close, ExpandMore } from '@mui/icons-material';
import logoImage from '/assets/image.webp';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTrainingDropdownOpen, setIsTrainingDropdownOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Event', href: '/events' },
    { 
      name: 'Training', 
      href: '/training',
      dropdown: ['LOGIC Foundation class', 'LOGIC Discipleship class', ]
    }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleTrainingDropdown = () => {
    setIsTrainingDropdownOpen(!isTrainingDropdownOpen);
  };

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`z-50 w-full px-4 fixed py-4 transition-all duration-300 ${
      isScrolled ? 'bg-black shadow-lg' : ''
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img 
            src={logoImage} 
            alt="LOGIC Church Logo" 
            className="h-12 w-auto"
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <div key={link.name} className="relative">
              {link.dropdown ? (
                <div className="relative">
                  <button
                    onClick={toggleTrainingDropdown}
                    className={`relative flex items-center gap-1 px-4 py-2 font-medium transition-all duration-300 hover:scale-105 ${
                      isScrolled ? 'text-white' : 'text-white'
                    }`}
                  >
                    {link.name}
                    <ExpandMore className="text-sm" />
                    <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-red transition-all duration-300 ${
                      activeLink === link.name ? 'w-full' : 'w-0'
                    }`}></span>
                  </button>
                  
                  {isTrainingDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-60 backdrop-blur-sm bg-white/10 border border-white/20 rounded-lg shadow-lg">
                      {link.dropdown.map((item, index) => (
                        <a
                          key={index}
                          href="#"
                          className="block px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
                          onClick={() => handleLinkClick(item)}
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  href={link.href}
                  onClick={() => handleLinkClick(link.name)}
                  className={`relative px-4 py-2 font-medium transition-all duration-300 hover:scale-105 ${
                    isScrolled ? 'text-white' : 'text-white'
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-red transition-all duration-300 ${
                    activeLink === link.name ? 'w-full' : 'w-0'
                  }`}></span>
                </a>
              )}
            </div>
          ))}
          
          {/* Join Our Forum Button */}
          <button className="bg-gradient-red text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
            Join Our Forum
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={toggleMobileMenu}
            className={`p-2 rounded-lg hover:backdrop-blur-sm hover:bg-white/10 transition-colors duration-200 ${
              isScrolled ? 'text-white' : 'text-white'
            }`}
          >
            {isMobileMenuOpen ? <Close className="text-2xl" /> : <Menu className="text-2xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full mt-2 px-4">
          <div className="backdrop-blur-md bg-black/50 rounded-lg border border-white/20 shadow-xl">
            <div className="p-4 space-y-3">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.dropdown ? (
                    <div>
                      <button
                        onClick={toggleTrainingDropdown}
                        className={`flex items-center justify-between w-full px-4 py-3 rounded-lg text-white font-medium transition-all duration-300 ${
                          activeLink === link.name 
                            ? 'border border-red-500 backdrop-blur-sm bg-white/10' 
                            : 'hover:backdrop-blur-sm hover:bg-white/10'
                        }`}
                      >
                        {link.name}
                        <ExpandMore className={`text-sm transition-transform duration-200 ${isTrainingDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {isTrainingDropdownOpen && (
                        <div className="mt-2 ml-4 space-y-2">
                          {link.dropdown.map((item, index) => (
                            <a
                              key={index}
                              href="#"
                              className="block px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
                              onClick={() => handleLinkClick(item)}
                            >
                              {item}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <a
                      href={link.href}
                      onClick={() => handleLinkClick(link.name)}
                      className={`block px-4 py-3 rounded-lg text-white font-medium transition-all duration-300 ${
                        activeLink === link.name 
                          ? 'border border-red-500 backdrop-blur-sm bg-white/10' 
                          : 'hover:backdrop-blur-sm hover:bg-white/10'
                      }`}
                    >
                      {link.name}
                    </a>
                  )}
                </div>
              ))}
              
              {/* Mobile Join Our Forum Button */}
              <button className="w-full bg-gradient-red text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg mt-4">
                Join Our Forum
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
