$(document).ready(() => {
    function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    const $needsResumeList = $("#needsResumeList");
    const $needsTransList = $("#needsTransList");
    const $readyList = $("#readyList");
    const $addMovieModal = $("#addMovie-modal");

    $addMovieModal.toggle();

    $needsTransList.empty();
    $needsResumeList.empty();
    $readyList.empty();

    $.get("http://localhost:3000/getMovies", function(movies) {

        movies.forEach((movie) => {
            let movieHtml;
            if (!movie.needsResume && !movie.needsTrans) {
                movieHtml = `
                <div class="task-block" draggable="true" ondragstart ="drag(event)">
                    <div class="movie-row">
                        <div class="thumb"><img src= ${movie.img} width="337" sizes="50px" class="thumb-img"></div>
                        <div class="movie-title">${movie.title} (${movie.releaseYear})</div>
                    </div>
                    <a href="#" class="movie-options-box w-inline-block finishedPosting" data-movie-id="${movie.id}" id="finishedPosting">
                        <div class="remove-movie-vertical"></div>
                        <div class="remove-movie-horizontal"></div>
                    </a>
                </div>`;
            }
            else if (!movie.needsResume && movie.needsTrans) {
                movieHtml = `
            <div class="task-block" draggable="true" ondragstart ="drag(event)">
                <div class="movie-row">
                    <div class="thumb"><img src= ${movie.img} width="337" sizes="50px" class="thumb-img"></div>
                    <div class="movie-title">${movie.title} (${movie.releaseYear})</div>
                </div>
                <a href="#" class="movie-options-box w-inline-block moveToReady" data-movie-id="${movie.id}" id ="moveToReady">
                    <div class="movie-options-arrow"></div>
                </a>
            </div>`;
            }
            else {
                movieHtml = `
            <div class="task-block" draggable="true" ondragstart ="drag(event)">
                <div class="movie-row">
                <div class="thumb"><img src= ${movie.img} width="337" sizes="50px" class="thumb-img"></div>
                <div class="movie-title">${movie.title} (${movie.releaseYear})</div>
            </div>
                <a class="movie-options-box w-inline-block moveToTrans" data-movie-id="${movie.id}" id="moveToTrans">
                    <div class="movie-options-arrow"></div>
                </a>
            </div>`;
            }

            if (movie.needsResume) {
                $needsResumeList.append(movieHtml);
            }
            else if (movie.needsTrans) {
                $needsTransList.append(movieHtml);
            }
            else {
                $readyList.append(movieHtml);
            }


        });

        $(".moveToTrans").click(function () {
            const idMovie = $(this).data("movie-id");
            $.post("http://localhost:3000/resumeDone/"+idMovie, function(result){
                alert(result);
                window.location.reload();
            });
        });

        $(".moveToReady").click(function () {
            const idMovie = $(this).data("movie-id");
            $.post("http://localhost:3000/transDone/"+idMovie, function(result){
                alert(result);
                window.location.reload();
            });

        });

    });



//----- OPEN
            $('.addMovie').on('click', function(e)  {
                var targeted_popup_class = jQuery(this).attr('data-popup-open');
                $("#movieTitle-2").value = "";
                $("#img-2").value="";
                $("#needsResume").prop("checked", false);
                $('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);
                $("#modalWrapper").addClass("modal-wrapper-show");
                e.preventDefault();
            });
//----- CLOSE
            $('[data-popup-close]').on('click', function(e)  {
                var targeted_popup_class = jQuery(this).attr('data-popup-close');
                $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);
                $("#modalWrapper").removeClass("modal-wrapper-show");
                e.preventDefault();
            });


});