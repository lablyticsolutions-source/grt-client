import socialMediaImage from 'figma:asset/4462a45b444d7f08a73a7961b88a6c504249601f.png';

interface SocialMediaIconsProps {
  position?: 'fixed' | 'relative';
  orientation?: 'vertical' | 'horizontal';
  className?: string;
}

export function SocialMediaIcons({ 
  position = 'fixed', 
  orientation = 'vertical',
  className = '' 
}: SocialMediaIconsProps) {
  const socialLinks = [
    {
      name: 'Facebook',
      url: 'https://facebook.com/gentlerisetherapy',
      icon: (
        <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-600 rounded-lg flex items-center justify-center text-white hover:shadow-lg transition-all duration-300 hover:scale-110">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </div>
      )
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/gentlerisetherapy',
      icon: (
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-lg flex items-center justify-center text-white hover:shadow-lg transition-all duration-300 hover:scale-110">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.875 2.026-1.297 3.323-1.297 1.297 0 2.448.422 3.323 1.297.875.875 1.297 2.026 1.297 3.323s-.422 2.448-1.297 3.323c-.875.875-2.026 1.297-3.323 1.297zm7.83-9.404c-.49 0-.875-.385-.875-.875s.385-.875.875-.875.875.385.875.875-.385.875-.875.875zm0 0"/>
          </svg>
        </div>
      )
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/gentlerisetherapy',
      icon: (
        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center text-white hover:shadow-lg transition-all duration-300 hover:scale-110">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
        </div>
      )
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/company/gentlerisetherapy',
      icon: (
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center text-white hover:shadow-lg transition-all duration-300 hover:scale-110">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </div>
      )
    }
  ];

  const baseClasses = orientation === 'vertical' ? 'flex flex-col space-y-3' : 'flex flex-row space-x-3';
  const positionClasses = position === 'fixed' 
    ? 'fixed right-6 top-1/2 transform -translate-y-1/2 z-50' 
    : 'relative';

  return (
    <div className={`${baseClasses} ${positionClasses} ${className}`}>
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="transform transition-all duration-300 hover:-translate-y-1"
          aria-label={`Follow us on ${social.name}`}
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
}