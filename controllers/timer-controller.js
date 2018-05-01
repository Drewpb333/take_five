var pomodoro = {
    started: false,
    minutes: 0,
    seconds: 0,
    fillerHeight: 0,
    fillerIncrement: 0,
    interval: null,
    totalTime: null,
    minutesDom: null,
    secondsDom: null,
    fillerDom: null,

    init: function () {
        var self = this;
        this.minutesDom = $('#minutes');
        this.secondsDom = $('#seconds');
        this.fillerDom = $('#filler');
        this.interval = setInterval(function () {
            self.intervalCallback.apply(self);
        }, 1000);
        $('#start').click(function () {
            var choice = $("#options").val();
            timerChoice(choice);
            $('.feed').hide();
        });
        $('#stop').click(function () {
            self.stopTimer.apply(self);
            $('.feed').show();
        });
    },



    resetVariables: function (mins, secs, started, test) {
        this.minutes = mins;
        this.seconds = secs;
        this.started = started;
        if (test) {
            this.fillerIncrement = 200 / this.seconds;
        } else {
            this.fillerIncrement = 200 / (this.minutes * 60);
        }
        this.fillerHeight = 0;
    },

    //lasts 10 seconds
    startTest: function () {
        this.resetVariables(0, 10, true, true);
        $('.feed').hide();
    },

    //lasts 10 seconds
    startTestBreak: function () {
        this.resetVariables(0, 10, true, true);
        $('.feed').show();
    },

    startWork: function () {
        this.resetVariables(25, 0, true, false);

        $('.feed').hide();
    },

    startShortBreak: function () {


        this.resetVariables(5, 0, true, false);


        $('.feed').show();
        //function for showing newsfeed and redditfeed will appear here
    },

    stopTimer: function () {


        this.resetVariables(25, 0, false, false);


        this.updateDom();
        $('.feed').show();
    },

    toDoubleDigit: function (num) {
        if (num < 10) {
            return "0" + parseInt(num, 10);
        }
        return num;
    },

    updateDom: function () {
        this.minutesDom.text(this.toDoubleDigit(this.minutes));
        this.secondsDom.text(this.toDoubleDigit(this.seconds));
        this.fillerHeight = this.fillerHeight + this.fillerIncrement;
        this.fillerDom.css('height', this.fillerHeight + 'px');
    },

    intervalCallback: function () {
        if (!this.started) return false;
        if (this.seconds == 0) {
            if (this.minutes == 0) {
                this.timerComplete();
                return;
            }
            this.seconds = 59;
            this.minutes--;
        } else {
            this.seconds--;
        }
        this.updateDom();
    },

    timerComplete: function () {
        this.started = false;
        this.fillerHeight = 0;
        $('.feed').show();

    }
};

$(document).ready(function () {
    pomodoro.init();

});

// //dealing with client choice of time
function timerChoice(choice) {
    switch (choice) {
        case "30":
            //one session
            startTimer();
            break;
        case "60":
            //two sessions
            startTimer();
            setTimeout(startTimer, 30 * 60 * 1000);
            break;
        case "90":
            //three sessions
            startTimer();
            setTimeout(startTimer, 30 * 60 * 1000);
            setTimeout(startTimer, 60 * 60 * 1000);
            break;
        case "120":
            //four sessions
            startTimer();
            setTimeout(startTimer, 30 * 60 * 1000);
            setTimeout(startTimer, 60 * 60 * 1000);
            setTimeout(startTimer, 90 * 60 * 1000);
            break;


        case "test":
            startTest();

    }
}

function startTimer() {
    pomodoro.startWork.apply(pomodoro);
    setTimeout(function () {
        pomodoro.startShortBreak.apply(pomodoro);
    }, 25 * 60 * 1000);
}



//for 10 second test function
function startTest() {
    pomodoro.startTest.apply(pomodoro);
    setTimeout(function () {
        pomodoro.startTestBreak.apply(pomodoro);
    }, 10 * 1000);
}


