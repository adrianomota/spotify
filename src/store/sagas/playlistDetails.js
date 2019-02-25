import { call, put } from 'redux-saga/effects';
import api from '../../services/api';
import { Creators as PlaylistDetailActions } from '../ducks/playlistDetails';
import { Creators as ErrorsActions } from '../ducks/error';

export function* getPlaylistDetails(action) {
  try {
    const { data } = yield call(api.get, `playlists/${action.payload.id}?_embed=songs`);

    yield put(PlaylistDetailActions.getPlaylistDetailsSuccess(data));
  } catch (err) {
    yield put(ErrorsActions.setError('danger', 'Não foi possível obter os dados da playlist.'));
  }
}
