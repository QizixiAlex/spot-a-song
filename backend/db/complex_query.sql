/*find out playlist relation between a given user and all songs */
/*Nested Query and Outer Join*/
SELECT user_playlists.playlist_name, songs.song_id, songs.title
FROM (SELECT song_id, playlists.playlist_name
      FROM playlists, playlist_songs
      WHERE user_id = 1
      AND playlists.playlist_id = playlist_songs.playlist_id
) AS user_playlists RIGHT JOIN songs
ON user_playlists.song_id = songs.song_id;
