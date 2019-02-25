import { call, put } from 'redux-saga/effects';
import api from '../../services/api';
import { Creators as PlaylistsActions } from '../ducks/playlist';
import { Creators as ErrorsActions } from '../ducks/error';

export function* getPlaylists() {
  try {
    const { data } = yield call(api.get, '/playlists');

    yield put(PlaylistsActions.getPlaylistSuccess(data));
  } catch (err) {
    yield put(ErrorsActions.setError('danger', 'Não foi possível obter suas playlists.'));
  }
}
