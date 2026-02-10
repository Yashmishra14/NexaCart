import React from "react";

const Card = ({
  title,
  subtitle,
  image,
  footer,
  className = "",
  children,
}) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-md p-4 border hover:shadow-lg transition ${className}`}
    >
      {/* Image */}
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-40 object-cover rounded-xl mb-3"
        />
      )}

      {/* Header */}
      {title && <h3 className="text-lg font-semibold">{title}</h3>}
      {subtitle && (
        <p className="text-sm text-gray-500 mb-2">{subtitle}</p>
      )}

      {/* Body */}
      <div className="mb-3">{children}</div>

      {/* Footer */}
      {footer && (
        <div className="border-t pt-2 text-sm text-gray-600">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
