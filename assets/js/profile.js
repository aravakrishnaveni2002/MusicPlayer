class Profile{

    constructor(proEle){
        this.proEle = proEle;
        this.profile();
    }

    profile(){
        $(this.proEle).click(function(e){
            e.preventDefault();

            let self = this;

            $.ajax({
                type: 'GET',
                url: $(self).attr('href')
            })
            .done(function(data){
                
                let profile = profileDom(data);
                
                $(`.title`).css({"height": "0px","visibility":"hidden","padding-bottom": "0px"});
                $(`#body div`).css({"height": "0px","min-height":"0px","visibility":"hidden"});
                $(`#body`).append(profile);
                

                new Play($(' .play-btn',profile));
                new ToogleFav($(' .add-fav',profile));
                new Profile($(' .profile_ele',profile));
                new FavouriteSongs($(' #fav-songs',profile));
                new FavouriteAlbums($(' #fav-albums',profile));
                new FavouriteArtists($(' #fav-artists',profile));
                new RecentlyPlayed($(' #recently-played',profile));
            })    
            .fail(function(errData){
                console.log("Error in completing the request ",errData);
            })

        });
    }

    


}

let profileDom = function(data){

    return $(`<link rel="stylesheet" href="/css/profile.css">

            <div>

                <div class="title">${data.data.title}</div>
                
                <div id="whole-profile">
                    <div id="info">
                        <h3>User Name: ${data.data.userName} </h3>
                        <h3>User Email: ${data.data.userEmail} </h3>
                        <a href="/user/add-song-details"><button>Add Song</button></a>
                    </div>
                    
                    <div id="user-controls">
                       <div><a href="/user/favourite/songs" class="each-ele headings" id="fav-songs">Songs</a></div>
                       <div><a href="/user/favourite/albums" class="each-ele headings" id="fav-albums">Albums</a></div>
                       <div><a href="/user/favourite/artists" class="each-ele headings" id="fav-artists">Artists</a></div>
                       <div><a href="/user/favourite/recently-played" class="each_ele headings" id="recently-played">Recently Played</a></div>
                    </div>
                    
                </div>

            </div>    
                `);
                
            
}
