import Bananas from './bananas';

const Index = () => {
  return (
    <div>
      <h1>Welcome to the Index Page</h1>
      <p>This is the main page of our application.</p>
      <a href="/bananas">Go to Bananas Page</a>
      <Bananas />
    </div>
  );
};

export default Index;
