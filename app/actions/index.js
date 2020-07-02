export const setSong = (display) => ({type: 'SET_SONG', display: display});

// export const setSong = (id, title, artist, artwork) => ({type: 'SET_SONG', id: id, title: title, artist: artist, artwork: artwork});
export const updateSongStatus = status => ({type: 'UPDATE_SONG_STATUS', status: status});
export const setUser = user => ({type: 'SET_USER', user: user});
