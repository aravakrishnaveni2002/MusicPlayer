class FavouriteAlbumSongs {

    constructor(favAlbumSongEle){
        this.favAlbumSongEle = favAlbumSongEle;
        this.favouriteAlbumSongs();
    }

    favouriteAlbumSongs(){
        $(this.favAlbumSongEle).click(function(e){
            e.preventDefault();

            let self = this;

            $.ajax({
                type: 'GET',
                url: $(self).attr('href')
            })
            .done(function(data){
                
                let favAlbumSongs = favAlbumSongsDom(data);
                $(`.title`).css({"height": "0px","visibility":"hidden","padding-bottom": "0px"});
                $(`#body div`).css({"height": "0px","min-height":"0px","visibility":"hidden"});
                $(`#body`).prepend(favAlbumSongs);
                for (let song of data.data.album.songs) {
                    for (let fav of song.likedby) {
                        if(fav.user == data.data.user) {
                            let artists = '';
                            for(let i=0;i<song.artists.length;i++){

                                if(i == song.artists.length-1){
                                    artists = artists + song.artists[i].name;
                                }
                    
                                else{
                                    artists = artists + song.artists[i].name+ ",";
                                }
                            }
                            let eachSong = eachAlbumSongDom(song,artists);
                            $(`#favourite-album-songs > .songs-container`).append(eachSong);
                        }
                    }
                }        
                new Play($(' .play-btn',favAlbumSongs));
                new ToogleFav($(' .add-fav',favAlbumSongs));
                new AllSongsOfAlbum($(' .each-album-all',favAlbumSongs));
            })
            .fail(function(errData){
                console.log("Error in completing the request ",errData);
            })

        })    
    }

}

let favAlbumSongsDom = function(data){

    return $(`<div class="whole-fav" id="favourite-album-songs">
    <div class="title">${data.data.title}</div>

    <div class="album-artist-details-photo">
        <a href="/user/album-all-songs/?album_id=${data.data.album._id}" class="each-album-all"><img src="${data.data.album.photo}" alt="" class="album-photo"></a>
    </div>

    <div class="album-artist-name-heading">
        <a href="/user/album-all-songs/?album_id=${data.data.album._id}" class="each-album-all">${data.data.album.name}</a>
    </div>

    <div class="songs-container">
    
    </div>`)
}


let eachAlbumSongDom = function(song,artists){
    return $(`<div class="each-song" id="each-song-${song._id}">
    <div class="song-info">
        <div class="details">
            <div>
                <span class="song-name">${song.name}</span>
                <br>
                <span class="song-artist-album">${artists}</span>
            </div>
            <div class="controls">
                    
            <a href="/user/favourite/toggle-fav/?song_id=${song._id}&loc=profile" class="add-fav" style="color: red"><i class="fas fa-heart" ></i></a>                         
                        
            <a href="" class="add-que"><i class="fas fa-plus"></i></a>   
            </div>
        </div>
        
        
    
    </div>
    <a href="/user/play/?song_id=${song._id}" class="play-btn" id="play-btn-${song._id}"><i class="fas fa-play"></i></a>
    <audio class="audio"></audio>
</div>`)
}
