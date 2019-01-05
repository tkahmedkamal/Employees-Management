/*global console*/

/*
    Project Name: Employees Management
    By: Ahmed Kamal Mohammed
*/

document.addEventListener('DOMContentLoaded', () => {

    /** ======================================
     * @desc Section Get Element - Let Or Var
    ==========================================*/
    let loginForm = document.forms['login-form'],
        empList   = document.querySelector('ul.em-add-list'),
        liList    = document.querySelectorAll('ul.em-add-list'),
        addItem   = document.forms['add-item'].querySelector('input[type="text"]'),
        addSub    = document.querySelector('#add-item input[type="submit"]'),
        favList   = document.querySelector('ul.fav-list'),
        inpSearch = document.getElementById('input_search'),
        logout    = document.querySelector('.logout');
    /*End*/


    /**============================================
    * @desc Login Page: Form Validation
    ===============================================*/
    const submit = loginForm.querySelector('input[type="submit"]');
    submit.onclick = event => event.preventDefault();

    const username      = loginForm.querySelector('input[name="username"]'),
            pass        = loginForm.querySelector('input[name="pass"]'),
            user_Error  = loginForm.querySelector('#user-error'),
            pass_Error  = loginForm.querySelector('#pass-error');

    submit.addEventListener('click', e => {

        /**
         * @desc The Alarm Messages Disappear With A Soft Way
         * => Fade Out Effect
        */
        let _fadeOutEffect = (tagName) => {

            let fadeOut = setInterval(function () {
                if (!tagName.style.opacity) {
                    tagName.style.opacity = 1;

                } else if (tagName.style.opacity > 0) {
                    tagName.style.opacity -= 0.1;
                    
                } else {
                    clearInterval(fadeOut);
                    tagName.style.display = 'none';
                }
            }, 200);
        }

        // Form Validation
        if (username.value == '' & pass.value == '') {
            alert('Please, Fill In The Data');

        } else if(username.value == '') {       
            user_Error.textContent = 'Please, Enter Your Username';
            _fadeOutEffect(user_Error); // _fadeOutEffect => Func Call 
            
        } else if (pass.value == '') {       
            pass_Error.textContent = 'Please, Enter Your Password'; 
            _fadeOutEffect(pass_Error); // _fadeOutEffect => Func Call  
            
        } else if (username.value.length <= 3) {
            alert('Please, Enter Four Letters Or More');

        } else if(pass.value.length <= 3) {
            alert('Please, Enter Four Number Or Four Letters Or More');

        } else {
            // Display None => login-page
            e.currentTarget.parentElement.parentElement.parentElement.parentNode.style.display = 'none';
            document.body.style.overflow = 'auto';
            username.value = '';
            pass.value = '';
        }
    });

    /**
    * @desc Prevent Typing Arabic Characters, And Space
    * In The Input Field
    */
    username.onkeyup =  event => {

        const regx = /[^a-z-0-9-'_']/gi;
        event.target.value = event.target.value.replace(regx, '');
    };  
    /*End*/


    /**==============================================
    * @desc When Clicking Logout Button'.logout', Show 
    * The Registration Page
    ================================================*/
    logout.onclick = () => {

        const loginPage = document.querySelector('.login-page');
        loginPage.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    /*End*/


    /**=============================================
    * @desc When You Press The Delet Icon'.emp-del' 
    * In Employee List, The Employee Is Deleted From 
    * The Employee List, It Is Also Deleted If It Is 
    * In The List Of Favorite Employees
    ================================================*/
    empList.addEventListener('click', item => {

        if (item.target.className == 'emp-del') {

            const li_parent = item.target.parentElement;
            item.currentTarget.removeChild(li_parent); 

            const favList_name = favList.querySelectorAll('li');

            // Favorite Employees Each
            Array.from(favList_name).forEach(items => {

                const span = item.target.previousElementSibling;

                if (span.textContent == items.querySelector('span').textContent) {
                    items.querySelector('img').click();
                }
            });
        }
    });
    /*End*/


    /**============================================
    * @desc Add A New Employee For The Input Field 
    * MethodThat Carries The "add-emp" name
    ===============================================*/
    addSub.onclick = event => event.preventDefault();

    addSub.addEventListener('click', () => {

    const letters = /^[A-Za-z-' ']+$/; // Regux

    if (addItem.value == false) {
        alert('This field is empty, please enter the employee name');

    } else if (!addItem.value.match(letters)) {
        alert('It is not correct to enter numbers, please enter the employee\'s name');

    } else {

        if (addItem.name == 'add-emp') {

                // Create Element
            let liTage   = document.createElement('li'),
                spanTage = document.createElement('span'),
                imgTage  = document.createElement('img'),
                secTage  = document.createElement('section'),
                empName  = document.createTextNode(addItem.value),
                // Create Attribute 
                imgSrc   = document.createAttribute('src'),
                imgAlt   = document.createAttribute('alt');
                liTage.className = 'wow bounceInUp';

            // Add Attribute Value
            spanTage.className = 'emp-txt';
            imgSrc.value = 'image/delete-icon.png';
            imgAlt.value = 'delete icon';

            // Set Attribute Node
            secTage.className = 'icon-tools';
            imgTage.className = 'emp-del';
            imgTage.setAttributeNode(imgSrc);
            imgTage.setAttributeNode(imgAlt);

            // Create Icon Tools "favorite, Warning, Edit"
            for (var i = 0; i < 3; i++) {
                let classValue = [
                    'fas fa-heart', 
                    'fas fa-exclamation-triangle', 
                    'fas fa-pen'
                ],
                    iTage = document.createElement('i'),
                    icons = document.createAttribute('class');
                icons.value = classValue[i];
                iTage.setAttributeNode(icons);
                secTage.appendChild(iTage);
            }
            
            // Append Child 
            spanTage.appendChild(empName);
            liTage.appendChild(spanTage);
            liTage.appendChild(imgTage);
            liTage.appendChild(secTage);
            empList.appendChild(liTage);
            
            // clean the input field after printing the value
            addItem.value = '';
        }
        
    } 
    });

    /** 
    * @desc Prevent Typing Numbers And Arabic Characters 
    * In The Input Field
    */
    addItem.onkeyup = event => {

        const regx = /[^a-z-' ']/gi;
        event.target.value = event.target.value.replace(regx, '');
    }
    /*End*/


    /**============================================
    * @desc Add Employees To The List Of Favorite 
    * Employees By Click The Favorites Icon
    ===============================================*/
    empList.addEventListener('click', (e) => {

        if (e.target.classList.contains('fa-heart')) {

            e.target.classList.add('red');

            var getEmpName = e.target.parentElement
                .parentNode.querySelector('span').textContent;

            // Create Element
            var favLiTag = document.createElement('li'),
                favSpantage = document.createElement('span'),
                favImgTage = document.createElement('img'),
                employeeName = document.createTextNode(getEmpName);
                
                // Add Attribute
                favImgTage.classList = 'emp-del';
                favImgTage.src = 'image/delete-icon.png';

                // Append Element
                favSpantage.appendChild(employeeName);
                favLiTag.appendChild(favSpantage);
                favLiTag.appendChild(favImgTage);
            
            if (e.target.classList.contains('red')) {

                favList.appendChild(favLiTag);
            }
        }
    });
    /*End*/


    /**=============================================
    * @desc Delete Members From The Favorites List 
    * + Remove The Red Color From The Favorite Icon 
    * In The List Of Employees
    ================================================*/
    favList.addEventListener('click', e => {

        if (e.target.className == 'emp-del') {

            const li_parent = e.target.parentElement;
            e.currentTarget.removeChild(li_parent);

            /**
             * @desc Check, Employee Name in "Employee List Section" = Employee Name In 
             * "Favorite Employee Section" Or No //?
            */
            const liTage_empName = empList.querySelectorAll('li');
            Array.from(liTage_empName).forEach(item => {

                const li_SpanTag = e.target.parentElement.querySelector('span');
                if (li_SpanTag.textContent == item.querySelector('span').textContent) {
                    
                    item.querySelector('.icon-tools').querySelector('i.red')
                    .classList.toggle('red');
                }
            });
        } 
    });
    /*End*/


    /**=========================================
    * @desc Rename the employee by clicking the 
    * Edit Icon "Pen Icon" 
    ============================================*/
    empList.addEventListener('click', (e) => {

        const employee = e.target.parentElement.parentNode.querySelector('span');

        const e_target = e.target;

        if (e_target.className == 'fas fa-pen' && employee.classList.contains('emp-txt')) {

            let rename = document.createElement('input'),
                favIcon = e.target.parentElement.querySelector('.fa-heart');
            rename.value = employee.textContent;
            employee.replaceWith(rename);

            document.onkeydown = event => {
            
                /** 
                 * @desc When You Press The 'Enter Button' On The Keyboard,
                 * Rename The Employee Name, And Print The New Value
                 * ---------------------
                 * 13 => Enter Button In Keyboard
                 * @see https://keycode.info/
                */
                if (event.keyCode == 13) {
                    rename.replaceWith(employee);
                    
                    if (rename.value == false) {
                        employee.textContent = employee.textContent;

                    } else {
                        employee.textContent = rename.value;
                    }
                    
                /** 
                 * @desc else if => When You Press The 'Esc Button' On The Keyboard,
                 * Not Rename The Employee Name, And Print The Old Value
                 * ---------------------
                 * 27 => Esc Button In Keyboard
                 * @see https://keycode.info/
                */
                } else if(event.keyCode == 27) {
                    rename.replaceWith(employee);
                }
            }

            /** 
             * @desc When You Press The Edit Icon'fa-pen', And Modify 
             * The Name of The Employee In The Employee List, He 
             * Also Changes That Name In The List Of Favorite Employees
            */
            const liTage_empName = favList.querySelectorAll('li');

            Array.from(liTage_empName).forEach(items => {

                const favEmp_Name = items.querySelector('span');
                
                if (rename.value == favEmp_Name.textContent) {

                    favIcon.classList.remove('red');

                    document.body.onkeydown = (event) => {

                        /** 
                        * @desc When You Press The 'Enter Button' On The Keyboard,
                        * Rename The Employee Name
                        * ------------------------
                        * 13 => Enter Button In Keyboard
                        * @see https://keycode.info/
                        */
                        if (event.keyCode == 13) {
                            favIcon.classList.add('red');

                            if (rename.value == false) {
                                favEmp_Name.textContent = favEmp_Name.textContent;
                                
                            } else {
                                favEmp_Name.textContent = rename.value;
                            }
                        }
                    }
                }
            });
        }
    });
    /*End*/


    /**===============================================
    * @desc Add A Warning To The Employee By Clicking 
    * The Warning Icon - And The Warning Color 
    * Is A Degree Of Yellow
    ==================================================*/
    Array.from(liList).forEach((item) => {

        item.addEventListener('click', (e) => {
            
            if (e.target.classList.contains('fa-exclamation-triangle')) {

                e.target.classList.toggle('black');

                const li_List_Tag   = e.target.parentElement.parentNode,
                        span_Tage   = li_List_Tag.querySelector('span'),
                        icon_tools  = li_List_Tag.querySelector('.icon-tools'),
                        favoriteIco = e.target.parentElement.parentNode
                        .querySelector('.icon-tools').querySelector('i.fa-heart');

                let _colorChange = (_liTage, _colorName, _ColorIcon, _Colorfav) => {
                    li_List_Tag.style.backgroundColor = _liTage;
                    span_Tage.style.color = _colorName;
                    icon_tools.style.color = _ColorIcon;
                    favoriteIco.style.display = _Colorfav;
                }

                if (e.target.classList.contains('black')) {
                    _colorChange('#FFD51D', '#FFF', '#FFF', 'none');

                } else {
                    _colorChange('#FFF', '#252826', '#e0e4e7', 'initial');
                }

                /** 
                 * @desc When You Click The Warning Icon 'fa-exclamation-triangle', 
                 * Delete The Alerted Employee From The Favorite Employees List
                */
                const liTage_empName = favList.querySelectorAll('li');
                Array.from(liTage_empName).forEach(item => {

                    const span_Tage = e.target.parentElement.parentElement.querySelector('span');
                    if (span_Tage.textContent == item.firstElementChild.textContent) {
                        
                        item.querySelector('img').click();
                    }
                });
            }
            
        });
    });
    /*End*/


    /**================================================ 
    * @desc Add Color For Each Employee To Distinguish 
    * Him From Other Employees By Placing 
    * Employee Number And Color
    ===================================================*/
    let index_emp = document.getElementById('index_emp'),
    input_color = document.getElementById('input_color');

    input_color.addEventListener('keyup', () => {

        if (input_color.value == '') {

            Array.from(liList).map(e => {
                e.children[index_emp.value].style.backgroundColor = '#fff';
            });

        } else {

            Array.from(liList).map(e => {
                e.children[index_emp.value].style.backgroundColor = input_color.value;
            });
        }
    });

    /**
    * @desc When You Press "Enter Button" On The Keyboard, 
    * Change The Color Of The Selected Employee's Box Via The Index Number
    * ---------------------------------
    * 13 => Enter Button In Keyboard
    * @see https://keycode.info/
    */
    document.onkeyup = event => {

        if(event.keyCode == 13) {

            Array.from(liList).map(e => {
                e.children[index_emp.value].style.backgroundColor = input_color.value;
            });
        }
    }

    /**
    * @desc Prevent Typing Characters In The Input Field
    */
    index_emp.onkeyup =  event => {

        const regx = /[^0-9]/gi;
        event.target.value = event.target.value.replace(regx, '');
    };
    /*End*/


    /**===========================================
    * @desc Search For Employees By Typing Their 
    * Full Name, Or By Typing A Letter Of Their 
    * Characters
    =============================================*/
    inpSearch.addEventListener('keyup', e => {

        const search_value = e.currentTarget.value.toLowerCase(),
            li_empName = empList.querySelectorAll('li');

        Array.from(li_empName).forEach(item => {

            const _liGroup = item.firstElementChild.textContent.toLowerCase();
            
            if(_liGroup.indexOf(search_value) != -1) {

                item.style.display = 'block';

            } else {
                item.style.display = 'none';
            }
        });

        /**
         * @desc Prevent Typing Numbers And Arabic Characters 
         * In The Input Field
        */
        const regx = /[^a-z-' ']/gi;
        e.target.value = e.target.value.replace(regx, '');
    });
    /*End*/ 
}); 