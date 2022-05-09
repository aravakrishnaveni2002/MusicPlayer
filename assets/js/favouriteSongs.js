

class FavouriteSongs {

    constructor(favSongEle){
        this.favSongEle = favSongEle;
        this.favouriteSongs();
    }

    favouriteSongs(){
        $(this.favSongEle).click(function(e){
            e.preventDefault();

            let self = this;

            $.ajax({
                type: 'GET',
                url: '/user/favourite/songs'
            })
            .done(function(data){

                let favSongs = favSongsDom(data);
                $(`.title`).css({"height": "0px","visibility":"hidden","padding-bottom": "0px"});
                $(`#body div`).css({"height": "0px","min-height":"0px","visibility":"hidden"});
                $(`#body`).append(favSongs);

                for(let fav of data.data.favourites){

                    if(fav.user._id == data.data.user){
                        let artists = '';
                        for(let i=0;i<fav.song.artists.length;i++){

                            if(i == fav.song.artists.length-1){
                                artists = artists + fav.song.artists[i].name;
                            }
                
                            else{
                                artists = artists + fav.song.artists[i].name+ ",";
                            }
                        }
                        let eachSong = eachFavSongDom(fav,artists);
                        $(`#favourite-songs > .songs-container`).append(eachSong);
                    }
                }        

                new Play($(' .play-btn',favSongs));
                new ToogleFav($(' .add-fav',favSongs));
                new Profile($(' .profile_ele',favSongs));
                new AllSongsOfAlbum($(' .each-album-all',favSongs));
            })
            .fail(function(errData){
                console.log("Error in completing the request ",errData);
            })
        })    
           
    }
}

let favSongsDom = function(data){

    return $(`<div>
    <div class="whole-fav" id="favourite-songs">
        <div class="title">${data.data.title}</div>
    
    
        <div class="songs-container">
                
        </div>
    </div>
    </div>`);

    
}

let eachFavSongDom = function(fav,artists){

    return $(`<div class="each-song" id="each-song-${fav.song._id}">
    <div class="song-info">
        <a href="/user/album-all-songs/?album_id=${fav.song.album._id}" class="each-album-all"><img class="each-photo" src="${fav.song.photo}" alt=""></a>
    
        <div class="details">
            <div>
                <span class="song-name">${fav.song.name}</span>
                <br>
                <span class="song-artist-album">${fav.song.album.name} - </span>
                <span class="song-artist-album">${artists}</span>
            </div>
            <div class="controls">
                <a href="/user/favourite/toggle-fav/?song_id=${fav.song._id}&loc=profile" class="add-fav" style="color: red"><i class="fas fa-heart" ></i></a>
                <a href="" class="add-que"><i class="fas fa-plus"></i></a>   
                        
            </div>
        </div>
    
    </div>
    <a href="/user/play/?song_id=${fav.song._id}" class="play-btn" id="play-btn-${fav.song._id}"><i class="fas fa-play"></i></a>
    <audio class="audio"></audio>
    </div>`);
}