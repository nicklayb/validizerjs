# Validizer
###### By Nicolas Boisvert :: nicklay@me.com
### A simple html helper for javascript validations

This is a simple Jquery plugin allowing anyone to easily validate a form within some validations. Of course, the plugin already includes some basic validator such as `required`, `gt` (for greater than), `between` etc... But you fool can add your own validator easily.

## Requirements
- Jquery v. 2+


## Installation

#### npm
 Just execute `npm install validizerjs` in your terminal

#### Downloading
- Download, as you wish, the minified version or the production version in the repository

## Usage

Now you may wonder: "How the hell do I use that?"... Well... It's easier than you can think. If you ever worked with the awesomely wonderful Taylor Otwell's Laravel, you will recognize the valiator syntax (It's pretty inspired from).

##### Making an input validable and defining his rules
You need to add the `validable` class to your HTML inputs. You also need the attribute `data-validate` to your element with your rules seperated by a pipe `|`. If the rule requires parameters, you need to add them after a colon `:` and seperate your arguments with comma `,`.
```html
<input type="text" name="firstname" class="validable" data-validate="required|len_gte:5">
```

In our example, my `firstname` input is `required`. So, as long as the field will be empty, the surrounding form will not be submittable. We also included the rule `len_gte` which is length greater than equals with a first parameter of 5. So, as long as the field will be empty **OR** the field will contain a word less than 5 caracter, the surrounding form won't be submittable.

###### What's going on?

At first, if the field's rules are matched to true, the input will get the class `valid`. If any of the rule is matched to false, the input will get the class `invalid`. On each input change, the surrounding form is validated. If the form contains at least one invalid field, the submit button will be disabled to prevent user from submitting.

### API

Since Validizer is a Jquery plugin, we extended Jquery.

Here are the methods.

`$('input').validate()` : will validate the input's rules.

`$('form').validateAll()` : will validate each `.validable` inputs in the form

### Extending rules

If you would like to add a custome rules, feel free to do it. Validators are function who are given the input value as `value`, an array of arguments which are the values after the colon as `args` and the context which the input himself. Your validator must return a boolean value
```js
$.validators.rules['not_equals'] = function(value, args, context){
    return (value != args[0]);
}
```
You could use this rules with a parameter of a string. If your input value is the one given in parameter, let's return true! See the example below.
```html
<input type="text" name="firstname" class="validable" data-validate="not_equals:You shall not pass">
```

As long as your input is not "You shall not pass", you validator should pass.

### Built-in rules
- `required` :
 - Params : no
 - Does : Validate that the field is not empty, in the case of a `radio`, it ensure that at least one option is selected
- `len_gt` :
 - Params : `:x`, where x is a number
 - Does : Validate if the string length is greater than the x value.
- `len_gte` :
 - Params : `:x`, where x is a number
 - Does : Validate if the string length is greater than or equals the x value.
- `len_lt` :
 - Params : `:x`, where x is a number
 - Does : Validate if the string length is less than the x value.
- `len_lte` :
 - Params : `:x`, where x is a number
 - Does : Validate if the string length is less than or equals the x value.
- `gt` :
 - Params : `:x`, where x is a number
 - Does : Validate if the input value is greater than the x value.
- `gte` :
 - Params : `:x`, where x is a number
 - Does : Validate if the input value is greater than or equals the x value.
- `lt` :
 - Params : `:x`, where x is a number
 - Does : Validate if the input value is less than the x value.
- `lte` :
 - Params : `:x`, where x is a number
 - Does : Validate if the input value is less than or equals the x value.
- `between_exclusive` :
 - Params : `:x,y`, where x and y are numbers
 - Does : Validate if the input value is between the x and y values **but not equals**
- `between` :
 - Params : `:x,y`, where x and y are numbers
 - Does : Validate if the input value is between or equals the x and y values
- `equals` :
 - Params : `:x`, where x is a string
 - Does : Validate if the input value is exactly the same as x
- `checked` :
 - Params : no
 - Does : Validate if the input is `checked`. Would only work with `radio` or `checkbox`
- `date` :
 - Params : no
 - Does : Validate if the input a valid date string according to `Date.parse(x)`
- `number` :
 - Params : no
 - Does : Validate if the input a valid number according to `isNumeric(x)`

### Conclusion
If you're like me and hate doing if...else if...else etc... You may love to use this. Feel free to report problem or suggest anything

Ending joke :
> **Q** : How many programmers does it takes to change a light bulb? **A** : None, it's a hardware problem
