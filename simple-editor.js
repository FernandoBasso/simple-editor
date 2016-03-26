var l = console.log.bind(console);

var simpleEditor = (function ($) {

    var $editors,
        $b, $i, $i;

    var template = " \
        <div class='simpledit wrapper'> \
            <div class='buttons'> \
                <i class='btn bold'>b</i> \
                <i class='btn italic'>i</i> \
                <i class='btn underline'>u</i> \
            </div> \
            <div class='text' contentEditable='true'></div> \
        </div> \
    ";

    function init(opts) {
        checkOpts(opts);

        setup(opts);
    }

    function checkOpts(opts) {
        opts.selector = opts.selector || 'textarea';
        opts.pastePlain = opts.pastePlain || false;
    }

    /**
     * Remove formatting upon pasting text into the editable area.
     */
    function plainTextOnPaste() {
        $editors.find('.text').on('paste', function () {
            var _self = this;
            var plaintext;
            setTimeout(function () {
                plaintext = _self.textContent;
                $(_self).text(plaintext);
            }, 3);
        });
    }

    /**
     * Apply bold and italic when ‘b’ and ‘i’ buttons are clicked.
     *
     * In some browsers, ^b and ^i shortcuts just work. Sadly, some browsers
     * already use those shortcuts for themselves (^b bookmarks, ^i page info).
     */
    function formatText() {

        // Prevent loosing text selection when clicking the buttons.
        $(document).on('mousedown', '.simpledit .buttons i.bold, .simpledit .buttons i.italic, .simpledit .buttons i.underline', function (evt) {
            evt.preventDefault();
        });

        $b.on('click', function () {
            document.execCommand('bold');
        });
        $i.on('click', function () {
            document.execCommand('italic');
        });
        $u.on('click', function () {
            document.execCommand('underline');
        });
    }

    /**
     * Bootstrap everything.
     */
    function setup(opts) {

        $textareas = $(opts.selector);

        $textareas.each(function () {
            $(this).css('display', 'none');
            $(this).before(template);
        });

        $editors = $('.simpledit.wrapper');

        $b = $editors.find('i.bold');
        $i = $editors.find('i.italic');
        $u = $editors.find('i.underline');

        if (opts.pastePlain) {
            plainTextOnPaste();
        }

        formatText();
    }

    /**
     * Sends text from the editable content to their respective textareas.
     */
    function save() {
        $editors.find('.text').each(function () {
            $(this).closest('.fields').find('textarea').val(this.innerHTML);
        });
    }

    // Publish things needed on the outside world.
    return {
        init: init,
        save: save
    };

})(jQuery);

simpleEditor.init({
    selector: 'form .fields textarea',
    pastePlain: true
});

// Before submitting, we have to get the text from the editable containers
// and copy them to their respective textareas so the browser sends stuff
// properly to the server.
$('form').on('submit', function () {
    simpleEditor.save();
});

