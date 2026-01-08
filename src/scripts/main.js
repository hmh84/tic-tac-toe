// =========================
// CLICKING AN AREA
// =========================

var areas = document.querySelectorAll('.area');
var player_ind = document.querySelector('.player-ind');
var player_win = document.querySelector('.player-win');

var block = false;
var active_player = 'x';
player_ind.innerHTML = active_player;

areas.forEach(area => {
    area.addEventListener('click', () => {
        if (block === false) {
            if (!area.dataset.value) {
                area.dataset.value = active_player;
                area.innerHTML = active_player;
    
                if (active_player == 'x') {
                    call_speaker('x.mp3');
                    active_player = 'o';
                } else if (active_player == 'o') {
                    call_speaker('o.mp3');
                    active_player = 'x';
                }
        
                player_ind.innerHTML = active_player;
                check_for_win();
            }
        }
    })
});

// =========================
// WIN LOGIC
// =========================

function check_for_win() {
    const filled_cells = document.querySelectorAll('.area[data-value]').length;
    if (
        (areas[0].dataset.value == 'x') && (areas[1].dataset.value == 'x') && (areas[2].dataset.value == 'x') ||
        (areas[3].dataset.value == 'x') && (areas[4].dataset.value == 'x') && (areas[5].dataset.value == 'x') ||
        (areas[6].dataset.value == 'x') && (areas[7].dataset.value == 'x') && (areas[8].dataset.value == 'x') ||
        (areas[0].dataset.value == 'x') && (areas[3].dataset.value == 'x') && (areas[6].dataset.value == 'x') ||
        (areas[1].dataset.value == 'x') && (areas[4].dataset.value == 'x') && (areas[7].dataset.value == 'x') ||
        (areas[2].dataset.value == 'x') && (areas[5].dataset.value == 'x') && (areas[8].dataset.value == 'x') ||
        (areas[0].dataset.value == 'x') && (areas[4].dataset.value == 'x') && (areas[8].dataset.value == 'x') ||
        (areas[2].dataset.value == 'x') && (areas[4].dataset.value == 'x') && (areas[6].dataset.value == 'x')
    ) {
        const winner = 'x';
        display_win(winner);
    }
    else if (
        (areas[0].dataset.value == 'o') && (areas[1].dataset.value == 'o') && (areas[2].dataset.value == 'o') ||
        (areas[3].dataset.value == 'o') && (areas[4].dataset.value == 'o') && (areas[5].dataset.value == 'o') ||
        (areas[6].dataset.value == 'o') && (areas[7].dataset.value == 'o') && (areas[8].dataset.value == 'o') ||
        (areas[0].dataset.value == 'o') && (areas[3].dataset.value == 'o') && (areas[6].dataset.value == 'o') ||
        (areas[1].dataset.value == 'o') && (areas[4].dataset.value == 'o') && (areas[7].dataset.value == 'o') ||
        (areas[2].dataset.value == 'o') && (areas[5].dataset.value == 'o') && (areas[8].dataset.value == 'o') ||
        (areas[0].dataset.value == 'o') && (areas[4].dataset.value == 'o') && (areas[8].dataset.value == 'o') ||
        (areas[2].dataset.value == 'o') && (areas[4].dataset.value == 'o') && (areas[6].dataset.value == 'o')
    ) {
        const winner = 'o';
        display_win(winner);
    } else if (filled_cells == 9) {
        const winner = 'tie';
        display_win(winner);
    }
}

function display_win(winner) {
    if (winner == 'tie') {
        player_win.innerHTML = 'tie!';
    } else {
        player_win.innerHTML = winner + "'s won!";
    }
    block = true;
    win_effect();
}

// =========================
// WIN BOARD EFFECT
// =========================

function flash_v1() {
    document.getElementsByTagName('style')[0].innerHTML = '.area {border-color: white !important;}';
}

function flash_v2() {
    document.getElementsByTagName('style')[0].innerHTML = '.area {border-color: var(--dark-green) !important;}';
}

function win_effect() {
    call_speaker('win.mp3');
    const flash_speed = 175; // in ms
    flash_v1();
    setTimeout(function() {
        flash_v2();
        setTimeout(function() {
            flash_v1();
            setTimeout(function() {
                flash_v2();
                setTimeout(function() {
                    flash_v1();
                    setTimeout(function() {
                        flash_v2();
                    }, flash_speed);
                }, flash_speed);
            }, flash_speed);
        }, flash_speed);
    }, flash_speed);
}

// =========================
// RESET BUTTON
// =========================

const reset = document.querySelector('button.reset');

reset.addEventListener('click', () => {
    areas.forEach(area => {
        if (area.dataset.value) {
            area.removeAttribute('data-value');
            area.innerHTML = '';
            player_win.innerHTML = '';
            active_player = 'x';
            player_ind.innerHTML = active_player;
            block = false;
        }
    });
})

// =========================
// AUDIO
// =========================

const speaker = document.querySelector('#speaker');

function call_speaker(sound) {
    speaker.src = './sounds/' + sound;
    speaker.play();
}