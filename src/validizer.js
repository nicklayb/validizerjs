
$.validators = {
    rules:{
        required: function(value, args, context){
            var tag = $(context).attr('type');
            if(tag == 'radio'){
                var name = $(context).attr('name');
                return ($('input[name="' + name + '"]:checked').length > 0);
            }
            return value != '';
        },
        len_gt: function(value, args, context){
            return value.length > parseInt(args[0]);
        },
        len_gte: function(value, args, context){
            return value.length >= parseInt(args[0]);
        },
        len_lt: function(value, args, context){
            return value.length < parseInt(args[0]);
        },
        len_lte: function(value, args, context){
            return value.length <= parseInt(args[0]);
        },
        gt: function(value, args, context){
            return parseInt(value) > parseInt(args[0]);
        },
        gte: function(value, args, context){
            return parseInt(value) >= parseInt(args[0]);
        },
        lt: function(value, args, context){
            return parseInt(value) < parseInt(args[0]);
        },
        lte: function(value, args, context){
            return parseInt(value) <= parseInt(args[0]);
        },
        between_exclusive: function(value, args, context){
            return parseInt(value) > args[0] && parseInt(value) < agrs[1];
        },
        between: function(value, args, context){
            return parseInt(value) >= args[0] && parseInt(value) <= agrs[1];
        },
        equals: function(value, args, context){
            return (value == args[0]);
        },
        checked: function(value, args, context){
            return $(context).is(':checked');
        },
        date: function(value, args, context){
            return !isNaN(Date.parse(value));
        },
        number: function(value, args, checked) {
            return !isNaN(value);
        },
    },
    messages: {

    },
    test: function(rule, value, args, context){
        return $.validators.rules[rule](value, args, context);
    }
};
$.fn.extend({
    validate: function(callback){
        var validators = $(this).attr('data-validate'),
            value = $(this).val(),
            callback = callback || function(){},
            context = $(this).closest('form');
        $(this).removeClass('valid').removeClass('invalid');
        if(validators != '' && validators != null){
            validators = validators.split('|');
        }
        else{
            validators = [];
        }
        for(var i = 0; i < validators.length; i++){
            var validator = validators[i],
                splitterIndex = validator.indexOf(':'),
                args = [];
            if(splitterIndex > -1){
                args = validator.substr(splitterIndex + 1).split(',');
                validator = validator.substr(0, splitterIndex);
            }
            if(!$.validators.test(validator, value, args, this)){
                $(this).addClass('invalid');
                $(this).tooltip();
                callback(this, false);
                return false;
            }
        }
        $(this).addClass('valid');
        callback(this, true);
        return true;
    },
    validateAll: function(callback){
        var validables = $(this).find('.validable'),
            valids = $(this).find('.validable.valid'),
            submit = $(this).find('button[type="submit"]'),
            result = (validables.length == valids.length);
        submit.attr('disabled', !result);
        return result;
    }
});
$(document).ready(function(){
    $('.validable').on('change', function(){
        $(this).validate(function(context){
            $(context).closest('form').validateAll();
        });
    });
    $('.validable').change();
});
