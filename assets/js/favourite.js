class ToogleFav{
    constructor(toogleEle){
        this.toogler = toogleEle;
        this.toogleFav();
    }

    toogleFav(){

        let pSelf = this;

        $(this.toogler).click(function(e){
            e.preventDefault();

            let self = this;

            $.ajax({
                type: 'GET',
                url: $(self).attr('href'),
            })
            .done(function(data){
                //console.log(data);
                if(data.data.deleted == true){
                    // console.log("true");
                    $(self).html(`<i class="fas fa-heart" style="color: white"></i>`);
                    pSelf.notyNotification('Removed from Favourites','success');
                    if(data.data.location == 'profile'){
                        $(`#each-song-${data.data.song_id}`).remove();
                    }
                }
                else{
                    // console.log("false");
                    $(self).html(`<i class="fas fa-heart" style="color: red"></i>`);
                    pSelf.notyNotification('Added to Your Favourites','success');
                }

                
            })
            .fail(function(errData){
                console.log("Error in completeing the request");
            });
        });
    }

    notyNotification(nText,nType){

        new Noty({
            theme: 'relax',
            text: nText,
            type: nType,
            layout: "topRight",
            timeout: 1500
        }).show();
    }

}