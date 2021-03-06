/*
 * NumberedTextarea - jQuery Plugin
 * Textarea with line numbering
 *
 * Copyright (c) 2015 Dariusz Arciszewski
 *
 * Requires: jQuery v2.0+
 *
 * Licensed under the GPL licenses:
 *   http://www.gnu.org/licenses/gpl.html
 */

(function ($) {
    $.fn.numberedtextarea = function(options) {
        var settings = $.extend({
            color:          null,        // Font color
            borderColor:    null,        // Border color
            class:          null,        // Add class to the 'numberedtextarea-wrapper'
            allowTabChar:   false,       // If true Tab key creates indentation
        }, options);
 
        this.each(function() {
            if(this.nodeName.toLowerCase() !== "textarea") {
                console.log('This is not a <textarea>, so no way Jose...');
                return false;
            }
            
            addWrapper(this, settings);
            addLineNumbers(this, settings);
            
            if(settings.allowTabChar) {
                $(this).allowTabChar();
            }
        });
        return this;
    };
    
    $.fn.allowTabChar = function() {
        if (this.jquery) {
            this.each(function() {
                if (this.nodeType == 1) {
                    var nodeName = this.nodeName.toLowerCase();
                    if (nodeName == "textarea" || (nodeName == "input" && this.type == "text")) {
                        allowTabChar(this);
                    }
                }
            })
        }
        return this;
    }
    
    function addWrapper(element, settings) {
        var wrapper = $('<div class="numberedtextarea-wrapper"></div>').insertAfter(element);
        $(element).detach().appendTo(wrapper);
    }
    
    function addLineNumbers(element, settings) {
        element = $(element);
        
        var wrapper = element.parents('.numberedtextarea-wrapper');
        
        // Get textarea styles to implement it on line numbers div
        var paddingLeft = parseFloat(element.css('padding-left'));
        var paddingTop = parseFloat(element.css('padding-top'));
        var paddingBottom = parseFloat(element.css('padding-bottom'));
        
        var lineNumbers = $('<div class="numberedtextarea-line-numbers"></div>').insertAfter(element);
        
        element.css({
            paddingLeft: paddingLeft + lineNumbers.width() + 'px'
        }).on('input propertychange change keyup paste', function() {
            renderLineNumbers(element, settings);
        }).on('scroll', function() {
            scrollLineNumbers(element, settings);
        }); 
        
        lineNumbers.css({
            paddingLeft: paddingLeft + 'px',
            paddingTop: paddingTop + 'px',
            lineHeight: element.css('line-height'),
            fontFamily: element.css('font-family'),
            width: lineNumbers.width() - paddingLeft + 'px',
        });
        
        element.trigger('change');
    }
    
    function renderLineNumbers(element, settings) {
        element = $(element);
        
        var linesDiv = element.parent().find('.numberedtextarea-line-numbers');
        var count = element.val().split("\n").length;
        var paddingBottom = parseFloat(element.css('padding-bottom'));
        
        linesDiv.find('.numberedtextarea-number').remove();
        
        for(i = 1; i<=count; i++) {
            var line = $('<div class="numberedtextarea-number numberedtextarea-number-' + i + '">' + i + '</div>').appendTo(linesDiv);
            
            if(i === count) {
            	line.css('margin-bottom', paddingBottom + 'px');
            }
        }
    }
    
    function scrollLineNumbers(element, settings) {
        element = $(element);
        var linesDiv = element.parent().find('.numberedtextarea-line-numbers');
        linesDiv.scrollTop(element.scrollTop());
    }
    
    function pasteIntoInput(el, text) {
        el.focus();
        if (typeof el.selectionStart == "number") {
            var val = el.value;
            var selStart = el.selectionStart;
            el.value = val.slice(0, selStart) + text + val.slice(el.selectionEnd);
            el.selectionEnd = el.selectionStart = selStart + text.length;
        } else if (typeof document.selection != "undefined") {
            var textRange = document.selection.createRange();
            textRange.text = text;
            textRange.collapse(false);
            textRange.select();
        }
    }

    function allowTabChar(el) {
        $(el).keydown(function(e) {
            if (e.which == 9) {
                pasteIntoInput(this, "\t");
                return false;
            }
        });

        // For Opera, which only allows suppression of keypress events, not keydown
        $(el).keypress(function(e) {
            if (e.which == 9) {
                return false;
            }
        });
    }
 
}(jQuery));

        $(document).ready(function(){

            var tab_id ="hello";
        $(".ClearAll").click(function() {
            $('#myForm').find("input[type=text], textarea, select ").val("");
            $('.chosen-select option:selected').removeAttr('selected'); 
            $('.chosen-select').trigger('chosen:updated');
        });
        $('ul.tabs li').click(function(){
            tab_id = $(this).attr('data-tab');
            $('ul.tabs li').removeClass('current');
            $('.tab-content').removeClass('current');
            $(this).addClass('current');
            $("#"+tab_id).addClass('current');
        })
        
        $(".reset").hover(function(){
            $('.fa-refresh').css('-webkit-transform','rotate(360deg)');
            $('.fa-refresh').css('-webkit-transform','rotate(360deg)');
            $('.fa-refresh').css('-moz-transform','rotate(360deg)');
            $('.fa-refresh').css('-o-transform','rotate(360deg)');
            $('.fa-refresh').css('-ms-transform','rotate(360deg)');
        });
        $(".reset").mouseout(function(){
            $('.fa-refresh').css('-webkit-transform','');
            $('.fa-refresh').css('-moz-transform','');
            $('.fa-refresh').css('-o-transform','');
            $('.fa-refresh').css('-ms-transform','');
        });

        $('.urlInput').keyup(function() {
            if($(this).val().length === 2) {
            	var userCurrentValue = $(this).val();
                $(this).val("http://www."+userCurrentValue);
            } 
        });

            
            $(".chosen-select").chosen().change(function(e, params){
                if($($(".chosen-select").chosen().val()).length > 0 ){  
                    $('#inputText, #url, #filePath').keyup(function() { 
                        if($(this).val().length > 0 ) {
                            document.getElementById('Analyse').disabled = false;
                        }
                    })
                }
                else{
                    document.getElementById('Analyse').disabled = true;
                }
            //values is an array containing all the results.
            });
                    
            $('#inputText, #url, #filePath').keyup(function() { 
                if($(this).val().length > 0 ) {
                    $(".chosen-select").chosen().change(function(e, params){
                        if($($(".chosen-select").chosen().val()).length > 0 ){
                            document.getElementById('Analyse').disabled = true;
                        }
                    });
  
                }else{
                     $("#inputText").prop('required',true);
                    document.getElementById('Analyse').disabled = true;
                }
            });
            
            $('.language').change(function(){
                $('.chosen-select option:selected').removeAttr('selected'); 
                $('.chosen-select').trigger('chosen:updated');
            });
            
            
            //Hide option based on what the user picked for language
            $('.chosen-choices').click(function(){
                $(".chosen-choices .search-field input").prop('disabled', true);
                var $container = $('.chosen-container')
                var $list = $container.find('.chosen-choices');

                var global_var = $( ".language option:selected" ).text();
                if(global_var=="Arabic"){
                    $('.active-result:nth-child(2)').hide();
                    $('.active-result:nth-child(3)').hide();
                    $('.active-result:nth-child(5)').hide();

		    $('.active-result:nth-child(6)').hide();
                    // $(".chosen-select option:contains('Lemmas')").attr("disabled","disabled");
                    // $(".chosen-select option:contains('Named Entities')").attr("disabled","disabled");
                    // $(".chosen-select option:contains('Sentiment')").attr("disabled","disabled");
                }
 		else if(global_var=="French"){
                    $('.active-result:nth-child(2)').hide();
                    $('.active-result:nth-child(3)').hide();
                    $('.active-result:nth-child(5)').hide();
		    $('.active-result:nth-child(6)').hide();
                    // $(".chosen-select option:contains('Lemmas')").attr("disabled","disabled");
                    // $(".chosen-select option:contains('Named Entities')").attr("disabled","disabled");
                    // $(".chosen-select option:contains('Sentiment')").attr("disabled","disabled");
                }
		else if(global_var=="Spanish"){
                    $('.active-result:nth-child(2)').hide();
                    $('.active-result:nth-child(5)').hide();
		    $('.active-result:nth-child(6)').hide();
                }   
		else if(global_var=="German"){
                    $('.active-result:nth-child(2)').hide();
                    $('.active-result:nth-child(5)').hide();
		    $('.active-result:nth-child(6)').hide();
                }
            })
        $.fn.serializeObject = function()
        {
            	if(tab_id=="tab-2"){
                    alert("tab2")
                    $('#inputText').val("");
                    $('.fileP').val("");
                }else if(tab_id=="tab-3"){
                    alert("tab3")
                    $('#url').val("");
                    $('#inputText').val("");
                }else{
                    alert("tab1")
                    $('.fileP').val("");
                    $('#url').val("");
                }
            var o = {};
            var a = this.serializeArray();

            $.each(a, function() {
                if (o[this.name] !== undefined) {
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    }
                    o[this.name].push(this.value || '');
                } else {
                    o[this.name] = this.value || '';
                }
            });
            return o;
        };
        $(function() {
            $('#myForm').submit(function() {
                 var form  = JSON.stringify($('form').serializeObject())
                console.log(form);
                $("#redirect_link").css("display", "block");
                return false;
            });
        });
        });

        $(function(){
            $(".chosen-select").chosen();
        });
        
        //Erase input content by clicking icon
        function eraseText(){
            document.getElementById("inputText").value="";
        }
        function eraseUrl(){
            document.getElementById("url").value="";
        }
        function eraseFilePath(){
            document.getElementById("filePath").value="";
        }
        
        
        function myFunction() {
            $('.user_input_details').fadeOut(1000, "linear");
            setTimeout(function() {
                $('#result_tab').fadeIn(500, "linear");
            },1000)
            
        }
        function goBack(){
             $('#result_tab').fadeOut(500, "linear");
             setTimeout(function() {
                $('.user_input_details').fadeIn(500, "linear");
            },500)
        }
