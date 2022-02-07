import React from 'react';

const Card = (props: { style: {}; children; class: string }) => {
  return (
    <section className="py-16 bg-gray-300">
      <div className="container mx-auto w-full">
        <div
          style={props.style}
          className={`${props.class} relative break-words bg-white mb-6 shadow-xl rounded-lg`}
        >
          {props.children}
        </div>
      </div>
    </section>
  );
};

export default Card;
