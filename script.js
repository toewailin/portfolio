var Typer = {
    text: '',
    index: 0,
    speed: 3,
    file: 'AboutMe.txt',
    cursor: '<span class="blink-cursor">|</span>',
    init: function () {
        // Set the terminal prompt and command simulation (cat AboutMe.txt)
        $('#console').html('toe@mac:~$cat AboutMe.txt<br/>');

        // Load the file
        $.ajax({
            url: Typer.file,
            dataType: 'text',
            success: function (data) {
                Typer.text = data;
                Typer.typing();
            },
            error: function () {
                console.error("Could not load file");
            }
        });
    },
    typing: function () {
        if (Typer.index < Typer.text.length) {
            let remaining = Typer.text.substring(Typer.index);
            let content = $('#console').html();
    
            // Remove existing cursor
            if (content.endsWith(Typer.cursor)) {
                $('#console').html(content.slice(0, -Typer.cursor.length));
            }
    
            // Handle custom [resume-download] tag
            if (remaining.startsWith('[resume-download]')) {
                $('#console').append(
                    `<a href="https://drive.google.com/file/d/1wiMTyQU9mHG5SSZJUbFN1-TrX29s3pcj/view?usp=sharing" target="_blank" style="color:#00d9ff; text-decoration:none;"><i class="fas fa-download"></i> Download Resume 📄</a><br/>`
                );
                Typer.index += '[resume-download]'.length;
            } else {
                let nextChar = Typer.text.charAt(Typer.index);
                $('#console').append(nextChar === '\n' ? '<br/>' : nextChar);
                Typer.index++;
            }
    
            // Re-add cursor while typing
            $('#console').append(Typer.cursor);
            $('#console').scrollTop($('#console')[0].scrollHeight);
            setTimeout(Typer.typing, 30);
        } else {
            // Finished typing file — add a new prompt line with blinking cursor
            let content = $('#console').html();
    
            // Remove the final typing cursor
            if (content.endsWith(Typer.cursor)) {
                $('#console').html(content.slice(0, -Typer.cursor.length));
            }
    
            // Append a fresh prompt with the blinking cursor
            $('#console').append('toe@mac:~$' + Typer.cursor);
        }
    }
};

// Optional: unused utility
function replaceUrls(text) {
    var http = text.indexOf('http://');
    var space = text.indexOf('.me ', http);

    if (space != -1) {
        var url = text.slice(http, space - 1);
        return text.replace(url, '<a href="' + url + '">' + url + '</a>');
    } else {
        return text;
    }
}

// Start the animation
Typer.init();
