import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as PlaylistsActions } from '../../store/ducks/playlist';

import { Container, NewPlaylist, Nav } from './styles';

import AddPlaylistIcon from '../../assets/images/add_playlist.svg';

import Loading from '../Loading';

class Sidebar extends Component {
  static propTypes = {
    getPlaylistRequest: PropTypes.func.isRequired,
    playlists: PropTypes.shape({
      loading: PropTypes.bool,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          title: PropTypes.string,
        }),
      ),
    }),
  };

  componentDidMount() {
    this.props.getPlaylistRequest();
  }

  render() {
    return (
      <Container>
        <div>
          <Nav main>
            <li>
              <Link to="/">Navegar</Link>
            </li>
            <li>
              <a href="">Rádio</a>
            </li>
          </Nav>

          <Nav>
            <li>
              <span>Sua Bilbioteca</span>
            </li>
            <li>
              <a href="#">Seu Daily Mix</a>
            </li>
            <li>
              <a href="#">Tocar recentemente</a>
            </li>

            <li>
              <a href="#">Musicas</a>
            </li>
            <li>
              <a href="#">Albuns</a>
            </li>
            <li>
              <a href="#">Artistas</a>
            </li>
            <li>
              <a href="">Estacoes</a>
            </li>
            <li>
              <a href="#">Primeiro Lugar</a>
            </li>
            <li>
              <a href="#">Mais tocadas na semana</a>
            </li>
            <li>
              <a href="#">Musicas de Treino</a>
            </li>
            <li>
              <a href="#">Musicas pra relaxar</a>
            </li>
          </Nav>

          <Nav>
            <li>
              <span>Playlist</span>
              {this.props.playlists.loading && <Loading />}
            </li>
            {this.props.playlists.data.map(playlist => (
              <li>
                <Link to={`/playlists/${playlist.id}`} alt={playlist.title}>
                  {playlist.title}
                </Link>
              </li>
            ))}
          </Nav>
        </div>
        <NewPlaylist>
          <img src={AddPlaylistIcon} alt="Adicionar Playlist" />
          Nova add_playlist
        </NewPlaylist>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  playlists: state.playlists,
});

const mapDispatchToProps = dispatch => bindActionCreators(PlaylistsActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sidebar);
