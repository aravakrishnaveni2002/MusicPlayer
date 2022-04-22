class RecentlyPlayed{

    constructor(recentlyPlaEle){
        this.recentlyPlaEle = recentlyPlaEle;
        this.recentlyPlayed();
    }

    recentlyPlayed(){

        $(this.recentlyPlaEle).click(function(e){
            e.preventDefault();

            let self = this;

            $.ajax({
                type: 'GET',
                url: $(self).attr('href')
            })
            .done(function(data){
                let recentlyPla = recentlyPlaDom(data);
                $(`.title`).css({"height": "0px","visibility":"hidden","padding-bottom": "0px"});
                $(`#body div`).css({"height": "0px","min-height":"0px","visibility":"hidden"});
                $(`#body`).prepend(recentlyPla);
                for (let song of data.data.songs) {
                    var artists = '';
                    var togfav = '';
                    for(let i=0;i<song.artists.length;i++){

                        if(i == song.artists.length-1){
                            artists = artists + song.artists[i].name;
                        }
            
                        else{
                            artists = artists + song.artists[i].name+ ",";
                        }
                    }
                    
                    var flag = 0;
                    for(let fav of song.likedby){
                        //console.log(fav.user,user._id);
                        if(fav.user == data.data.user){
                            flag = 1;
                            togfav = '<a href="/user/favourite/toggle-fav/?song_id='+song._id+'&loc=home" class="add-fav" style="color: red"><i class="fas fa-heart" ></i></a>';
                        }
                        
                    }
                    if(flag == 0){
                        togfav = '<a href="/user/favourite/toggle-fav/?song_id='+song._id+'&loc=home" class="add-fav" style="color: white"><i class="fas fa-heart" ></i></a>';
                    }
                    
                    
                    let eachSong = eachRecSongDom(song,artists,togfav);
                    $(' #recently-played-songs > .songs-container').prepend(eachSong);
                }
                new Play($(' .play-btn',recentlyPla));
                new ToogleFav($(' .add-fav',recentlyPla));
                new AllSongsOfAlbum($(' .each-album-all',recentlyPla));

            })
            .fail(function(errData){
                console.log("Error in completing the request ",errData);
            })

        })
    }

}

let recentlyPlaDom = function(data){
    return $(`<div class="whole-fav" id="recently-played-songs">
    <div class="title">${data.data.title}</div>

    <div class="songs-container">
    </div>
    </div>`);
}

let eachRecSongDom = function(song,artists,togfav){

    return $(`<div class="each-song" id="each-song-${song._id}">
    <div class="song-info">
        <a href="/user/album-all-songs/?album_id=${song.album._id}" class="each-album-all"><img class="each-photo" src="${song.photo}" alt=""></a>
        <div class="details">
            <div>
                <span class="song-name">${song.name}</span>
                <br>
                <span class="song-artist-album">${song.album.name} - </span>  
                <span class="song-artist-album">${artists}</span>
                     
            </div>
            <div class="controls">
                ${togfav}
                <a href="" class="add-que"><i class="fas fa-plus"></i></a>   
            </div>
        </div>
        
        
    
    </div>
    <a href="/user/play/?song_id=${song._id}" class="play-btn" id="play-btn-${song._id}"><i class="fas fa-play"></i></a>
    <audio class="audio"></audio>
</div>`)
}