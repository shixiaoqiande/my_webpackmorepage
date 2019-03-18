// 验证 source-map
// let a;
// let b;
// console()

// 解决异步
let xhr = new XMLHttpRequest();
// xhr.open('get','/api/user',true);
xhr.open('get','/user',true);
xhr.send();
xhr.onreadystatechange = function(){
    if(xhr.status==200&&xhr.readyState==4){
        let result = xhr.responseText
        console.log(result)
    }
}