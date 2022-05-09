class Home{

    constructor(homeEle){
        this.homeEle = homeEle;
        this.home();
    }

    home(){

        $(this.homeEle).click(function(e){
            e.preventDefault();
            let self = this;

            $.ajax({
                type: 'GET',
                url: $(self).attr('href')
            })
            .done(function(data){
                let homeSongs = homeSongsDom(data);
                $(`.title`).css({"height": "0px","visibility":"hidden","padding-bottom": "0px"});
                $(`#body div`).css({"height": "0px","min-height":"0px","visibility":"hidden"});
                $(`#body`).append(homeSongs);
                for(let song of data.data.songs) {
                    var artists = '';
                    for(let i=0;i<song.artists.length;i++){

                        if(i == song.artists.length-1){
                            artists = artists + song.artists[i].name;
                        }
            
                        else{
                            artists = artists + song.artists[i].name+ ", ";
                        }
                    }
                    var togfav = '';
                    var adQu = '';
                    
                    if(data.data.user){
                        adQu = '<a href="" class="add-que"><i class="fas fa-plus"></i></a>';
                        var flag = 0;
                        for(let fav of song.likedby){
                            //console.log(fav.user,user._id);
                            if(fav.user._id == data.data.user){
                                flag = 1;
                                togfav = '<a href="/user/favourite/toggle-fav/?song_id='+song._id+'&loc=home" class="add-fav" style="color: red"><i class="fas fa-heart" ></i></a>';
                            }
                            
                        }
                        if(flag == 0){
                            togfav = '<a href="/user/favourite/toggle-fav/?song_id='+song._id+'&loc=home" class="add-fav" style="color: white"><i class="fas fa-heart" ></i></a>';
                        }
                    
                    } 
                    let eachHomeSong = eachHomeSongDom(song,artists,togfav,adQu);
                    $(`#whole-home > .songs-container`).append(eachHomeSong);
                }
                for (let song of data.data.songs) { 
                    if(song.likedby.length >= 1) {
                        var artists = '';
                        for(let i=0;i<song.artists.length;i++){
    
                            if(i == song.artists.length-1){
                                artists = artists + song.artists[i].name;
                            }
                
                            else{
                                artists = artists + song.artists[i].name+ ", ";
                            }
                        }
                        var togfav = '';
                        var adQu = '';
                        
                        if(data.data.user){
                            adQu = '<a href="" class="add-que"><i class="fas fa-plus"></i></a>';
                            var flag = 0;
                            for(let fav of song.likedby){
                                //console.log(fav.user,user._id);
                                if(fav.user._id == data.data.user){
                                    flag = 1;
                                    togfav = '<a href="/user/favourite/toggle-fav/?song_id='+song._id+'&loc=home" class="add-fav" style="color: red"><i class="fas fa-heart" ></i></a>';
                                }
                                
                            }
                            if(flag == 0){
                                togfav = '<a href="/user/favourite/toggle-fav/?song_id='+song._id+'&loc=home" class="add-fav" style="color: white"><i class="fas fa-heart" ></i></a>';
                            }
                        
                        }
                        let eachHomeSong = eachHomeSongDom(song,artists,togfav,adQu);
                    $(`#whole-home > .trending-songs`).append(eachHomeSong); 
                    }
                }
                new Play($(' .play-btn',homeSongs));
                new ToogleFav($(' .add-fav',homeSongs));
                new AllSongsOfAlbum($(' .each-album-all',homeSongs));
            })
            .fail(function(errData){
                console.log("Error in completing the request ",errData);
            })
        })
    }
}

let homeSongsDom = function(data){

    return $(`<div>
    
    <link rel="stylesheet" href="/css/home.css">

    <div>
        <div class="title">
            Music Player | ${data.data.title}
        </div>
        
        
        <div id="whole-home">
            
            <div class="songs-container">
        
                <div class="sub-heading">
                    All Songs
                </div>  
        
            </div> 
            
            <div class="trending-songs">
        
                <div class="sub-heading">
                    Trending Songs
                </div>
        
            </div> 
            
            
        </div>
        
        
    </div>
    </div>`);
}

let eachHomeSongDom = function(song,artists,togfav,adQu){

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
                ${adQu}
            </div>
        </div>
        

    </div>
    <a href="/user/play/?song_id=${song._id}" class="play-btn" id="play-btn-${song._id}"><i class="fas fa-play"></i></a>
    <audio class="audio"></audio>
</div>`);
}