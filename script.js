var Typer = {
    text: '',
    index: 0,
    speed: 3,
    file: 'AboutMe.txt',
    cursor: '<span class="blink-cursor">|</span>',
    init: function () {
        $.ajax({
            url: Typer.file,
            dataType: 'text',
            success: function(data) {
                Typer.text = data;
                Typer.typing();
            },
            error: function() {
                console.error("Could not load file");
            }
        });
    },
    typing: function () {
        if (Typer.index < Typer.text.length) {
            let nextChar = Typer.text.charAt(Typer.index);
            let content = $('#console').html();

            // Remove existing cursor
            if (content.endsWith(Typer.cursor)) {
                $('#console').html(content.slice(0, -Typer.cursor.length));
            }

            // Append the next character
            $('#console').append(nextChar === '\n' ? '<br/>' : nextChar);
            Typer.index++;
            
            // Add cursor
            $('#console').append(Typer.cursor);
            
            $('#console').scrollTop($('#console')[0].scrollHeight);
            setTimeout(Typer.typing, 30);
        }
    },
    
};

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
  
Typer.init();
