
class FavouriteAlbums {

    constructor(favAlbumEle){
        this.favAlbumEle = favAlbumEle;
        this.favouriteAlbums();
    }

    favouriteAlbums(){
        $(this.favAlbumEle).click(function(e){
            e.preventDefault();

            let self = this;

            $.ajax({
                type: 'GET',
                url: $(self).attr('href')
            })
            .done(function(data){
                
                let favAlbums = favAlbumsDom(data);
                $(`.title`).css({"height": "0px","visibility":"hidden","padding-bottom": "0px"});
                $(`#body div`).css({"height": "0px","min-height":"0px","visibility":"hidden"});
                $(`#body`).append(favAlbums);
                var obj = new Object();

                for(let fav of data.data.favourites) {
                    if(fav.user._id == data.data.user) {
                        if(obj[fav.song.album.name] == undefined) {
                            obj[fav.song.album.name] = 1;
                            let eachAlbum = eachAlbumDom(fav);
                            $(`#favourite-albums > .albums-artists-container`).append(eachAlbum);
                        }
                        
                    }
                }
                new FavouriteAlbumSongs($(' .each-album-fav',favAlbums)); 
            })
            .fail(function(errData){
                console.log("Error in completing the request ",errData);
            })

        })    
    }

}

let favAlbumsDom = function(data){

    return $(`<div>
    <div class="whole-fav" id="favourite-albums">
        <div class="title">${data.data.title}</div>
        <div class="albums-artists-container">

        </div>
    </div>
    </div>`);

    
}

let eachAlbumDom = function(fav){

    return $(`<div class="each-album-artist" id="each-album-${fav.song.album._id}">
    <div class="album-artist-info">
        <a href="/user/favourite/album-songs/?album_id=${fav.song.album._id}" class="each-album-fav" ><img class="each-photo" src="${fav.song.album.photo}" alt=""></a>

        <div class="album-artist-details-name">
            
            <a href="/user/favourite/album-songs/?album_id=${fav.song.album._id}" class="album-artist-name each-album-fav"><span >${fav.song.album.name}</span></a>
            
        </div>
    </div>
</div>`)
}