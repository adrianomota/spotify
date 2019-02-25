import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import Loading from '../../components/Loading';
import { Creators as PlaylistDetailsActions } from '../../store/ducks/playlistDetails';
import { Creators as PlayerActions } from '../../store/ducks/player';

import { Container, Header, SongList, SongItem } from './styles';
import ClockIcon from '../../assets/images/clock.svg';
import PlusIcon from '../../assets/images/plus.svg';

class Playlist extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.number,
      }),
    }).isRequired,
    playlistDetails: PropTypes.shape({
      data: PropTypes.shape({
        thumbnail: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        songs: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.string,
            album: PropTypes.string,
            author: PropTypes.string,
          }),
        ),
      }),
      loading: PropTypes.bool,
    }).isRequired,
    currentSong: PropTypes.shape({
      id: PropTypes.number,
    }).isRequired,
    getPlaylistDetailsRequest: PropTypes.func.isRequired,
    loadSong: PropTypes.func.isRequired,
  };

  state = {
    selectedSong: null,
  };
  componentDidMount() {
    this.loadPlaylistDetails();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.loadPlaylistDetails();
    }
  }

  loadPlaylistDetails = () => {
    const { id } = this.props.match.params;

    this.props.getPlaylistDetailsRequest(id);
  };

  renderDetails = () => {
    const playlist = this.props.playlistDetails.data;
    return (
      <Container>
        <Header>
          <img src={playlist.thumbnail} alt={playlist.title} title={playlist.title} />

          <div>
            <span>{playlist.title}</span>
            <h1>{playlist.title}</h1>
            {!!playlist.songs && <p>{playlist.songs.length} musicas</p>}

            <button type="button">PLAY</button>
          </div>
        </Header>

        <SongList cellPadding={0} cellSpacing={0}>
          <thead>
            <th />
            <th>Titulo</th>
            <th>Artista</th>
            <th>Album</th>

            <th>
              <img src={ClockIcon} alt="Duracao" title="Duracao" />
            </th>
          </thead>

          <tbody>
            {!playlist.songs ? (
              <tr>
                <td colspan={5}>Nenhuma musica cadastrada</td>
              </tr>
            ) : (
              playlist.songs.map(song => (
                <SongItem
                  key={song.id}
                  onDoubleClick={() => this.props.loadSong(song, playlist.songs)}
                  onClick={() => this.setState({ selectedSong: song.id })}
                  selected={this.state.selectedSong === song.id}
                  playing={this.props.currentSong && this.props.currentSong.id === song.id}
                >
                  <td>
                    <img src={PlusIcon} alt="Adicionar" title="Adicionar" />
                  </td>
                  <td>{song.title}</td>
                  <td>{song.author}</td>
                  <td>{song.album}</td>
                  <td>0:00</td>
                </SongItem>
              ))
            )}
          </tbody>
        </SongList>
      </Container>
    );
  };

  render() {
    return this.props.playlistDetails.loading ? (
      <Container loading>
        <Loading />
      </Container>
    ) : (
      this.renderDetails()
    );
  }
}

const mapStateToProps = state => ({
  playlistDetails: state.playlistDetails,
  currentSong: state.player.currentSong,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...PlaylistDetailsActions, ...PlayerActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Playlist);
