$.fn.Spinner = function(options, callback) {
    var data = this.data("spinner") || [];
    for(var i=0;i<this.length;i++){
        if(options.destroy){
            Spinner.destroy.call($(this[i]), options, callback);
            this.data("spinner",[]);
        }else{
            var instance = Spinner.init.call($(this[i]), options, callback);
             data.push(instance);
            this.data("spinner",data);
        }
    }
    return this;
};

$.fn.callback = function(fnc, context, args){
    if(fnc && typeof fnc === 'function'){
        fnc.apply(context||window, args);
    }
};

Spinner = (function() {

    var spinnerEvents = {
        decrementVal: function() {
            var value = parseInt(this.data.elems.spinVal.val()) || this.data.options.min;
            if(value > this.data.options.min) {
                this.data.options.value = value - 1;
                spinnerEvents.changeValue.call(this);
                $().callback(this.data.options.decrementCallback, this, [this.data.options.value, window.event]);
            }
        },

        incrementVal: function() {
            var value = parseInt(this.data.elems.spinVal.val()) || this.data.options.min;
            if(value < this.data.options.max) {
                this.data.options.value = value + 1;
                spinnerEvents.changeValue.call(this);
                $().callback(this.data.options.incrementCallback, this, [this.data.options.value, window.event]);
            }
        },

        changeValue: function() {
            this.data.elems.spinVal.val(this.data.options.value);
            spinnerEvents.checkIncDecStatus.call(this);
        },

        createSpinnerComponent: function() {
            var $spinnerWrapper = $("<div></div>", {"class": "spinnerWrapper"}),
                $decrement = $("<span></span", {"class": "decrement"}),
                $spinVal = $('<input/>', {"class": "spinVal"}),
                $increment = $("<span></span", {"class": "increment"});

            $decrement.html('-');
            $increment.html('+');
            $spinVal.val(this.data.options.value ||this.data.options.min);
            $spinnerWrapper.append($decrement).append($spinVal).append($increment);
            this.append($spinnerWrapper);
            spinnerEvents.afterInit.call(this);
            this.data.elems.decrement = $decrement;
            this.data.elems.increment = $increment;
            this.data.elems.spinVal = $spinVal;
            this.data.options.value = parseInt($spinVal.val());

        },

        bindSpinnerEvents: function() {
            this.data.elems.decrement.on('click',spinnerEvents.decrementVal.bind(this));
            this.data.elems.increment.on('click', spinnerEvents.incrementVal.bind(this));
            this.data.elems.spinVal.on('keypress', spinnerEvents.onValueChange.bind(this));
        },

        tfNumOnly: function(e) {
            var me = this, code = e.charCode || e.keyCode;
            if(code>=48 && code<=57) {
                return true;
            } else if(code===8||code===9||(code>=37 && code<=40)) {
                return true;
            }
            return false;
        },

        onValueChange: function(event) {
            spinnerEvents.readValue.call(this, function(value) {
                if(spinnerEvents.tfNumOnly(event)) {
                    if(spinnerEvents.isValueInRange.call(this, value)) {
                        this.data.options.value = value;
                        $().callback(this.data.options.onValueChange, this, [value, event]);
                        spinnerEvents.checkIncDecStatus.call(this);
                    } else {
                        this.data.elems.spinVal.val(this.data.options.value);
                    }
                } else {
                    this.data.elems.spinVal.val(this.data.options.value);
                }
            });
        },

        readValue: function(callback) {
            var that = this;
            setTimeout(function() {
                var value = that.data.elems.spinVal.val();
                $().callback(callback, that, [value]);
            }, 0);
        },

        isValueInRange: function(value) {
            return (value >= this.data.options.min && value <= this.data.options.max)
        },

        checkIncDecStatus: function() {
            if(this.data.options.value == this.data.options.min) {
                this.data.elems.decrement.addClass('disabled');
                this.data.elems.increment.removeClass('disabled');
            } else if(this.data.options.value == this.data.options.max) {
                this.data.elems.increment.addClass('disabled');
                this.data.elems.decrement.removeClass('disabled');
            } else {
                this.data.elems.increment.removeClass('disabled');
                this.data.elems.decrement.removeClass('disabled');
            }
        },


        afterInit: function(callback) {
            $().callback(this.data.callback, this);
        },

        initSpinner: function(options) {
            spinnerEvents.createSpinnerComponent.call(this);
            spinnerEvents.bindSpinnerEvents.call(this);
            spinnerEvents.checkIncDecStatus.call(this);
        }
    };

    var spinner = {};
    spinner.init = function(options, callback){
        var data = {};
        data.options =  options;
        data.callback = callback;
        data.elems = {};
        this.data = data;
        spinnerEvents.initSpinner.call(this);
        return this.data;
    };

    spinner.destroy = function(options, callback){
        $(this).find(".spinnerWrapper").remove();
        $().callback(callback, this);
        return this;
    }

    return spinner;

})();
