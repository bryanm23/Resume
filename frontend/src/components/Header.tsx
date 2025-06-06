import React from 'react';
import { Resume } from '../data/resume';

interface HeaderProps {
  basics: Resume['basics'];
}

const Header: React.FC<HeaderProps> = ({ basics }) => {
  return (
    <header className="text-center py-12 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
      <h1 className="text-4xl font-bold mb-2">{basics.name}</h1>
      <h2 className="text-xl mb-4">{basics.label}</h2>
      <div className="flex justify-center space-x-4 mb-4">
        <span>{basics.phone}</span>
        <span>•</span>
        <span>{basics.location}</span>
      </div>
      <div className="flex justify-center space-x-4">
        <a
          href={`mailto:${basics.email}`}
          className="text-blue-300 hover:text-blue-100 underline"
        >
          Email
        </a>
        {basics.profiles.map((profile) => (
          <a
            key={profile.network}
            href={profile.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300 hover:text-blue-100 underline"
          >
            {profile.network}
          </a>
        ))}
      </div>
      <p className="mt-6 max-w-2xl mx-auto text-lg">{basics.summary}</p>
    </header>
  );
};

export default Header; 