const Background = (props: { height: string }) => {
  return (
    <section className="relative" style={{ height: props.height }}>
      <div
        className="absolute top-0 w-full h-full bg-center bg-cover"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')`,
        }}
      >
        <span
          id="blackOverlay"
          className="w-full h-full absolute opacity-50 bg-black"
        ></span>
      </div>
    </section>
  );
};

export default Background;
