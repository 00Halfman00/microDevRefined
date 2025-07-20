import Bananas from './bananas';

const Index = () => {
  return (
    <div>
      <h1>
        You are now experiencing the power of Server Side Rendering via NextJS
      </h1>
      <p>
        This is the main page of our application, running in a Docker container.
      </p>
      <a href="/bananas">Go to Bananas Page</a>
      <Bananas />
    </div>
  );
};
console.log('Index component rendered, again');

export default Index;
