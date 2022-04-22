class FavouriteArtistSongs {

    constructor(favArtistSongEle){
        this.favArtistSongEle = favArtistSongEle;
        this.favouriteArtistSongs();
    }

    favouriteArtistSongs(){
        $(this.favArtistSongEle).click(function(e){
            e.preventDefault();

            let self = this;

            $.ajax({
                type: 'GET',
                url: $(self).attr('href')
            })
            .done(function(data){
                
                let favArtistSongs = favArtistSongsDom(data);
                $(`.title`).css({"height": "0px","visibility":"hidden","padding-bottom": "0px"});
                $(`#body div`).css({"height": "0px","min-height":"0px","visibility":"hidden"});
                $(`#body`).prepend(favArtistSongs);
                for (let song of data.data.artist.songs) {
                    for (let fav of song.likedby) {
                        if(fav.user == data.data.user) {
                            let eachSong = eachArtistSongDom(song);
                            $(`#favourite-artist-songs > .songs-container`).append(eachSong);
                        }
                    }
                }
                new Play($(' .play-btn',favArtistSongs));
                new ToogleFav($(' .add-fav',favArtistSongs));
                new AllSongsOfArtist($(' .each-artist-all',favArtistSongs));

            })
            .fail(function(errData){
                console.log("Error in completing the request ",errData);
            })
            
        })
    }
    
}

let favArtistSongsDom = function(data){

    return $(`<div class="whole-fav" id="favourite-artist-songs">
    <div class="title">${data.data.title}</div>

    <div class="album-artist-details-photo">
        <a href="/user/artist-all-songs/?artist_id=${data.data.artist._id}" class="each-artist-all"><img src="${data.data.artist.photo}" alt="" class="artist-photo-big"></a>
    </div>

    <div class="album-artist-name-heading">
        <a href="/user/artist-all-songs/?artist_id=${data.data.artist._id}" class="each-artist-all">${data.data.artist.name}</a>
    </div>

    <div class="songs-container">
    </div>
    </div>`)
}

let eachArtistSongDom = function(song){
    return $(`<div class="each-song" id="each-song-${song._id}">
    <div class="song-info">
        <div class="details">
            <div>
                <span class="song-name">${song.name}</span>
                <br>
                <span class="song-artist-album">${song.album.name}</span>
            
            </div>
            <div class="controls">
                    
            <a href="/user/favourite/toggle-fav/?song_id=${song._id}&loc=profile" class="add-fav" style="color: red"><i class="fas fa-heart" ></i></a>                         
                        
            <a href="" class="add-que"><i class="fas fa-plus"></i></a>   
            </div>
        </div>
        
    
    </div>
    <a href="/user/play/?song_id=${song._id}" class="play-btn" id="play-btn-${song._id}"><i class="fas fa-play"></i></a>
    <audio class="audio"></audio>
</div>`);
}