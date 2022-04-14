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
                
                if(data.data.play == true){
                    $(self).html(`<i class="fas fa-play" style="color: aquamarine"></i>`);
                    $(`.audio`)[0].src = data.data.song.link;
                    $(`.audio`)[0].play();
                    $(`.song-playing`).remove();
                    let newSong = newSongDom(data.data.song,data.data.user);
                    $(`#whole-body`).append(newSong);
                    new Play($(' .play-btn',newSong));
                    new ToogleFav($(' .add-fav',newSong));
                }

                else{
                    $(self).html(`<i class="fas fa-play" style="color: grey"></i>`);
                    $(`audio`)[0].pause();
                }

                if(data.data.songPlayingPrev != null){ 
                    $(`#play-btn-${data.data.songPlayingPrev}`).html(`<i class="fas fa-play" style="color: grey"></i>`);
                    
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
        return $(`<div class="each-song song-playing" id="each-song-${song._id}">
        <div class="song-info">
            <img class="song-photo" src="${song.photo}" alt="">
            <div class="details">
                <div>
                    <span class="song-name">${song.name}</span>
                    <br>
                    <span class="song-artist">${song.artist}</span>
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