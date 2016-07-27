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
    messages: { },
    test: function(rule, value, args, context){
        return $.validators.rules[rule](value, args, context);
    }
};
