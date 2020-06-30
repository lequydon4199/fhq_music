import {combineReducers} from 'redux';
import { player, updateSong, user } from './player';

export default combineReducers({
  player: player,
  updateSong: updateSong,
  user: user,
});
