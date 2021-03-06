class Play{
    constructor(playEle){
        this.playEle = playEle;
        this.play();
        
    }

    play(){
        $(this.playEle).click(function(e){
            e.preventDefault();

            let self = this;

            $.ajax({
                type: 'GET',
                url: $(self).attr('href')
            })
            .done(function(data){

                if(data.data.songPlayingPrev != null){ 
                    $(`#play-btn-${data.data.songPlayingPrev}`).html(`<i class="fas fa-play" style="color: grey"></i>`);
                    
                }


                if(data.data.play == true){
                    let flag = false;
                    $(self).html(`<i class="fas fa-play" style="color: aquamarine"></i>`); 
                    // $(`.audio`)[0].src = data.data.song.link;
                    // $(`.audio`)[0].play();
                    $(`.audio`).each(function(){
                        if($(this).attr('src') != undefined){
                            flag = true;
                            this.src = data.data.song.link;
                            this.play();
                        }
                    })
                    if(!flag){
                        $(`.audio`)[0].src = data.data.song.link;
                        $(`.audio`)[0].play();
                    }
                    $(`.song-playing div`).css({"height": "0px","min-height":"0px","visibility":"hidden"});
                    let newSong = newSongDom(data.data.song,data.data.user);
                    $(`.song-playing`).append(newSong);
                    new Play($(' .play-btn',newSong));
                    new ToogleFav($(' .add-fav',newSong));
                    new AllSongsOfAlbum($(' .each-album-all',newSong));
                }

                else{
                    $(self).html(`<i class="fas fa-play" style="color: grey"></i>`);
                    $(`.audio`).each(function(){
                        if($(this).attr('src') != undefined){
                            this.pause();
                        }
                    })
                    // $(`.audio`)[0].pause();
                }

                

                
            })
            .fail(function(errData){
                console.log("Error in completeing the request");
            });
        });
    }
}
    let newSongDom = function(song,user){
        var togfav = '';
        var adQu = '';
        var artists = '';
        
        if(user){
            adQu = '<a href="" class="add-que"><i class="fas fa-plus"></i></a>';
            var flag = 0;
            for(fav of song.likedby){
                //console.log(fav.user,user._id);
                if(fav.user == user){
                    flag = 1;
                    togfav = '<a href="/user/favourite/toggle-fav/?song_id='+song._id+'&loc=home" class="add-fav" style="color: red"><i class="fas fa-heart" ></i></a>';
                }
                
            }
            if(flag == 0){
                togfav = '<a href="/user/favourite/toggle-fav/?song_id='+song._id+'&loc=home" class="add-fav" style="color: white"><i class="fas fa-heart" ></i></a>';
            }
        
        } 
        
        for(let i=0;i<song.artists.length;i++){

            if(i == song.artists.length-1){
                artists = artists + song.artists[i].name;
            }

            else{
                artists = artists + song.artists[i].name+ ",";
            }
        }
        
        return $(`<div>
        <div class="each-song" id="song-playing-${song._id}">
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
                      ${adQu}      
                </div>
            </div>
            
        
        </div>
        <a href="/user/play/?song_id=${song._id}" class="play-btn" id="play-btn-${song._id}"><i class="fas fa-play" style="color: aquamarine"></i></a>
        <audio class="audio"></audio>
        </div>
        </div>`);
    }