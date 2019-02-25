import React from 'react';

import { Container, Search, User } from './styles';

const Header = () => (
  <Container>
    <Search>
      <input type="text" placeholder="Search" />
    </Search>

    <User>
      <img
        src="https://station.rocketseat.com.br/api/users/picture/profile-9e9cd48a-2b0d-4be4-b5f4-30358fb58f70.jpg"
        alt="Avatar"
        title="Avatar"
      />
      Adriano Mota
    </User>
  </Container>
);

export default Header;
