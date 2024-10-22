import React from 'react';

function Header({ user, onLogin, onLogout, onCreateAccount }) {
  return (
    <header>
      <div>
        {user ? (
          <>
            <span>Welcome, {user.name}</span>
            <button onClick={onLogout}>Log out</button>
          </>
        ) : (
          <>
            <button onClick={onLogin}>Log in</button>
            <button onClick={onCreateAccount}>Sign up</button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;