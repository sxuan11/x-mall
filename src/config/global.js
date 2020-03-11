export const ShowBack = (callback) =>{

  //
    let docB = documnet.documentElement || documnet.body;

  //监听滚动

  document.addEventListener('scroll' ,()=>{
    showBackFun()
  },false)

  document.addEventListener('touchstart' ,()=>{
    showBackFun()
  },{passive:true})
  
  document.addEventListener('touchmove' ,()=>{
    showBackFun()
  },{passive:true})

  document.addEventListener('touchend' ,()=>{
    
  },{passive:true})

  //判断是否达到顶点

  const showBackFun = () =>{
    console.log(docB.scrollTop);
    if(docB.scrollTop>=200){
      callback(true);
    }else{
      callback(false);
    }
  }
}
/**
 * 本地化存储
 */
export const setStore = (name,content)=>{
  if (!name) return;
  if(typeof content !== 'string'){
    content = JSON.stringify(content)
  }
  window.localStorage.setItem()
}



 /**
 * 本地化获取
 */
 
 
 
 /**
 * 本地化删除
 */