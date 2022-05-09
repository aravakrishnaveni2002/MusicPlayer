class AllSongsOfArtist{

    constructor(artistAllSongsEle){
        this.artistAllSongsEle = artistAllSongsEle,
        this.allSongsofArtist();
    }

    allSongsofArtist(){

        $(this.artistAllSongsEle).click(function(e){
            
            e.preventDefault();

            let self = this;

            $.ajax({
                type: 'GET',
                url: $(self).attr('href')
            })
            .done(function(data){
                let allSongs = allSongsofArtistDom(data);
                $(`.title`).css({"height": "0px","visibility":"hidden","padding-bottom": "0px"});
                $(`#body div`).css({"height": "0px","min-height":"0px","visibility":"hidden"});
                $(`#body`).append(allSongs);
                for(let song of data.data.artist.songs){
                    var togfav = '';
                    var adQu = '';
                    if(data.data.user){
                        adQu = '<a href="" class="add-que"><i class="fas fa-plus"></i></a>';
                        var flag = 0;
                        for(let fav of song.likedby){
                            if(fav.user == data.data.user){
                                flag = 1;
                                togfav = '<a href="/user/favourite/toggle-fav/?song_id='+song._id+'&loc=home" class="add-fav" style="color: red"><i class="fas fa-heart" ></i></a>';
                            }
                            
                        }
                        if(flag == 0){
                            togfav = '<a href="/user/favourite/toggle-fav/?song_id='+song._id+'&loc=home" class="add-fav" style="color: white"><i class="fas fa-heart" ></i></a>';
                        }
                        let eachSong = eachOfAllSongsOfArtistDom(song,togfav,adQu);
                        $(`#all-songs-artist > .songs-container`).append(eachSong);
                    
                    } 
                }
                new Play($(' .play-btn',allSongs));
                new ToogleFav($(' .add-fav',allSongs));
                new AllSongsOfArtist($(' .each-artist-all',allSongs));
            })
            .fail(function(errData){
                console.log("Error in completing the request ",errData);
            })
        })
    }

}

let allSongsofArtistDom = function(data){

    return $(`<div class="whole-album-artist" id="all-songs-artist">
    <div class="title">${data.data.title}</div>

    <div class="album-artist-details-photo">
        <a href="/user/artist-all-songs/?artist_id=${data.data.artist._id}" class="each-artist-all"><img src="${data.data.artist.photo}" alt="" class="artist-photo-big"></a>
    </div>

    <div class="album-artist-name-heading">
        <a href="/user/artist-all-songs/?artist_id=${data.data.artist._id}" class="each-artist-all">${data.data.artist.name}</a>
    </div>

    <div class="songs-container">
    </div>
    </div>`);
}

let eachOfAllSongsOfArtistDom = function(song,togfav,adQu){

    return $(`<div class="each-song" id="each-song-${song._id}">
    <div class="song-info">
        <div class="details">
            <div>
                <span class="song-name">${song.name}</span>
                <br>
                <span class="song-artist-album">${song.album.name}</span>
            </div>    
            <div class="controls">
                ${togfav}
                ${adQu}
            </div>    
                
        </div>
    </div>
        <a href="/user/play/?song_id=${song._id}" class="play-btn" id="play-btn-${song._id}"><i class="fas fa-play"></i></a>
        <audio class="audio"></audio>
    </div>`);
}