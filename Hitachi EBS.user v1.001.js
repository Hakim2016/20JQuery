// ==UserScript==
// @name         Hitachi EBS
// @namespace    http://blog.csdn.net/HaKimKing
// @version      1.001
// @description  try to take over the world!
// @author       Hakim
// @include      http://gscmpsvap*.buil.hitachi.co.jp:*
// @include      http://gscmpsvapt01.gscmt.buil.hitachi.co.jp:*/OA_HTML/*.jsp?*
// @include
// @match        http://tampermonkey.net/index.php?version=4.4&ext=dhdg&updated=true
// @require      http://code.jquery.com/jquery-1.11.0.min.js
// @require      file://D:\Links.json
// @grant        none
// ==/UserScript==

(function() {
    var baseburl = '';
    var port = '';
    var wkl;

    var forms = [
        {
            'fun_id':'47602',
            'resp_id':'50848',
            'resp_appl_id':'275',
            'security_group_id':'0',
            'lang_code':'US',
            'oas':'6HGcuE94j64O5BgCbvmm-g..',
            'name':'Cost Transfer',
            'id':'xx01'
        },
        {
            'fun_id':'47486',
            'resp_id':'50778',
            'resp_appl_id':'20005',
            'security_group_id':'0',
            'lang_code':'US',
            'oas':'bi5X4FR26ARTpxEnNtEGjw..',
            'name':'Project Status Inquery(SHE)',
            'id':'xx02'
        },
        {
            'fun_id':'2321',
            'resp_id':'50778',
            'resp_appl_id':'20005',
            'security_group_id':'0',
            'lang_code':'US',
            'oas':'qY8Y7ogAsaY2aOnuf1U9rQ..',
            'name':'Project Expenditure Items',
            'id':'xx03'
        }];

    //get initial info
    function get_init_info(){
        //10.get base url
        baseburl = $('iframe[name="formsLauncher"]').attr('src');
        var len = baseburl.length;
        baseburl = baseburl.substr(0, len-18);
        //alert(baseburl);

        //20.get port number
        port = baseburl.substr(-5, 4);
        //alert(port);

        //30.get Worklist which will be inserted urls
        wkl = $('h2.x7c:last').parent().parent();
    };

    //add by Hakim @20180614 v0.102 start
    //get the url of Find Request
    function find_request_info(port, ou){
        var fun_id = '90';
        var resp_id = {
            'SHE':'50778',
            'HET':'51272',
            'HEA':'50676',
            'HBS':'51249',
        };

        var resp_appl_id = {
            'SHE':'20005',
            'HET':'20005',
            'HEA':'660',
            'HBS':'660',
        };
        var security_group_id = '0';
        var lang_code = 'US';
        var oas = {
            '8010_SHE':'UKrNaQil8MiaLKj62SZ-Fg..',
            '8010_HET':'Rl5xA-b0nPzEbr8niBjOZQ..',
            '8010_HEA':'wegdwZNIXttpo6__42XwlQ..',
            '8010_HBS':'tTjKMtxvijE77hXJE49Bow..',

            '8030_SHE':'4CMSRCAXKVCeYjfyCTcKUA..',
            '8030_HET':'oxnaOVaBl68-STRDEXGKdQ..',
            '8030_HEA':'_e8GWsYayPUkc5lqvksnCg..',
            '8030_HBS':'XrPdiAUZ5w3CvufjMtb16w..',

            '8000_SHE':'GXvmGKxdEZKXdskA8eyXig..',
            '8000_HET':'G7gZOgAmazL-gqfFmKkNcg..',
            '8000_HEA':'HELXbcXcO1DGeHTabQe1pg..',
            '8000_HBS':'QUrw4O0CSOdCkVlr-InB6g..',
        };

        var fnd_rqst = {
            'fun_id':fun_id,
            'resp_id':resp_id[ou],
            'resp_appl_id':resp_appl_id[ou],
            'security_group_id':security_group_id,
            'lang_code':lang_code,
            'oas':oas[port+'_'+ou],
            'name':'='+ou+'=',
            'id':''
        };
        var rt_lnk = concat_td(baseburl, fnd_rqst["fun_id"], fnd_rqst["resp_id"], fnd_rqst["resp_appl_id"],fnd_rqst["security_group_id"],fnd_rqst["lang_code"],fnd_rqst["oas"],fnd_rqst["name"],fnd_rqst["id"]);
        return rt_lnk;
    };
    //add by Hakim @20180614 v0.102 end

    function concat_td(base_url, fun_id, resp_id, resp_appl_id,security_group_id,lang_code,oas,name,id){
        var tdr = '<td class="x5g">HKM_HREF</td>';
        var str0 = '<a id="hkm01" href = ';
        var str1 = '"javascript';
        var str2 = ':launchForm(\'';
        var str2_1 = '\')"';
        var str3 = '>HAKIM</a>';

        var comm_url = 'OA_HTML/RF.jsp?function_id='+fun_id+
            '&amp;resp_id='+resp_id+
            '&amp;resp_appl_id='+resp_appl_id+
            '&amp;security_group_id='+security_group_id+
            '&amp;lang_code='+lang_code+
            '&amp;oas='+oas;

        var aim_url = base_url + comm_url;

        var xx = str0 + str1 + str2 +aim_url+str2_1+ str3;
        tdr = tdr.replace('HKM_HREF', xx).replace('HAKIM', name);
        if(id !== ''){
            tdr = tdr.replace('hkm01',id);
        }
        //tdr = tdr.replace('HAKIM', name);
        //wkl.append(xx);
        //alert(tdr2);
        return tdr;
    };

    function get_lnk(mark, url, name){
        var str0 = '<a id="hkm01" href = ';
        var str1 = '"javascript';
        var str2 = ':launchForm(\'';
        var str2_1 = '\')"';
        var str3 = '>HAKIM</a>';

        str0 = str0.replace('hkm01', mark);
        str3 = str3.replace('HAKIM', name);
        var xx = str0 + str1 + str2 + url +str2_1+ str3;
        //alert('in get_lnk = ' + xx);
        return xx;
    };

    function init_table(cntnt_br){
        //concat string to append to page
        var header = '<td id="hakim_td"><table width="100%" style><tbody>';
        var footer = '</tbody></table></td>';
        return header + cntnt_br + footer;
    }

    function init_br(cntnt_br){
        return '<tr valign="top" style><td>CONTENT</td></tr>'.replace('CONTENT',cntnt_br);
    }

    if ($('.x2u').text() === '') {
        $('#usernameField').val('hand_hkm');
        $('#passwordField').val('hakim1234');
        $('#SubmitButton').trigger('click');
    } else {
        var temp = '';
        var ous = ['HEA','HBS','SHE','HET'];
        get_init_info();
        alert('baseburl = ' + baseburl);
        for(i=0;i<ous.length;i++){
            temp = temp + find_request_info(port, ous[i]);
        }
        //var tdr3 = find_request_info(port, 'HEA');
        //alert(tdr3);
        wkl.append(temp);

        var temp2 = '';
        for(i=0;i<forms.length;i++){
            temp2 = temp2 + init_br(concat_td(forms[i]["base_url"], forms[i]["fun_id"], forms[i]["resp_id"], forms[i]["resp_appl_id"],forms[i]["security_group_id"],forms[i]["lang_code"],forms[i]["oas"],forms[i]["name"],forms[i]["id"]));
        }
        $('#mainLayout_row_0').append(init_table(temp2));

    }


    // Your code here...
})();