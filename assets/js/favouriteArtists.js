class FavouriteArtists {

    constructor(favArtistEle){
        this.favArtistEle = favArtistEle;
        this.favouriteArtists();
    }

    favouriteArtists(){

        $(this.favArtistEle).click(function(e){
            e.preventDefault();

            let self = this;

            $.ajax({
                type: 'GET',
                url: $(self).attr('href')
            })
            .done(function(data){
                let favArtists = favArtistsDom(data);
                $(`.title`).css({"height": "0px","visibility":"hidden","padding-bottom": "0px"});
                $(`#body div`).css({"height": "0px","min-height":"0px","visibility":"hidden"});
                $(`#body`).append(favArtists);
                var obj = new Object();

                for(let fav of data.data.favourites) {
                    if(fav.user._id == data.data.user) {
                        for(let artist of fav.song.artists) {
                            if(obj[artist.name] == undefined) {
                                obj[artist.name] = 1;
                                let eachArtist = eachArtistDom(artist);
                                $(`#favourite-artists > .albums-artists-container`).append(eachArtist);
                            }
                        }
                    }
                } 
                new FavouriteArtistSongs($(' .each-artist-fav',favArtists));    
            })
            .fail(function(errData){
                console.log("Error in completing the request ",errData);
            })

        })    
    }

}

let favArtistsDom = function(data){

    return $(`<div>
    <div class="whole-fav" id="favourite-artists">
        <div class="title">${data.data.title}</div>
        <div class="albums-artists-container">

        </div>
    </div>
    </div>`);
}

let eachArtistDom = function(artist){
    return $(`<div class="each-album-artist" id="each-artist-${artist._id}">
    <div class="album-artist-info">
        <a href="/user/favourite/artist-songs/?artist_id=${artist._id}" class="each-artist-fav"><img class="artist-photo-small" src="${artist.photo}" alt=""></a>

        <div class="album-artist-details-name">
            
            <a href="/user/favourite/artist-songs/?artist_id=${artist._id}" class="album-artist-name each-artist-fav"><span >${artist.name}</span></a>
            
        </div>
    </div>
</div>`);
}