import { User, greetUser } from '@monorepo/shared-helper';

function App() {
  const user: User = {
    firstName: 'Admin',
    lastName: 'User',
    email: 'adminuser@test.com',
    isAdmin: true,
  };

  const onGreetClicked = () => {
    greetUser(user);
  };

  return (
    <div className="App">
      <h1>React App 1</h1>
      <button onClick={onGreetClicked}>Greet Admin!</button>
      <div>This is a new div!</div>
      <p>Hi there!</p>
    </div>
  );
}

export default App;
