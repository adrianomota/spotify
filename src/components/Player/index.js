import React, { Fragment } from 'react';
import Slider from 'rc-slider';
import Sound from 'react-sound';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as PlayerActions } from '../../store/ducks/player';

import {
  Container, Current, Progress, Controls, Time, ProgressSlider, Volume,
} from './styles';

import ShuffleIcon from '../../assets/images/shuffle.svg';
import RepeatIcon from '../../assets/images/repeat.svg';
import BackwardIcon from '../../assets/images/backward.svg';
import ForwardIcon from '../../assets/images/forward.svg';
import PauseIcon from '../../assets/images/pause.svg';
import PlayIcon from '../../assets/images/play.svg';
import VolumeIcon from '../../assets/images/volume.svg';

function msToTime(duration) {
  if (!duration) return null;

  let seconds = parseInt((duration / 1000) % 60, 10);
  let minutes = parseInt((duration / (1000 * 60)) % 60, 10);

  minutes = minutes < 10 ? `${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${minutes}:${seconds}`;
}

const Player = ({
  player,
  pause,
  play,
  next,
  prev,
  playing,
  current,
  duration,
  currentShown,
  handleCurrent,
  setCurrent,
  progress,
  setVolume,
}) => (
  <Container>
    {!!player.currentSong && (
      <Sound
        url={player.currentSong.file}
        playStatus={player.status}
        onFinishedPlaying={next}
        onPlaying={playing}
        position={player.current}
        volume={player.volume}
      />
    )}

    <Current>
      {!!player.currentSong && (
        <Fragment>
          <img src={player.currentSong.thumbnail} alt={player.currentSong.title} />
          <div>
            <span>{player.currentSong.title}</span>
            <small>{player.currentSong.author}</small>
          </div>
        </Fragment>
      )}
    </Current>

    <Progress>
      <Controls>
        <button type="button">
          <img src={ShuffleIcon} alt="Shuffle" />
        </button>
        <button type="button" onClick={prev}>
          <img src={BackwardIcon} alt="Backward" />
        </button>
        {!!player.currentSong && player.status === Sound.status.PLAYING ? (
          <button type="button" onClick={pause}>
            <img src={PauseIcon} alt="Pause" />
          </button>
        ) : (
          <button type="button" onClick={play}>
            <img src={PlayIcon} alt="Play" />
          </button>
        )}
        <button type="button" onClick={next}>
          <img src={ForwardIcon} alt="Forward" />
        </button>
        <button type="button">
          <img src={RepeatIcon} alt="Repeat" />
        </button>
      </Controls>

      <Time>
        <span>{currentShown || current}</span>
        <ProgressSlider>
          <Slider
            railStyle={{ background: '#404040', borderRadius: 10 }}
            trackStyle={{ background: '#1ED760' }}
            handleStyle={{ border: 0 }}
            max={1000}
            onChange={value => handleCurrent(value / 1000)}
            onAfterChange={value => setCurrent(value / 1000)}
            value={progress}
          />
        </ProgressSlider>
        <span>{duration}</span>
      </Time>
    </Progress>

    <Volume>
      <img src={VolumeIcon} alt="Volume" />
      <Slider
        railStyle={{ background: '#404040', borderRadius: 10 }}
        trackStyle={{ background: '#FFF' }}
        handleStyle={{ display: 'none' }}
        value={player.volume}
        onChange={setVolume}
      />
    </Volume>
  </Container>
);

const mapStateToProps = state => ({
  player: state.player,
  current: msToTime(state.player.current),
  duration: msToTime(state.player.duration),
  currentShown: msToTime(state.player.currentShown),
  progress:
    parseInt(
      (state.player.currentShown || state.player.current) * (1000 / state.player.duration),
      10,
    ) || 0,
});

const mapDispatchToProps = dispatch => bindActionCreators(PlayerActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Player);
