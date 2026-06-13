import React from 'react';

const Card = ({ category, title, description, authorName, date, image }) => {
  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
      
      <div className="w-full h-48 bg-gray-100 relative">
        <img 
          src={image || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-5 flex flex-col flex-grow">
        
        <div className="mb-3">
          <span className="bg-blue-50 text-blue-600 border border-blue-100 text-xs font-bold px-3 py-1 rounded-full">
            {category}
          </span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
          {title}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-3 mb-4">
          {description}
        </p>

        <div className="mt-auto flex items-center gap-3 pt-4 border-t border-gray-100">
          <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
            <img 
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${authorName}`} 
              alt={`${authorName}'s avatar`} 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-900">{authorName}</p>
            <p className="text-xs text-gray-500">{date}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Card;