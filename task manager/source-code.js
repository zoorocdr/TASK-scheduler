    let list;
    //Check whether the task-list once used locally-stored any data.,
    //if not create an empty list(obj) to store data
    const saved_tasks=JSON.parse(localStorage.getItem('task-maker'));
    if(Array.isArray(saved_tasks)){
      list=saved_tasks;
    }else{
      list=[];//creating list to store task-data as a obj.,
    }
    render();
    //MVC-controller session.,
    function add_task(){
      const input_text=document.getElementById('input');
      const task =input_text.value;
      const date=document.getElementById('date');
      const due =date.value;
      create_task(task,due);
      render();//to render the list in html document body inside a div
    };
    //function to clear the entire list
    function clr_list() {
      list.length=0;
      save_task();
      render();
    };
    function del_task(event){
      const del_id=event.target.id;
      delete_task(del_id);
      render(); //renders the task-ele tasks to avoid copies.,
    }
    //controller=>ends
    //-----------------------------------------------------------------------
    //MVC-VIEW SESSION
    function render(){
      //reset the div for addin' statements and to avoid duplicater-copy..,
      document.getElementById("body_like").innerHTML=' ';//rendering inside a body
      list.forEach(myfunction);
      function myfunction(list_) {
        const element=document.createElement('div');
        element.style='width:593px;display:flex; position:relative;overflow-wrap:break-word;word-break:break-word;padding:5px;border:solid;justify-content:space-between;border-color:blue;margin-bottom:5px;right:5px;';
        element.innerText=list_.task +' @ ' +  list_.due;
        element.id=list_.id;
        const list_append=document.getElementById("body_like");
        list_append.appendChild(element);
        const del_button=document.createElement('button');//MVC-controller
        del_button.innerText='x';
        del_button.id=list_.id;
        del_button.style='margin:0px 5px 0px 40px;display:flex;position:absolute;right:2px;';
        del_button.onclick=del_task;
        element.appendChild(del_button);
     }
    };
   //VIEW=>ENDS
   //---------------------------------------------------------------------------
   //MVC-MODEL SESSION
   //function to creast object task-list., 
   function create_task(task,due){
      const id=''+ new Date().getTime();
      list.push({
        task:task,
        due:due,
        id:id
      });
      save_task();
    }//where list=[{title:'',due:'',id:'*used millisec as id for div'}]
    //function to delete the particular task.,
    function delete_task(del_id){
      list=list.filter(function(item){
        if(item.id=== del_id){
          return false;
        }else {return true;}
      });
    save_task();
    }
    function save_task(){
      localStorage.setItem('task-maker',JSON.stringify(list));
    }
    //MODEL=>ENDS
