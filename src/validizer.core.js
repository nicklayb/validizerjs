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
