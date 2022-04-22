class AllSongsOfAlbum{

    constructor(albumAllSongsEle){
        this.albumAllSongsEle = albumAllSongsEle,
        this.allSongsofAlbum();
    }

    allSongsofAlbum(){

        $(this.albumAllSongsEle).click(function(e){
            
            e.preventDefault();

            let self = this;

            $.ajax({
                type: 'GET',
                url: $(self).attr('href')
            })
            .done(function(data){
                let allSongs = allSongsofAlbumDom(data);
                $(`.title`).css({"height": "0px","visibility":"hidden","padding-bottom": "0px"});
                $(`#body div`).css({"height": "0px","min-height":"0px","visibility":"hidden"});
                $(`#body`).prepend(allSongs);
                for(let song of data.data.album.songs){
                    let artists = '';
                    for(let i=0;i<song.artists.length;i++){

                        if(i == song.artists.length-1){
                            artists = artists + song.artists[i].name;
                        }
            
                        else{
                            artists = artists + song.artists[i].name+ ",";
                        }
                    }
                    var togfav = '';
                    var adQu = '';
                    
                    if(data.data.user){
                        adQu = '<a href="" class="add-que"><i class="fas fa-plus"></i></a>';
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
                    
                    } 
                    let eachSong = eachOfAllSongsOfAlbumDom(song,artists,togfav,adQu);
                    $(`#all-songs-album > .songs-container`).append(eachSong);
                }

                new Play($(' .play-btn',allSongs));
                new ToogleFav($(' .add-fav',allSongs));
                new AllSongsOfAlbum($(' .each-album-all',allSongs));
            })
            .fail(function(errData){
                console.log("Error in completing the request ",errData);
            })

        }) 
    }
}

let allSongsofAlbumDom = function(data){

    return $(`<div class="whole-album-artist" id="all-songs-album"> 
    <div class="title">${data.data.title}</div>

    <div class="album-artist-details-photo">
        <a href="/user/album-all-songs/?album_id=${data.data.album._id}" class="each-album-all"><img src="${data.data.album.photo}" alt="" class="album-photo"></a>
    </div>

    <div class="album-artist-name-heading">
        <a href="/user/album-all-songs/?album_id=${data.data.album._id}" class="each-album-all">${data.data.album.name}</a>
    </div>

    <div class="songs-container">

    </div>
`)
}

let eachOfAllSongsOfAlbumDom = function(song,artists,togfav,adQu){

    return $(`<div class="each-song" id="each-song-${song._id}">
    <div class="song-info">
        <div class="details">
            <div>
                <span class="song-name">${song.name}</span>
                <br>
                <span class="song-artist-album">${artists}</span>
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