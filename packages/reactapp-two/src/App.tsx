import { User, greetUser } from '@monorepo/shared-helper';
import { Button } from '@monorepo/shared-helper/components/Button';
import { Suspense } from 'react';

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
      <h1>React App 2</h1>
      {/* @ts-expect-error */}
      <Button onClick={onGreetClicked}>Hi</Button>
      <Suspense fallback={<div>Loading...</div>}></Suspense>
    </div>
  );
}

export default App;
