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
                    $(self).html(`<i class="fas fa-play" style="color: aquamarine"></i>`);     
                    $(`.song-playing`).remove();
                    let newSong = newSongDom(data.data.song,data.data.user);
                    $(`#whole-body`).append(newSong);
                    $(`.audio`)[0].src = data.data.song.link;
                    $(`.audio`)[0].play();
                    new Play($(' .play-btn',newSong));
                    new ToogleFav($(' .add-fav',newSong));
            
                }

                else{
                    $(self).html(`<i class="fas fa-play" style="color: grey"></i>`);
                    $(`audio`)[0].pause();
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
            for(fav of song.likedby){
                //console.log(fav.user,user._id);
                if(fav.user == user){
                    togfav = '<a href="/user/favourite/toggle-fav/?song_id='+song._id+'&loc=home" class="add-fav" style="color: red"><i class="fas fa-heart" ></i></a>';
                }
                else{
                    togfav = '<a href="/user/favourite/toggle-fav/?song_id='+song._id+'&loc=home" class="add-fav" style="color: white"><i class="fas fa-heart" ></i></a>';
                }
            }
            if(song.likedby.length == 0){
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
        
        return $(`<div class="each-song song-playing" id="each-song-${song._id}">
        <div class="song-info">
            <a href="/user/album-all-songs/?album_id=${song.album._id}"><img class="each-photo" src="${song.photo}" alt=""></a>
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
    </div>`);
    }