/*
 * Compressed by JSA(www.xidea.org)
 */
firebug.env.height=200;
var client=null,isValid=false,lang=$.cookie("lang")?$.cookie("lang"):"en",lang_opts={language:lang,pathPrefix:"lang"};
function client_onready(_){
  client.ready(function(A){
    var D=0,C="<div id=\"accordion\">";
    for(var B in A){
      C+="<h3><a href=\"#\">"+B+"</a></h3><div>";
      C+="<textarea class=\"paras\" rows=\"2\" cols=\"80\" type=\"text\" name=\"paras\">parameter(json format, ex: \"hello\", 3.14, true, {'name': 'lex'}, [1,2,3])</textarea> <input class=\"rpc\" ref=\""+B+"\" name=\"call_rpc\" type=\"button\" value=\"Call\"></input>";
      C+="</div>";
      D++;
    }
    C+="</div>";
    if(D>0){
      if(!_){
        $("#tabs-2").html(C);
        $(".paras").elastic();
        isValid=true;
        $tabs=$("#tabs").tabs();
        $tabs.tabs("select",1);
        $("#accordion").accordion({header:"h3"});
      }
    }
    $.unblockUI();
  });
  client.onError=function(_,A){
    $.unblockUI();
    $("#hprose_server_error").dialog({bgiframe:true,height:140,modal:true});
    $("#hprose_server_error").dialog("open");
    console.dir(A);
  };
}
$(document).ready(function(){
  $(".paras").elastic();
  $("#tabs").tabs({select:function(_,A){
      if(!isValid&&A.index==1){
        $("#no_hprose_server_url").dialog({bgiframe:true,height:140,modal:true});
        $("#no_hprose_server_url").dialog("open");
      }else {
        if(A.index!=1){
          return true;
        }
      }
      return isValid;
    }});
  $("#get_func").click(function(){
    var _=$("#hprose_url").val();
    if(_.substr(0,4)!="http"){
      $("#hprose_server_url_error").dialog({bgiframe:true,height:140,modal:true});
      $("#hprose_server_url_error").dialog("open");
      return false;
    }
    $.blockUI({message:"<h1 rel=\"localize[just_a_moment]\">Just a moment...</h1>"});
    $("[rel*=localize]").localize("hprose",lang_opts);
    client=new HproseHttpClient();
    client.useService(_, true);
    client_onready(false);
  });
  $(".rpc").live("click",function(){
    $.blockUI({message:"<h1 rel=\"localize[just_a_moment]\">Just a moment...</h1>"});
    var rpc_name=$(this).attr("ref"),para=$(this).prev().val();
    if(para.substr(0,4)=="para"){
      para="";
      $(this).prev().val("");
    }
    try{
      client.invoke(rpc_name,eval("(["+para+"])"),function(A,_){
        if(typeof (A)=="string"||typeof (A)=="number"||A==null){
          console.info(A);
        }else {
          console.dir(A);
        }
        $.unblockUI();
      });
    }
    catch(err){
      $.unblockUI();
      console.dir(err.stack || err);
    }
  });
  $(".c_rpc").click(function(){
    $.blockUI({message:"<h1 rel=\"localize[just_a_moment]\">Just a moment...</h1>"});
    var hprose_url=$("#c_hprose_url").val();
    if(hprose_url.substr(0,4)!="http"){
      $("#hprose_server_url_error").dialog({bgiframe:true,height:140,modal:true});
      $("#hprose_server_url_error").dialog("open");
      return false;
    }
    client=new HproseHttpClient();
    client.useService(hprose_url, true);
    client_onready(true);
    var rpc_name=$("#c_func_name").val(),para=$(this).prev().val();
    if(para.substr(0,4)=="para"){
      para="";
      $(this).prev().val("");
    }
    try{
      client.invoke(rpc_name, eval("(["+para+"])"), function($,_){
        if(typeof ($)=="string"||typeof ($)=="number"||$==null){
          console.info($);
        }else {
          console.dir($);
        }
      });
    }
    catch(err){
      $.unblockUI();
      console.dir(err.stack || err);
    }
  });
  $(".paras").live("dblclick",function(){
    $(this).select();
  });
  $(".paras").live("keypress",function(){
    if(!jQuery.support.cssFloat){
      return true;
    }
    var B=parseInt($(this).css("height")),_=parseInt($(this).parent().css("height"));
    if(B>200){
      B=200;
    }
    var A=B+30+"px";
    $(this).parent().css("height",A);
  });
  $("#lang_setting").change(function(){
    var _=$(this).val();
    lang_opts={language:_,pathPrefix:"lang"};
    var A=new Date();
    A.setTime(A.getTime()+(365*24*60*60*1000));
    $.cookie("lang",_,{path:"/",expires:A});
    $("[rel*=localize]").localize("hprose",lang_opts);
  });
  $("[rel*=localize]").localize("hprose",lang_opts);
  $("#lang_setting").val(lang);
});