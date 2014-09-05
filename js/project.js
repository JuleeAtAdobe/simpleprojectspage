$( document ).ready(function() {

// load data
$.ajax({type: 'GET',
       url: '../json/current.json',
       dataType: 'json',
       success: function(projects) { 
                    addProjectsToDOM(projects); 
                },
       error: function(xhr, status, error){
            console.log(status);
        }
});
    
// for each project listed in the JSON object, add it to the DOM
function addProjectsToDOM(projects){
    
    for(var i=0; i < projects.length; i++) {

        var project = projects[i];

        // get current project data
        var title = project.title || "Adobe Web Platform Project";
        var blurb = project.blurb || "Let us know what you think about this project.";
        var img = project.imgLoc;
        var url = project.imgLink;
        var social = project.socialLinks[0];

        
        // create this project html elements
        var projectItem = {
            projectHTML: '<div class="proj_item" id="project_' + i +'">',
            titleHTML: '<div class="projectTitle" id="projTitle_' + i +'">',
            blurbHTML: '<div class="projectBlurb" id="projBlurb_' + i +'">',
            imgHTML: '<img class="projectImg" id="projImg_' + i +'">',
            socialHTML: '<div class="projectSocial" id="projSocial_' + i +'">'
        };
        
        // add this project to the container
        $('#proj_container').append(projectItem.projectHTML);
        
        $('#project_' + i).append(projectItem.titleHTML)
                          .append(projectItem.imgHTML)
                          .append(projectItem.blurbHTML);        
        
        $('#projImg_' + i).prop('src', img);
        $('#projImg_' + i).wrap( "<a>" );
        $('.proj_item > a').prop('href', url);
        $('#projTitle_' + i).text(title);
        $('#projBlurb_' + i).html(blurb);
        
        // add social footer
        $('#project_' + i).append(projectItem.socialHTML);
        
        // add specific social icons for this project
        
        $.each( social, function( key, value ) {

            if(value) {
                
                $('#projSocial_' + i).height( 50 );

                // add related social icon img
                var socialImgSrc = 'img/social-icon-sm-' + key + '.png';
                var socialImg ='<img class="socialImg" id="projSocialImg_' + key + '_' +  i +'" src="' + socialImgSrc + '">';
                $('#projSocial_' + i).append(socialImg);
                // add a link to the img
                var socialLink = '#projSocialImg_' + key + '_' +  i;
                var socialA =  '<a id="projSocialLink_' + key + '_' +  i + '" target="_blank">';
                var socialUID = '#projSocialLink_' + key + '_' +  i;
                $(socialLink).wrap( socialA );
                $(socialUID).prop('href', value);
            } 
        });
    }
}

});