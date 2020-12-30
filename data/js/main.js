{
    window.root = new Object();

    const m_window = document.querySelector('.modal')
        , m_title = document.querySelector('.modal-title')
        , m_body = document.querySelector('.modal-body')
        , m_ok = document.querySelector('.modal-ok')
        , m_cancel = document.querySelector('.modal-cancel')

    window.root.ui = 'desktop';

    window.root.notify = (title, body, mc_ok = 'Ок', mc_cancel = 'Отмена') => {
        m_window.classList.add('active');

        return new Promise(res => {
            function close(reply){
                res(reply)

                m_window.classList.remove('active');
            }

            m_ok.innerText = mc_ok;

            if(mc_cancel != null) {
                m_cancel.style.display = 'block';

                m_cancel.innerText = mc_cancel;
            } else {
                m_cancel.style.display = 'none';
            }

            m_ok.onclick = close.bind(null, true);
            m_cancel.onclick = close.bind(null, false);

            m_title.innerText = title;
            m_body.innerHTML = 
                body.replace(/('|"|`|\*|-)([^\1]+)\1/g, "'<code>$2</code>'");
        })
    }
};

{
    window.root.setUi = ui => {
        $('.container').attr('ui', ui);

        window.root.ui = ui;
    }

    if('ontouchstart' in window){
        window.root.setUi('mobile');
    } else {
        window.root.setUi('desktop');
    }

    if(window.localStorage.getItem('settings.user.theme') != null) {
        window.themes.load(window.localStorage.getItem('settings.user.theme'));
        
        if(window.localStorage.getItem('settings.user.theme') != 'default')
            $('.theme-switch').addClass('switched');
    }
}

{
    window.root.leftMenuActive = () => {
        return $('#target-header-buttons').css('left') == '0px';
    }

    window.root.leftMenuChange = () => {
        $('#target-header-buttons').css('left', window.root.leftMenuActive() ? '-100%' : '0px');
    }

    $('#left-menu-target-trigger').on('click', window.root.leftMenuChange);
}

{
    $('.theme-switch').on('click', e => {
        if(e.target.classList.contains('switched')) {
            window.themes.load('default');

            e.target.classList.remove('switched');
        } else {
            window.themes.load('darked');

            e.target.classList.add('switched');
        }

        localStorage.setItem('settings.user.theme', window.themes.current)
    })

    $(window).on('click', e => {
        if(e.target.tagName == 'A') {
            (async () => {
                if(await window.root.notify('Переход по ссылке', 'Вы уверены, что хотите перейти на \'' + e.target.href + '\'?', 'Да', 'Отмена'))
                    window.location = e.target.href;
            })();

            // Отменяем стандартное поведение
            e.preventDefault()
        } else if(e.target.tagName == 'BUTTON') {
            // Remove any old one
            $('.ripple').remove();
        
            // Setup
            let buttonWidth = e.target.offsetWidth, 
                buttonHeight = e.target.offsetHeight;
        
            // Make it round!
            if(buttonWidth >= buttonHeight) {
                buttonHeight = buttonWidth;
            } else {
                buttonWidth = buttonHeight;
            }
        
            // Get the center of the element
            const x = e.offsetX == undefined ? e.layerX : e.offsetX - buttonWidth / 2
                , y = e.offsetY == undefined ? e.layerY : e.offsetY - buttonHeight / 2;
        
            // Add the element
            const span = document.createElement('span');

            span.className = 'ripple';

            const s = span.style;

            s.width = buttonWidth + 'px';
            s.height = buttonHeight + 'px';

            s.top = y + 'px';
            s.left = x + 'px';

            e.target.appendChild(span);

            // Отменяем стандартное поведение
            e.preventDefault();
        }
    });
};