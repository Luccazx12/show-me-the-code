const Card = (props: { style: {}; children; class: string }) => {
  return (
    <section className="relative py-16 bg-gray-300">
      <div className="container mx-auto px-5">
        <div
          style={props.style}
          className={`${props.class} relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg`}
        >
          {props.children}
        </div>
      </div>
    </section>
  );
};

export default Card;
