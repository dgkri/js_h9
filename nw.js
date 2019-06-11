//------------------------------------------------------------------------------------------------
// first form(login form with sign up option)
const login_form = document.forms['first_form'];
const sign_upBtn = document.querySelector('#signup');

//-------------------------------------------------------------------------------------------------
//signup form and dashboard element
const sign_up_form = document.forms['sign_up_form'];
const sign_back = document.querySelector('#sign_back');// back button in signup form
const dashbord_sec = document.querySelector('#dashBoardSec');
const header_bar = document.querySelector('#headerBar');

//=====================================================================================================
// main sections two subsection
// Dashbords section 1
const section_1 = document.querySelector('#taskHeadings');
const section_2 = document.querySelector('#particularTask');

// task heading buttons
const dash_btn_set1 = document.querySelector('#taskHeadings #foot1');
const dash_btn_set2 = document.querySelector('#taskHeadings #foot2');
const dash_btn_set3 = document.querySelector('#taskHeadings #foot3');

// add_content bar
const add_Cont_bar = document.querySelector('#addCont');

// link list items inputs
const link_list_inputs = document.getElementsByClassName('txtInput');

// checkboxes
const ckbx = document.getElementsByClassName("ckbx");

// 0rdered list
const _ol = document.querySelector('#taskHeadings > ol');

// list items of taskheading section 
const ol_li = _ol.getElementsByTagName('li');
const _spn_ol = document.getElementsByClassName('_spn');

//=====================================================================================================
// Dash board section 2
const text_area = document.querySelector('#text_area');
const ul = document.getElementById('pulLi');
const foot_btn_p1 = document.querySelector('#footP1');
const foot_btn_p2 = document.querySelector('#footP2');
const Bullet = String.fromCharCode(8226);
const nxtLine = String.fromCharCode(13);

//-------------------------------------------------------------------------------------------------
//Defining a global variable that will store user data
let _info = 0 ;
let _data = 0 ;
let pdata = [] ;
let pindex = 0 ;
//=====================================================================================================
//-----------------------------------------------------------------------------------------------------
// ACTIVITIES IN LOGIN FORM -->
// Adding eventlistener to login-form
login_form.addEventListener('submit',function(e){
    e.preventDefault();

    const _user = login_form.querySelector('input[name="Username"').value;
    const _pass = login_form.querySelector('input[name="Password"').value;

    if(_user && _pass){
        let info = localStorage.getItem(_user+'info');
        if(info){
            _info = JSON.parse(info);
            
            if(_pass === _info.pass){
                login_form.style.display = 'none';
                dashbord_sec.style.display = 'block';
                header_bar.style.display = 'flex';
                
                clear_login();
                _data = JSON.parse(localStorage.getItem(_user+'data'));

                // filling Dashboard
                const n = _info.dataHead.length;
                for(let i=0;i<n;i+=1){
                    let txt =  _info.dataHead[i];
                    const li = create_ol_li(txt);
                    li.addEventListener('click', function(e){
                        li_click_listener(e, li)
                    });
                    _ol.appendChild(li);
                }

            }
            else{
                login_form.querySelector('#complaints_l').textContent = 'Invalid user or password';
            }
        }
        else{
            login_form.querySelector('#complaints_l').textContent = 'Invalid user or password';
        }
    }
    else{
        login_form.querySelector('#complaints_l').textContent = 'Invalid user or password';
    }
})
// adding event listener to signup button in login form
sign_upBtn.addEventListener('click',function(e){
    e.preventDefault();

    login_form.style.display = 'none';
    sign_up_form.style.display = 'block';
    clear_login();

})

//-----------------------------------------------------------------------------------------------------
// ADDING ACTIVITIES IN SIGNUP FORM -->
// adding eventlistener to signup form
sign_up_form.addEventListener('submit',function(e){
    e.preventDefault();

    const first_name = sign_up_form.querySelector('input[name="first-name"]').value;
    const last_name = sign_up_form.querySelector('input[name="last-name"]').value;
    const _email = sign_up_form.querySelector('input[name="email"]').value;
    const _pass = sign_up_form.querySelector('input[name="password"]').value;
    let data_arr = [];
    let data_obj = {};

    if(first_name && last_name && _email && _pass && !Boolean(localStorage.getItem(_email+'info'))){
        let i_p_t = {
            firstName: first_name,
            lastName: last_name,
            email: _email,
            pass: _pass,
            dataHead: data_arr,
        }
        localStorage.setItem(_email+'info', JSON.stringify(i_p_t));
        localStorage.setItem(_email+'data', JSON.stringify(data_obj));
        
        sign_up_form.style.display = 'none';
        dashbord_sec.style.display = 'block';
        header_bar.style.display = 'flex';
        _info = i_p_t;
        _data = data_obj;

        clear_signup();
    }
    else if(Boolean(localStorage.getItem(_email))){
        sign_up_form.querySelector('#complaints_s').textContent = 'User already exist';
    }
    else{
        sign_up_form.querySelector('#complaints_s').textContent = 'Please fill all data';
    }
})

//Adding eventListener to back button
sign_back.addEventListener('click',function(e){
    e.preventDefault();
    
    sign_up_form.querySelector('#complaints_s').textContent = '';
    sign_up_form.style.display = 'none';
    login_form.style.display = 'block';

    clear_signup();
})

// writing functions for clearing input
function clear_login(){
    login_form.querySelector('#complaints_l').textContent = '';
    login_form.querySelector('input[name="Username"').value = '';
    login_form.querySelector('input[name="Password"').value = '';
}

function clear_signup(){
    sign_up_form.querySelector('#complaints_s').textContent = '';
    sign_up_form.querySelector('input[name="first-name"]').value = '';
    sign_up_form.querySelector('input[name="last-name"]').value = '';
    sign_up_form.querySelector('input[name="email"]').value = '';
    sign_up_form.querySelector('input[name="password"]').value = '';
}


//=====================================================================================================
// main sections two subsection
//Dash board section 1

// Creating Global Variables
let edit = 0 ; // just indicates wether we are editiong or not(or we are editing or not)
let _pre_edit=0;
let _delete =0;
let _add = 0 ;

//Dash board button set 1 -------------------------------------------------------------------------
// contains +, edit and Delete buttons

dash_btn_set1.addEventListener('click', function(e){
    
    const tgt = e.target;

    if(tgt.textContent === '+'){
        dash_btn_set1.style.display = 'none';
        add_Cont_bar.style.display = 'block';
        _add = 1;
    }

    else if(tgt.textContent === 'Edit'){
        edit = 1;
        dash_btn_set1.style.display = 'none';
        dash_btn_set2.style.display = 'block';

        changeColor('blue');
       
    }
    else if(tgt.textContent === 'Delete'){
        dash_btn_set1.style.display = 'none';
        dash_btn_set3.style.display = 'block';
        
        _delete = 1;
        n = ckbx.length;
        for(let i=0;i<n;i+=1){
            ckbx[i].style.display = 'inline-block';
        }
        
    }
})
/** end of dash board button set 1 */


// adding event listener to button set 2 ------------------------------------------------------------
dash_btn_set2.addEventListener('click', function(e){
    const tgt = e.target;
    if(tgt.textContent === "Done"){
        pre_edit(dash_btn_set2);
        changeColor('lightgray');
        dash_btn_set2.style.display = 'none';
        dash_btn_set1.style.display = 'block';
        edit = 0;

        // Altering data
        let n = ol_li.length;
        for(let i=0;i<n;i+=1){
            console.log(ol_li[i]);
            _info.dataHead[i]= _spn_ol[i].textContent;
            
        }
   
    }

})
// finished adding eventlistener to button set 2

// adding event listener to butten set 3 ------------------------------------------------------------
dash_btn_set3.addEventListener('click', function(e){
    const tgt = e.target;
    let n = ol_li.length;
    let k = 0;
    let arr = [];
    if(tgt.textContent === 'Delete'){
        for(let i=0;i<n;i+=1){
            if( ol_li[k].querySelector('input[type="checkbox"]').checked){
                _spn_ol[k].parentElement.removeChild(_spn_ol[k]);
                ol_li[k].parentElement.removeChild(ol_li[k]);
                //Data handeling
                arr.push(i);
                _info.dataHead.splice(k,1);
                //----------------
            }
            else{
                ol_li[k].querySelector('input[type="checkbox"]').style.display = 'none'; 
                k+=1;
            }
        }
        _delete = 0;

        // Data handling
        _data = arrange(_data, arr, n);
        //----------------------------

        dash_btn_set3.style.display = 'none';
        dash_btn_set1.style.display = 'block';
    }
    else if(tgt.textContent === "Cancel"){
        for(let i=0;i<n;i+=1){
            ol_li[i].querySelector('input[type="checkbox"]').checked = false;
            ol_li[i].querySelector('input[type="checkbox"]').style.display = 'none';
        }
        dash_btn_set3.style.display = 'none';
        dash_btn_set1.style.display = 'block';
        _delete = 0;
    }
})

function arrange(ob, arr, num){
    // used for data handling when delete is used
    for(let i = 0; i<arr.length-1; i+=1){
        for(let j=arr[i]+1; j<arr[i+1]-1; j+=1){
            ob[j-i-1] = ob[j];
        }
    }
    for(let i=arr[arr.length -1]+1; i<num; i+=1){
        ob[i - arr.length] = ob[i];
    }
    let oj = {};
    for(let i = 0; i<=num - arr.length-1; i+=1){
        oj[i]= ob[i];
    }
    return oj;
}
// Finished adding eventlistener to buttonset 3

// adding eventListener to addcont bar -------------------------------------------------------------
add_Cont_bar.addEventListener('click', function(e){
    tgt = e.target;
    if(tgt.textContent === 'Add'){
        let txt =  add_Cont_bar.querySelector('input[type="text"]').value;

        const li = create_ol_li(txt);
        _ol.appendChild(li);
        
        // data handeling
        _info.dataHead.push(txt);
        const index = _info.dataHead.length;
        _data[index-1]='';
        //-------------

        li.addEventListener('click', function(e){
            li_click_listener(e, li)
        });

        add_Cont_bar.querySelector('input[type="text"]').value = '';

    }

    else if(tgt.textContent === 'Done'){
        add_Cont_bar.querySelector('input[type="text"]').value = '';

        add_Cont_bar.style.display = 'none';
        dash_btn_set1.style.display = 'block';
        _add = 0;

    }
})
// Finished adding eventlistener to add_content Bar


// function for changing background color of link li page items
function changeColor(colorx){
    const len = link_list_inputs.length;
    for(let i=0; i<len ; i+=1){
        link_list_inputs[i].parentElement.style.backgroundColor = colorx;
    }
}
//----------------------------------------------------------------------------------------------------

// defining function
//function for creating li of ol of dashboard section 1
function create_ol_li(txt){
    const li = document.createElement('li');
        const spn = document.createElement('span');
        const checkbox = document.createElement('input');
        const input = document.createElement('input');
        checkbox.type = 'checkbox';
        input.type = 'text';
        checkbox.classList = 'ckbx';
        input.classList = 'txtInput';
        spn.classList = '_spn';

        spn.textContent = txt;
        li.appendChild(spn);
        li.appendChild(checkbox);
        li.appendChild(input);
        return li;
}

// defining function for li_click_listener
function li_click_listener(e, li){
    console.log(e.target.tagName);
    let txt = '';
    let t = 0;
    let i = 0;
    if(e.target.tagName.toLowerCase() === 'span'){
        txt = e.target.textContent;
        t = 1;
        for(;i<_info.dataHead.length;){
            if(_info.dataHead[i] === txt){
                break;
                
            }
            i+=1;
        }
    }
    
    if(edit){
        pre_edit(li);
        edit_func(li);
    }
    else if(!(_add) && !(_delete) && t){
        section_1.style.display = 'none';
        section_2.style.display = 'block';
        pdata = _data[i].split(Bullet);
        pdata.shift();
        pindex = i;
        let n = pdata.length;
        for(let j=0;j<n;j+=1){
            const li = document.createElement('li');
            li.textContent = pdata[j];
            ul.appendChild(li);
        }
        section_2.querySelector('header').textContent = _info.dataHead[i];
    }
}

function pre_edit(e1){
    if(e1!=_pre_edit && _pre_edit){

        const ipt = _pre_edit.querySelector('input[type="text"]')
        const span_elem = _pre_edit.querySelector('span')
        ipt.style.display = 'none';
        span_elem.style.display = 'block';
        const txt  = ipt.value;
        span_elem.textContent = txt;
        _pre_edit = 0;
    }
    
}

function edit_func(e1){
    if(_pre_edit !=e1){
        _pre_edit = e1;
        const ipt = e1.querySelector('input[type="text"]')
        const span_elem = e1.querySelector('span')
        span_elem.style.display = 'none';
        ipt.style.display = 'block';
        const txt  = span_elem.textContent;
        ipt.value = txt;
    }
    
}
//=====================================================================================================
// Dash board section 2

// adding event listener to text area
text_area.addEventListener('keyup',function(e){
    if(e.keyCode === 13){
        text_area.value += Bullet  + ' ';
    }
})
//finished adding event listener to text area

// adding event listener to footp1 section
foot_btn_p1.addEventListener('click',function(e){
    tgt = e.target;
    if(tgt.textContent === 'Edit'){
        ul.style.display = 'none';
        text_area.style.display = 'block';
        text_area.value = _data[pindex] + nxtLine + Bullet + ' ';
        foot_btn_p1.style.display = 'none';
        foot_btn_p2.style.display = 'block';
        while(ul.children.length){
            ul.removeChild(ul.lastChild);
        }
    }
    else if( tgt.textContent === 'Back'){
        section_2.style.display = 'none';
        section_1.style.display = 'block';
        pdata = [];
        while(ul.children.length){
            ul.removeChild(ul.lastChild);
        }
    }
})
// finished adding event listeners to footp1

// adding event listeners to footp2 section
foot_btn_p2.addEventListener('click', function(e){
    tgt = e.target;
    if(tgt.textContent === 'Done'){
        _data[pindex] = text_area.value;
        pdata = _data[pindex].split(Bullet);
        pdata.shift();
        
        const n = pdata.length;
        
        for(let j=0;j<n;j+=1){
            const li = document.createElement('li');
            li.textContent = pdata[j];
            ul.appendChild(li);
        }
        
        ul.style.display = 'block';
        text_area.style.display = 'none';
        foot_btn_p1.style.display = 'block';
        foot_btn_p2.style.display = 'none';
    }
})

// Adding logout features and Edit personal info:

const drop_down = document.querySelector('#headerBar #settingDropDwn');
const personal_info_sec = document.querySelector('#personal_info_sec');

const edit_section = document.querySelector('#edit_section');
const confirm_section = document.querySelector('#confirm_section');

const edit_btns = document.querySelector('#edit_btns');
const save_btns  = document.querySelector('#save_btns');
const confirm_btns = document.querySelector('#confirm_section');

const edit_conf = document.getElementsByClassName('edit_conf');
const save_conf = document.getElementsByClassName('save_conf');

drop_down.addEventListener('click', function(e){
    const tgt = e.target;

    if(tgt.textContent === 'Logout'){
        // need to write code
        localStorage.setItem(_info.email+'info', JSON.stringify(_info));
        localStorage.setItem(_info.email+'data', JSON.stringify(_data));

        _info = 0 ;
        _data = 0 ;
        pdata = [] ;
        pindex = 0 ;

        edit = 0 ; 
        _pre_edit=0;
        _delete =0;
        _add = 0 ;

        dashbord_sec.style.display = 'none';
        header_bar.style.display = 'none';

        login_form.style.display = 'inline-block'

        while(_ol.firstChild){
            _ol.removeChild(_ol.firstChild);}

    }

    else if(tgt.textContent === 'Settings'){
        dashbord_sec.style.display = 'none';
        header_bar.style.display = 'none';
        personal_info_sec.style.display = 'block';

        edit_section.querySelectorAll('span')[0].textContent = _info.firstName;
        edit_section.querySelectorAll('span')[1].textContent = _info.lastName;
        edit_section.querySelectorAll('span')[2].textContent = '********';

    }

})


edit_btns.addEventListener('click', function(e){
    const tgt = e.target;

    if( tgt.textContent === 'Back'){
        personal_info_sec.style.display = 'none';
        dashbord_sec.style.display = 'inline-block';
        header_bar.style.display = 'flex';

        edit_section.querySelectorAll('span')[0].textContent = '';
        edit_section.querySelectorAll('span')[1].textContent = '';
        
    }
    else if(tgt.textContent === 'Edit'){
      const len = edit_conf.length;

      edit_section.querySelectorAll('input')[0].value = _info.firstName;
      edit_section.querySelectorAll('input')[1].value = _info.lastName;
      edit_section.querySelectorAll('input')[2].value = _info.pass;

      for(let i=0; i< len; i+=1){
        edit_conf[i].style.display = 'none';
        save_conf[i].style.display = 'inline-block';
      }

    }
})

save_btns.addEventListener('click', function(e){
    const tgt = e.target;

    if( tgt.textContent === 'Back'){
      const len = edit_conf.length;

      edit_section.querySelectorAll('input')[0].value = '';
      edit_section.querySelectorAll('input')[1].value = '';
      edit_section.querySelectorAll('input')[2].value = '';

      for(let i=0; i< len; i+=1){
        edit_conf[i].style.display = 'inline-block';
        save_conf[i].style.display = 'none';
      }
    }
    else if(tgt.textContent === 'Save'){
        edit_section.style.display = 'none';
        confirm_section.style.display = 'inline-block';
    }

})

confirm_btns.addEventListener('click', function(e){
    const tgt = e.target;

    if(tgt.textContent === 'Back'){
      confirm_section.style.display = 'none';
      edit_section.style.display = 'inline-block';
      confirm_section.querySelector('input').value = '';
      confirm_section.querySelector('p').textContent = '';
    }
    else if(tgt.textContent === 'Confirm'){
      // need to write code
      const old_pass = _info.pass;
      const enter_pass = confirm_section.querySelector('input').value;

      if(old_pass !== enter_pass){
        confirm_section.querySelector('p').textContent = 'Invalid Password';
      }
      else if(old_pass === enter_pass){
        _info.firstName = edit_section.querySelectorAll('input')[0].value;
        _info.lastName =  edit_section.querySelectorAll('input')[1].value;
        _info.pass = edit_section.querySelectorAll('input')[2].value;

        edit_section.querySelectorAll('input')[0].value = '';
        edit_section.querySelectorAll('input')[1].value = '';
        edit_section.querySelectorAll('input')[2].value = '';

        edit_section.querySelectorAll('span')[0].textContent = '';
        edit_section.querySelectorAll('span')[1].textContent = '';
       

        confirm_section.querySelector('input').value = '';
        confirm_section.querySelector('p').textContent = '';

        confirm_section.style.display = 'none';
        edit_section.style.display = 'inline-block';

        const len = edit_conf.length;

        for(let i=0; i< len; i+=1){
            edit_conf[i].style.display = 'inline-block';
            save_conf[i].style.display = 'none';
          }

        personal_info_sec.style.display = 'none';
        dashbord_sec.style.display = 'inline-block';
        header_bar.style.display = 'flex';

        }
      }

    

})

