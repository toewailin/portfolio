var Typer = {
    text: '',
    index: 0,
    speed: 3,
    file: 'AboutMe.txt',
    cursor: '<span class="blink-cursor">|</span>',
    init: function () {
        // Simulate terminal prompt with command (no extra newline)
        $('#console').html('toe@mac:~$cat AboutMe.txt<br/>');

        // Load the text content
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

            // Handle [resume-download] tag
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

            // Append blinking cursor during typing
            $('#console').append(Typer.cursor);
            $('#console').scrollTop($('#console')[0].scrollHeight);
            setTimeout(Typer.typing, 30);
        } else {
            // Done typing — replace cursor with clean new prompt
            let content = $('#console').html();
            if (content.endsWith(Typer.cursor)) {
                $('#console').html(content.slice(0, -Typer.cursor.length));
            }
            $('#console').append('<br/>toe@mac:~$');
        }
    }
};
